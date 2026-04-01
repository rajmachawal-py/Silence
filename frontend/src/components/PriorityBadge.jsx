export default function PriorityBadge({ level }) {
  const icons = {
    CRITICAL: "⬤",
    URGENT: "⬤",
    NORMAL: "⬤",
    LOW: "⬤",
  };

  const classMap = {
    CRITICAL: "badge badge-critical",
    URGENT: "badge badge-urgent",
    NORMAL: "badge badge-normal",
    LOW: "badge badge-low",
  };

  return (
    <span className={classMap[level] || "badge"}>
      <span style={{ fontSize: "0.6rem" }}>{icons[level]}</span>
      {level}
    </span>
  );
}