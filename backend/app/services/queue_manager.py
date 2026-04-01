import sys
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, BASE_DIR)

import json

QUEUE_FILE = os.path.join(BASE_DIR, "app", "database", "queue_store.json")

PRIORITY_ORDER = {
    "CRITICAL": 1,
    "URGENT": 2,
    "NORMAL": 3,
    "LOW": 4
}

def load_queue() -> list:
    """Load existing queue from JSON file."""
    if not os.path.exists(QUEUE_FILE):
        return []
    with open(QUEUE_FILE, "r") as f:
        return json.load(f)


def save_queue(queue: list):
    """Save sorted queue back to JSON file."""
    with open(QUEUE_FILE, "w") as f:
        json.dump(queue, f, indent=2)


def add_to_queue(triage_result: dict):
    """
    Add new patient triage result to queue
    and re-sort by priority (CRITICAL first).
    """
    queue = load_queue()

    # Build patient entry from triage result
    new_entry = {
        "token": triage_result.get("token"),
        "patient_name": triage_result.get("patient_name"),
        "priority": triage_result.get("priority"),
        "score": triage_result.get("score"),
        "reason": triage_result.get("reason"),
        "action": triage_result.get("action"),
        "symptoms_detected": triage_result.get("symptoms_detected", []),
        "warning_flags": triage_result.get("warning_flags", []),
        "analyzed_by": triage_result.get("analyzed_by")
    }

    queue.append(new_entry)

    # Sort by priority level
    queue.sort(key=lambda x: PRIORITY_ORDER.get(x["priority"], 99))

    save_queue(queue)

    return new_entry


def get_queue() -> list:
    """Return full sorted queue."""
    return load_queue()