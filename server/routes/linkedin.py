from fastapi import APIRouter, Form

from session import SESSIONS_DB

router = APIRouter()

@router.post("/linkedin")
async def save_linkedin(
    session_id: str = Form(...),
    linkedin_url: str = Form(...)
):
    # Placeholder for actual scraping logic
    print(f"Received LinkedIn URL '{linkedin_url}' for session {session_id}.")
    
    scraped_data = {"message": "LinkedIn scraping not implemented yet.", "url": linkedin_url}
    
    if session_id not in SESSIONS_DB:
        SESSIONS_DB[session_id] = {}
    SESSIONS_DB[session_id]['scraped_linkedin'] = scraped_data

    return {"message": "LinkedIn URL received.", "session_id": session_id} 