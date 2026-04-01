import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-1.5-flash")

def analyze_symptoms_with_ai(symptoms: str, age: int, duration_hours: int) -> dict:
    """
    Sends patient symptoms to Gemini for intelligent medical triage analysis.
    Returns structured priority, score, reason, and recommended action.
    """

    prompt = f"""
You are a medical triage AI assistant. Analyze the following patient information and determine urgency.

Patient Info:
- Symptoms: {symptoms}
- Age: {age}
- Duration of symptoms: {duration_hours} hours

Your job is to:
1. Identify all symptoms mentioned
2. Detect any life-threatening or critical combinations (e.g., chest pain + breathlessness = possible cardiac event)
3. Consider age as a risk factor (age > 65 = higher risk)
4. Consider duration (symptoms > 48 hours = higher urgency)
5. Assign a priority level

Priority Levels:
- CRITICAL: Immediate life threat, must be seen within minutes (e.g., chest pain, stroke, severe bleeding, difficulty breathing)
- URGENT: Serious but not immediately life-threatening, seen within 1 hour (e.g., high fever, fracture, severe pain)
- NORMAL: Moderate symptoms, seen within a few hours (e.g., mild fever, vomiting, body ache)
- LOW: Minor issues, can wait (e.g., cold, minor rash, routine checkup)

Respond ONLY in this exact JSON format, no extra text, no markdown, no backticks:
{{
    "priority": "CRITICAL" or "URGENT" or "NORMAL" or "LOW",
    "score": <integer from 0 to 100>,
    "symptoms_detected": ["symptom1", "symptom2"],
    "reason": "<clear medical reasoning in one sentence>",
    "action": "<what the patient should do right now>",
    "warning_flags": ["flag1", "flag2"]
}}

Warning flags examples: "possible cardiac event", "risk of dehydration", "neurological concern"
If no warning flags, return an empty list.
"""

    response = model.generate_content(prompt)

    raw_response = response.text.strip()

    # Gemini sometimes wraps in ```json ... ``` so we clean it
    if raw_response.startswith("```"):
        raw_response = raw_response.split("```")[1]
        if raw_response.startswith("json"):
            raw_response = raw_response[4:]
    raw_response = raw_response.strip()

    result = json.loads(raw_response)
    return result