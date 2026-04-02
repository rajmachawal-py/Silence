import sys
import os

# Fix module path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, BASE_DIR)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import triage

app = FastAPI(
    title="LifeLine AI",
    description="Remote AI-powered Triage & Smart Queue System",
    version="1.0.0"
)

# ============================
# CORS — allow React frontend
# ============================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://silence-phi.vercel.app",  # ✅ your Vercel URL
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================
# Routes
# ============================
app.include_router(triage.router, prefix="/api", tags=["Triage"])

# ============================
# Health Check
# ============================
@app.get("/")
def root():
    return {
        "status": "LifeLine AI backend is running",
        "docs": "http://localhost:8000/docs"
    }