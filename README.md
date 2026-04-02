![header](https://capsule-render.vercel.app/api?type=waving&color=0:040d14,50:0a1d2e,100:00d4ff&height=200&section=header&text=LifeLine%20AI&fontSize=60&fontColor=00d4ff&fontAlignY=38&desc=Intelligent%20Remote%20Triage%20&amp;%20Smart%20Queue%20System&descAlignY=58&descColor=7a9bb5&animation=fadeIn)

![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini%20AI-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![JSON](https://img.shields.io/badge/JSON%20Store-000000?style=for-the-badge&logo=json&logoColor=white)
![n8n](https://img.shields.io/badge/n8n-EA4B71?style=for-the-badge&logo=n8n&logoColor=white)

> **Remote AI-powered triage and smart queue management for hospitals.**
> Patients assess symptoms from home, receive a prioritized digital triage card, and are automatically sorted in the hospital queue — before they even arrive.

![](https://img.shields.io/badge/Status-Active-00ff88?style=flat-square)
![](https://img.shields.io/badge/License-Unlicensed-ff3366?style=flat-square)
![](https://img.shields.io/badge/Hackathon-Ready-00d4ff?style=flat-square)

---

## The Problem

Most hospitals operate on a first-come, first-served basis. This means a patient with a mild sprain could be seen before someone experiencing a cardiac event simply because they arrived first. There is no mechanism for early symptom assessment, no pre-arrival triage, and no dynamic queue management. LifeLine AI fixes this.

---

## How It Works

```
Patient (Home)                   Backend                       Hospital
──────────────                   ───────                       ────────
Enter symptoms  ──── POST ──►  Gemini AI triage            Nurse Dashboard
Name, age,                      + rule-based fallback   ◄── GET /api/queue
duration                              |                    (auto-refresh 5s)
                                      v
                             Digital Triage Card
                          CRITICAL / URGENT / NORMAL / LOW
                          Token: A12, reason, action
                                      |
                                      v
                             queue_store.json
                          (auto-sorted by urgency)
```

1. Patient opens the web app — no install required.
2. Enters name, age, symptoms (free text), and symptom duration.
3. The AI triage engine analyzes the input using Gemini AI, with a rule-based fallback.
4. A **Digital Triage Card** is generated with a priority level, unique token, reason, recommended action, and warning flags.
5. The patient is saved to the queue, sorted by urgency.
6. The **Nurse Dashboard** displays the live sorted queue, refreshing every 5 seconds.

---

## Priority Levels

| Priority | Examples |
|---|---|
| CRITICAL | Chest pain, unconscious, stroke, seizure, severe bleeding, paralysis |
| URGENT | High fever, vomiting, fracture, head injury, infection |
| NORMAL | Moderate symptoms, non-acute pain |
| LOW | Minor issues, routine concerns |

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18 + Vite + React Router DOM + Axios |
| **Backend** | FastAPI + Uvicorn |
| **AI / Triage** | Google Gemini API (gemini-1.5-flash) + rule-based Python fallback |
| **Database** | queue_store.json (Firebase upgrade planned) |
| **Fonts** | Syne + DM Sans via Google Fonts |
| **Automation** | n8n (planned) |

---

## Project Structure

```
lifeline-ai/  (repo: Silence)
├── .gitignore
├── .env.example
├── docker-compose.yml
├── README.md
│
├── frontend/
│   ├── index.html
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── PatientForm.jsx
│       │   ├── TriageCard.jsx
│       │   ├── QueueDashboard.jsx
│       │   ├── PriorityBadge.jsx
│       │   ├── PatientRow.jsx
│       │   └── Loader.jsx
│       ├── pages/
│       │   ├── PatientPage.jsx
│       │   └── DashboardPage.jsx
│       ├── services/
│       │   └── api.js
│       ├── styles/
│       │   └── global.css
│       ├── App.jsx
│       └── main.jsx
│
├── backend/
│   └── app/
│       ├── main.py
│       ├── routes/
│       │   └── triage.py
│       ├── services/
│       │   ├── ai_services.py
│       │   ├── triage_engine.py
│       │   └── queue_manager.py
│       ├── models/
│       │   ├── patient.py
│       │   └── triage_result.py
│       ├── database/
│       │   └── queue_store.json
│       └── utils/
│           ├── token_generator.py
│           └── priority_mapper.py
│
└── docs/
    ├── architecture.png
    ├── demo_script.md
    └── api_endpoints.md
```

---

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- A valid [Google Gemini API key](https://aistudio.google.com/app/apikey)

### 1. Clone the Repository

```bash
git clone https://github.com/rajmachawal-py/Silence.git
cd Silence
```

### 2. Backend Setup

```bash
cd backend

# Create and activate virtual environment (Windows)
python -m venv MyVenv
MyVenv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
```

**.env format:**
```
GEMINI_API_KEY=your_api_key_here
N8N_WEBHOOK_URL=https://xxxx.ngrok.io/webhook/triage-alert
```

**Start the backend server:**
```bash
python -m uvicorn app.main:app --reload
```

Backend: `http://127.0.0.1:8000` — Swagger UI: `http://127.0.0.1:8000/docs`

### 3. Frontend Setup

```bash
cd frontend
npm install
npx vite
```

Frontend: `http://localhost:5173`

> **Note:** Use `npx vite` directly. Do not use `npm run dev` unless package.json scripts are updated.

---

## API Reference

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/triage` | Submit symptoms, returns triage card, saves to queue |
| `GET` | `/api/queue` | Fetch the full queue sorted by priority |
| `GET` | `/api/triage/health` | Health check for triage route |
| `GET` | `/` | Root health check |

### POST `/api/triage` — Request

```json
{
  "name": "Jane Doe",
  "age": 45,
  "symptoms": "chest pain and difficulty breathing since this morning",
  "duration_hours": 4
}
```

### POST `/api/triage` — Response

```json
{
  "token": "A12",
  "patient_name": "Jane Doe",
  "priority": "CRITICAL",
  "score": 95,
  "reason": "Chest pain combined with breathing difficulty in a 45-year-old...",
  "action": "Immediate physician assessment required",
  "symptoms_detected": ["chest pain", "difficulty breathing"],
  "warning_flags": ["possible cardiac event", "high age-risk factor"],
  "analyzed_by": "gemini"
}
```

---

## AI Triage Engine

**Primary — Google Gemini (gemini-1.5-flash):**
Understands full sentences, detects symptom combinations, and applies contextual reasoning based on age, duration, and severity. Produces a structured JSON triage result.

**Fallback — Rule-Based Python Logic:**
Activated if the Gemini API is unavailable. Uses keyword matching with age and duration modifiers. The `analyzed_by` field indicates which engine was used.

---

## Data Models

### PatientInput

| Field | Type | Description |
|---|---|---|
| `name` | `str` | Patient full name |
| `age` | `int` | Patient age in years |
| `symptoms` | `str` | Free-text symptom description |
| `duration_hours` | `int` | How long symptoms have been present |

### TriageResult

| Field | Type | Description |
|---|---|---|
| `token` | `str` | Unique queue token (e.g. A12) |
| `patient_name` | `str` | Patient name |
| `priority` | `str` | CRITICAL / URGENT / NORMAL / LOW |
| `score` | `int` | Internal urgency score |
| `reason` | `str` | AI-generated explanation |
| `action` | `str` | Recommended next step |
| `symptoms_detected` | `List[str]` | Parsed symptom list |
| `warning_flags` | `List[str]` | Risk flags raised |
| `analyzed_by` | `str` | gemini or rule-based |

---

## UI Design

The interface uses a dark medical theme with a deep navy base (`#040d14`) and cyan accent (`#00d4ff`).

- Priority levels each have a dedicated color: red / orange / yellow / green
- CRITICAL badges pulse with a red glow animation
- The live dashboard indicator pulses green
- Patient rows have a hover slide effect
- Queue tokens are rendered large in cyan with a text glow
- Background uses a subtle grid pattern

> Tailwind CSS was intentionally removed due to v4 compatibility conflicts. All styles live in `src/styles/global.css` as plain CSS.

---

## Known Issues & Notes

- If Gemini consistently falls back to rule-based, verify `GEMINI_API_KEY` in `.env` is valid.
- `index.html` must remain at `frontend/` root, not inside `frontend/public/`.
- Do **not** reinstall Tailwind CSS.
- Always use `127.0.0.1` (not `localhost`) for backend API calls as configured in `services/api.js`.

---

## Roadmap

- [ ] End-to-end frontend to backend integration test
- [ ] docker-compose.yml for one-command startup
- [ ] Firebase Firestore integration (replacing queue_store.json)
- [ ] n8n email alerts for CRITICAL and URGENT patients
- [ ] Patient history and discharge tracking
- [ ] Admin authentication for the nurse dashboard

---

## Collaborators

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/rajmachawal-py">
        <img src="https://github.com/rajmachawal-py.png" width="60" alt="rajmachawal-py"/>
        <br/>
        <b>rajmachawal-py</b>
      </a>
      <br/>Creator
    </td>
    <td align="center">
      <a href="https://github.com/DivijTyagi13">
        <img src="https://github.com/DivijTyagi13.png" width="60" alt="DivijTyagi13"/>
        <br/>
        <b>DivijTyagi13</b>
      </a>
      <br/>Collaborator
    </td>
    <td align="center">
      <a href="https://github.com/Tarak-D">
        <img src="https://github.com/Tarak-D.png" width="60" alt="Tarak-D"/>
        <br/>
        <b>Tarak-D</b>
      </a>
      <br/>Collaborator
    </td>
  </tr>
</table>

---

## License

This project is currently unlicensed. All rights reserved.

---

![footer](https://capsule-render.vercel.app/api?type=waving&color=0:00d4ff,50:0a1d2e,100:040d14&height=120&section=footer&text=Built%20to%20save%20lives.&fontSize=24&fontColor=00d4ff&fontAlignY=65&animation=fadeIn)
