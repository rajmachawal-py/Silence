import PriorityBadge from "./PriorityBadge";

export default function PatientRow({ patient }) {
  return (
    <div className="flex justify-between items-center p-3 border-b">
      <div>
        <p className="font-semibold">{patient.patient_name}</p>
        <p className="text-sm text-gray-500">{patient.reason}</p>
        <p className="text-xs text-gray-400">{patient.action}</p>
      </div>
      <div className="text-right space-y-1">
        <PriorityBadge level={patient.priority} />
        <p className="text-sm font-mono font-bold">{patient.token}</p>
      </div>
    </div>
  );
}