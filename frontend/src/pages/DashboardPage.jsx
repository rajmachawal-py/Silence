import QueueDashboard from "../components/QueueDashboard";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <div className="hero-badge" style={{ marginBottom: "0.5rem" }}>
            <span className="live-dot"></span>
            Live Queue
          </div>
          <h1 className="dashboard-title">Hospital Queue Dashboard</h1>
        </div>
        <button className="nav-link" onClick={() => navigate("/")}>
          ← Patient Form
        </button>
      </div>

      <QueueDashboard />
    </div>
  );
}