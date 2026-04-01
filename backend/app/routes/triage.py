import sys
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, BASE_DIR)

from fastapi import APIRouter, HTTPException
from app.models.patient import PatientInput
from app.models.triage_result import TriageResult
from app.services.triage_engine import run_triage
from app.utils.token_generator import generate_token

router = APIRouter()

@router.post("/triage", response_model=TriageResult)
def triage_patient(patient: PatientInput):
    try:
        # Run AI triage engine
        result = run_triage(
            symptoms=patient.symptoms,
            age=patient.age,
            duration_hours=patient.duration_hours
        )

        # Generate unique token for patient
        token = generate_token()

        # Add patient info to result
        result["token"] = token
        result["patient_name"] = patient.name

        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Triage failed: {str(e)}")


@router.get("/triage/health")
def triage_health():
    return {"status": "Triage route is working"}