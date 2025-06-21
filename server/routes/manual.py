from fastapi import APIRouter

from session import SESSIONS_DB
from models import SaveFormRequest

router = APIRouter()

@router.post("/manual")
async def save_manual(request: SaveFormRequest):
    session_id = request.session_id
    data = request.data
    
    if session_id not in SESSIONS_DB:
        SESSIONS_DB[session_id] = {}
    SESSIONS_DB[session_id]['manual_form'] = data.model_dump()

    print(f"Session {session_id} updated with manual form data.")
    
    return {"message": "Manual form data saved successfully.", "session_id": session_id} 