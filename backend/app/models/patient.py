from pydantic import BaseModel

class PatientInput(BaseModel):
    name: str
    age: int
    symptoms: str
    duration_hours: int  # ✅ changed from duration: str to duration_hours: int