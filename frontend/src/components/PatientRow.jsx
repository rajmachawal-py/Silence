import PriorityBadge from "./PriorityBadge";

export default function PatientRow({ patient }) {
  return (
    <div className="patient-row">
      <div>
        <p className="patient-name">{patient.patient_name}</p>
        <p className="patient-reason">{patient.reason}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.4rem" }}>
        <PriorityBadge level={patient.priority} />
        <span className="patient-token">{patient.token}</span>
      </div>
    </div>
  );
}