import random
import string

def generate_token():
    letter = random.choice(string.ascii_uppercase)
    number = random.randint(1, 99)
    return f"{letter}{number:02d}"