from pydantic import BaseModel, Field
from typing import Optional, List

# Pydantic Models for Manual Form Data
class Contact(BaseModel):
    fullName: str = Field(description="The full name of the person.")
    email: str = Field(description="The email address of the person.")
    phone: str = Field(description="The phone number of the person.")
    location: str = Field(description="The city and state of the person, e.g., 'San Francisco, CA'.")
    linkedinUrl: Optional[str] = Field(description="The URL of the person's LinkedIn profile.", default=None)
    websiteUrl: Optional[str] = Field(description="The URL of the person's personal website or portfolio.", default=None)

class Experience(BaseModel):
    id: str = Field(description="A unique identifier for this experience entry, e.g., 'exp1'.")
    jobTitle: str = Field(description="The job title or role.")
    companyName: str = Field(description="The name of the company.")
    location: str = Field(description="The location of the company (City, State).")
    startDate: str = Field(description="The start date of employment in MM/YYYY format.")
    endDate: str = Field(description="The end date of employment in MM/YYYY format or 'Present'.")
    description: str = Field(description="A description of the responsibilities and achievements in this role. Each bullet point should start with a newline character.")

class Project(BaseModel):
    id: str = Field(description="A unique identifier for this project entry, e.g., 'proj1'.")
    projectName: str = Field(description="The name of the project.")
    tools: str = Field(description="A comma-separated list of tools or technologies used.")
    description: str = Field(description="A description of the project. Each bullet point should start with a newline character.")

class Education(BaseModel):
    id: str = Field(description="A unique identifier for this education entry, e.g., 'edu1'.")
    schoolName: str = Field(description="The name of the school or university.")
    degree: str = Field(description="The degree obtained, e.g., 'Bachelor of Science'.")
    fieldOfStudy: str = Field(description="The field of study, e.g., 'Computer Science'.")
    startDate: str = Field(description="The start date of attendance in MM/YYYY format.")
    endDate: str = Field(description="The end date of attendance in MM/YYYY format.")
    honors: Optional[str] = Field(description="Any honors or awards received.", default=None)

class ManualResumeData(BaseModel):
    contact: Contact
    summary: str = Field(description="A professional summary of the person's career and skills.")
    experience: List[Experience]
    projects: List[Project]
    education: List[Education]
    skills: List[str] = Field(description="A list of relevant skills.")

class SaveFormRequest(BaseModel):
    session_id: str
    data: ManualResumeData 