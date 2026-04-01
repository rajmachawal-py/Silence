import json
from app.utils.priority_mapper import priority_to_value

QUEUE_FILE = "app/database/queue_store.json"


def load_queue():
    try:
        with open(QUEUE_FILE, "r") as f:
            return json.load(f)
    except:
        return []


def save_queue(queue):
    with open(QUEUE_FILE, "w") as f:
        json.dump(queue, f, indent=2)


def add_to_queue(patient_data):
    queue = load_queue()
    queue.append(patient_data)

    # Sort by priority (highest first)
    queue.sort(
        key=lambda x: priority_to_value(x["priority"]),
        reverse=True
    )

    save_queue(queue)
    return queue


def get_queue():
    return load_queue()


def get_by_token(token):
    queue = load_queue()
    for patient in queue:
        if patient["token"] == token:
            return patient
    return None