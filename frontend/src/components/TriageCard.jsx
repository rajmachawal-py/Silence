import PriorityBadge from "./PriorityBadge";

export default function TriageCard({ data }) {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-xl font-bold">Triage Result</h2>

      <PriorityBadge level={data.priority} />

      <p className="text-2xl font-bold tracking-widest">
        Token: {data.token}
      </p>

      <p className="text-gray-600">{data.reason}</p>

      <p className="text-blue-700 font-semibold">{data.action}</p>

      {data.warning_flags?.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-600 font-semibold text-sm">⚠️ Warning Flags</p>
          <ul className="text-red-500 text-sm mt-1">
            {data.warning_flags.map((flag, i) => (
              <li key={i}>• {flag}</li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-xs text-gray-400">
        Analyzed by: {data.analyzed_by}
      </p>
    </div>
  );
}