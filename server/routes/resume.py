import os
import io
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from pypdf import PdfReader
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

from session import SESSIONS_DB
from models import ManualResumeData

router = APIRouter()

@router.post("/resume")
async def save_resume(
    session_id: str = Form(...),
    resume: UploadFile = File(...)
):
    if not os.getenv("OPENAI_API_KEY"):
        raise HTTPException(status_code=500, detail="OpenAI API key not configured.")
    if resume.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload a PDF.")

    try:
        pdf_content = await resume.read()
        pdf_reader = PdfReader(io.BytesIO(pdf_content))
        text = "".join(page.extract_text() or "" for page in pdf_reader.pages)
        if not text.strip():
            raise HTTPException(status_code=400, detail="Could not extract text from PDF.")

        llm = ChatOpenAI(model="gpt-4", temperature=0)
        structured_llm = llm.with_structured_output(ManualResumeData)
        prompt = ChatPromptTemplate.from_messages([
            ("system", "You are an expert resume parser. Your task is to extract information from the provided resume text and structure it into a JSON object that matches the provided schema. Pay close attention to the descriptions and formats required for each field."),
            ("human", "Please extract the information from the following resume text:\n\n---\n\n{resume_text}")
        ])
        chain = prompt | structured_llm
        parsed_data = await chain.ainvoke({"resume_text": text})

        if session_id not in SESSIONS_DB:
            SESSIONS_DB[session_id] = {}
        SESSIONS_DB[session_id]['parsed_resume'] = parsed_data.model_dump()
        
        print(f"Session {session_id} updated with parsed resume.")

        return {"message": "Resume parsed successfully.", "session_id": session_id, "data": parsed_data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 