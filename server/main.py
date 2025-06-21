from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional

app = FastAPI()

origins = [
    "http://localhost:8080",
    "http://localhost:5173",
    "http://localhost:5174", # Often used as a fallback
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/resume/process")
async def process_resume(resume: UploadFile = File(...)):
    if resume.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload a PDF.")
    # In a real application, you would add your resume parsing logic here.
    # For now, we'll just confirm the file was received.
    return {
        "filename": resume.filename,
        "content_type": resume.content_type,
        "message": "Resume received successfully. Parsing logic not yet implemented.",
    } 