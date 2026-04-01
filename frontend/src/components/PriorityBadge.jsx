export default function PriorityBadge({ level }) {
  const styles = {
    CRITICAL: "bg-red-500 text-white",
    URGENT:   "bg-orange-500 text-white",
    NORMAL:   "bg-yellow-400 text-black",
    LOW:      "bg-green-500 text-white",
  };

  const icons = {
    CRITICAL: "🔴",
    URGENT:   "🟠",
    NORMAL:   "🟡",
    LOW:      "🟢",
  };

  return (
    <div className={`inline-block px-6 py-2 rounded-full text-lg font-bold ${styles[level]}`}>
      {icons[level]} {level}
    </div>
  );
}