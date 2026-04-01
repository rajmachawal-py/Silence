from fastapi import APIRouter
from app.services.queue_manager import get_queue

router = APIRouter()

@router.get("/queue")
def fetch_queue():
    return get_queue()