import QueueDashboard from "../components/QueueDashboard";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-700">
          🏥 Live Queue Dashboard
        </h1>
        <button
          className="text-sm text-blue-500 underline"
          onClick={() => navigate("/")}
        >
          ← Patient Form
        </button>
      </div>
      <QueueDashboard />
    </div>
  );
}