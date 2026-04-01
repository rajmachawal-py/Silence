def priority_to_value(priority: str):
    mapping = {
        "CRITICAL": 4,
        "URGENT": 3,
        "NORMAL": 2,
        "LOW": 1
    }
    return mapping.get(priority, 0)