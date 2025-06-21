from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List
from pydantic import BaseModel

# Pydantic Models for Manual Form Data
class Contact(BaseModel):
    fullName: str
    email: str
    phone: str
    location: str
    linkedinUrl: Optional[str] = None
    websiteUrl: Optional[str] = None

class Experience(BaseModel):
    id: str
    jobTitle: str
    companyName: str
    location: str
    startDate: str
    endDate: str
    description: str

class Project(BaseModel):
    id: str
    projectName: str
    tools: str
    description: str

class Education(BaseModel):
    id: str
    schoolName: str
    degree: str
    fieldOfStudy: str
    startDate: str
    endDate: str
    honors: Optional[str] = None

class ManualResumeData(BaseModel):
    contact: Contact
    summary: str
    experience: List[Experience]
    projects: List[Project]
    education: List[Education]
    skills: List[str]

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
async def process_resume(
    resume: Optional[UploadFile] = File(None),
    linkedin_url: Optional[str] = Form(None)
):
    if not resume and not linkedin_url:
        raise HTTPException(status_code=400, detail="Please provide a resume file or a LinkedIn URL.")

    if resume and resume.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload a PDF.")

    # In a real app, you would parse the PDF and scrape the URL here.
    # For now, we'll just confirm what was received.
    
    response_data = {
        "message": "Inputs received successfully. Parsing and scraping not yet implemented.",
        "inputs_received": {
            "resume_filename": resume.filename if resume else None,
            "linkedin_url": linkedin_url if linkedin_url else None,
        }
    }
    
    return response_data 

@app.post("/resume/save-manual-form")
async def save_manual_form(data: ManualResumeData):
    # For now, we'll just print the received data to the console
    # In a real app, you would save this to a database
    print("Received manual form data:")
    print(data.model_dump_json(indent=2))
    return {"message": "Manual form data received successfully!", "data": data} 