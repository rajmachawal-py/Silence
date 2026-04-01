import PriorityBadge from "./PriorityBadge";

export default function TriageCard({ data }) {
  return (
    <div className="triage-result">
      <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
        Triage Result
      </p>

      <PriorityBadge level={data.priority} />

      <div className="token-display">{data.token}</div>

      <div className="divider" />

      <p className="triage-reason">{data.reason}</p>

      <div className="triage-action">
        ↗ {data.action}
      </div>

      {data.warning_flags?.length > 0 && (
        <div className="warning-box">
          <p className="warning-title">⚠ Warning Flags</p>
          {data.warning_flags.map((flag, i) => (
            <p key={i} className="warning-item">• {flag}</p>
          ))}
        </div>
      )}

      {data.symptoms_detected?.length > 0 && (
        <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.4rem", flexWrap: "wrap", justifyContent: "center" }}>
          {data.symptoms_detected.map((s, i) => (
            <span key={i} style={{
              background: "rgba(0,212,255,0.07)",
              border: "1px solid rgba(0,212,255,0.15)",
              borderRadius: "999px",
              padding: "0.25rem 0.75rem",
              fontSize: "0.75rem",
              color: "var(--text-secondary)"
            }}>{s}</span>
          ))}
        </div>
      )}

      <p className="analyzed-by">Analyzed by {data.analyzed_by}</p>
    </div>
  );
}