import PatientForm from "../components/PatientForm";
import { useNavigate } from "react-router-dom";

export default function PatientPage() {
  const navigate = useNavigate();

  return (
    <div className="patient-page">
      <div className="hero-badge">
        <span style={{ width: 7, height: 7, background: "var(--accent-green)", borderRadius: "50%", display: "inline-block", animation: "pulse-green 1.5s infinite" }}></span>
        AI Triage System — Online
      </div>

      <h1 className="hero-title">
        LifeLine <span>AI</span>
      </h1>

      <p className="hero-sub">
        Intelligent remote triage — get prioritized before you arrive
      </p>

      <div style={{ width: "100%", maxWidth: "440px" }}>
        <PatientForm />
      </div>

      <button className="nav-link" onClick={() => navigate("/dashboard")}>
        View Hospital Dashboard →
      </button>
    </div>
  );
}