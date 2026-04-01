from fastapi import APIRouter
from app.services.queue_manager import get_by_token

router = APIRouter()

@router.get("/token/{token}")
def get_token_data(token: str):
    data = get_by_token(token)

    if not data:
        return {"error": "Token not found"}

    return data