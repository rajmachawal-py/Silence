import sys
import os
import httpx

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, BASE_DIR)

N8N_WEBHOOK_URL = os.getenv("N8N_WEBHOOK_URL")
from fastapi import APIRouter, HTTPException
from app.models.patient import PatientInput
from app.models.triage_result import TriageResult
from app.services.triage_engine import run_triage
from app.services.queue_manager import add_to_queue, get_queue
from app.utils.token_generator import generate_token

router = APIRouter()

async def notify_n8n(triage_result: dict):
    if triage_result.get("priority") in ["CRITICAL", "URGENT"]:
        async with httpx.AsyncClient() as client:
            try:
                await client.post(N8N_WEBHOOK_URL, json=triage_result, timeout=5)
            except Exception as e:
                print(f"[n8n notify failed]: {e}")

@router.post("/triage", response_model=TriageResult)
def triage_patient(patient: PatientInput):
    try:
        # Step 1 — Run triage engine
        result = run_triage(
            symptoms=patient.symptoms,
            age=patient.age,
            duration_hours=patient.duration_hours
        )

        # Step 2 — Attach token and name
        result["token"] = generate_token()
        result["patient_name"] = patient.name

        # Step 3 — Save to queue_store.json
        add_to_queue(result)

        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Triage failed: {str(e)}")


@router.get("/queue")
def fetch_queue():
    """Returns full patient queue sorted by priority."""
    return get_queue()


@router.get("/triage/health")
def triage_health():
    return {"status": "Triage route is working ✅"}
