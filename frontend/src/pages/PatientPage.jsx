import PatientForm from "../components/PatientForm";
import { useNavigate } from "react-router-dom";

export default function PatientPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold text-blue-700 mb-2">LifeLine AI</h1>
      <p className="text-gray-500 mb-6 text-center">
        Smart triage system prioritizing patients by urgency
      </p>
      <div className="w-full max-w-md">
        <PatientForm />
      </div>
      <button
        className="mt-6 text-sm text-blue-500 underline"
        onClick={() => navigate("/dashboard")}
      >
        View Hospital Dashboard →
      </button>
    </div>
  );
}