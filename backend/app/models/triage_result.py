from pydantic import BaseModel
from typing import List

class TriageResult(BaseModel):
    token: str
    patient_name: str
    priority: str
    score: int
    reason: str
    action: str
    symptoms_detected: List[str]
    warning_flags: List[str]
    analyzed_by: str