import { useState } from "react";
import { submitTriage } from "../services/api";
import TriageCard from "./TriageCard";
import Loader from "./Loader";

export default function PatientForm() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    symptoms: "",
    duration_hours: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        age: parseInt(formData.age),
        symptoms: formData.symptoms,
        duration_hours: parseInt(formData.duration_hours),
      };

      const res = await submitTriage(payload);

      if (res.success) {
        setResult(res.data);
      } else {
        setError(res.error);
      }
    } catch (err) {
      setError("Could not connect to backend. Is the server running?");
    } finally {
      setLoading(false);  // ✅ always stops loader even if error
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setFormData({ name: "", age: "", symptoms: "", duration_hours: "" });
  };

  if (loading) return <Loader />;

  return (
    <div className="card">
      {!result ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="input"
            placeholder="Full Name"
            value={formData.name}
            required
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            className="input"
            placeholder="Age"
            type="number"
            value={formData.age}
            required
            min={1}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          />
          <input
            className="input"
            placeholder="Duration of symptoms (in hours)"
            type="number"
            value={formData.duration_hours}
            required
            min={1}
            onChange={(e) => setFormData({ ...formData, duration_hours: e.target.value })}
          />
          <textarea
            className="input"
            placeholder="Describe your symptoms..."
            rows={4}
            value={formData.symptoms}
            required
            onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
          />

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-500 text-sm text-center">{error}</p>
            </div>
          )}

          <button className="btn-primary" type="submit">
            Analyze Symptoms
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <TriageCard data={result} />
          <button className="btn-primary" onClick={handleReset}>
            Submit Another Patient
          </button>
        </div>
      )}
    </div>
  );
}