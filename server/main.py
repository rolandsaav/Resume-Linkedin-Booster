from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from routes import resume, linkedin, manual
from session import SESSIONS_DB

# Load environment variables from .env file
load_dotenv()

app = FastAPI()

# Allows all origins, methods, and headers.
# You might want to restrict this in production.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- API Routers ---
app.include_router(resume.router, prefix="/save", tags=["Save"])
app.include_router(linkedin.router, prefix="/save", tags=["Save"])
app.include_router(manual.router, prefix="/save", tags=["Save"])


@app.get("/")
def read_root():
    return {"message": "Resume/LinkedIn Booster API is running!"}

@app.get("/session/{session_id}")
async def get_session_data(session_id: str):
    if session_id not in SESSIONS_DB:
        raise HTTPException(status_code=404, detail="Session not found.")
    return SESSIONS_DB[session_id] 