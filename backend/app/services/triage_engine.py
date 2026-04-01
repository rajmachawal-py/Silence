import sys
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, BASE_DIR)

from app.services.ai_services import analyze_symptoms_with_ai  # ✅ ai_services not ai_service
import logging

logger = logging.getLogger(__name__)

def run_triage(symptoms: str, age: int, duration_hours: int) -> dict:
    try:
        result = analyze_symptoms_with_ai(symptoms, age, duration_hours)
        result["analyzed_by"] = "gemini-ai"  # ✅ fixed label
        return result

    except Exception as e:
        logger.warning(f"Gemini API failed, falling back to rule-based: {e}")
        return rule_based_fallback(symptoms, age, duration_hours)


def rule_based_fallback(symptoms: str, age: int, duration_hours: int) -> dict:
    symptoms_lower = symptoms.lower()
    score = 0
    reason = []
    warning_flags = []

    CRITICAL_KEYWORDS = ["chest pain", "breathless", "unconscious", "stroke", "bleeding", "seizure", "paralysis"]
    URGENT_KEYWORDS   = ["fever", "vomiting", "fracture", "headache", "injury", "infection"]

    if any(word in symptoms_lower for word in CRITICAL_KEYWORDS):
        score += 90
        reason.append("Critical symptoms detected")
        warning_flags.append("Requires immediate attention")

    elif any(word in symptoms_lower for word in URGENT_KEYWORDS):
        score += 60
        reason.append("Urgent symptoms detected")

    else:
        score += 30
        reason.append("Mild symptoms")

    if age > 65:
        score += 10
        reason.append("High-risk age group")

    if duration_hours > 48:
        score += 10
        reason.append("Prolonged symptom duration")

    if score >= 80:
        priority = "CRITICAL"
        action = "Go to hospital immediately or call emergency services"
    elif score >= 60:
        priority = "URGENT"
        action = "Visit hospital within the next hour"
    elif score >= 40:
        priority = "NORMAL"
        action = "Visit hospital today"
    else:
        priority = "LOW"
        action = "Book an appointment or visit when convenient"

    return {
        "priority": priority,
        "score": score,
        "symptoms_detected": symptoms_lower.split(),
        "reason": ", ".join(reason),
        "action": action,
        "warning_flags": warning_flags,
        "analyzed_by": "rule-based-fallback"
    }