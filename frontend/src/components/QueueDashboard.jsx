import { useEffect, useState, useRef } from "react";
import { getQueue } from "../services/api";
import PatientRow from "./PatientRow";

export default function QueueDashboard() {
  const [queue, setQueue] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const intervalRef = useRef(null);                    // ✅ fix memory leak

  const fetchQueue = async () => {
    const data = await getQueue();
    setQueue(data);
    setLastUpdated(new Date().toLocaleTimeString());
  };

  useEffect(() => {
    fetchQueue();
    intervalRef.current = setInterval(fetchQueue, 5000); // ✅ stored in ref
    return () => clearInterval(intervalRef.current);     // ✅ cleanup on unmount
  }, []);

  return (
    <div className="card space-y-3">
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm text-gray-400">
          {queue.length} patient{queue.length !== 1 ? "s" : ""} in queue
        </p>
        {lastUpdated && (
          <p className="text-xs text-gray-400">Last updated: {lastUpdated}</p>
        )}
      </div>

      {queue.length === 0 ? (
        <p className="text-center text-gray-400 py-6">No patients in queue</p>
      ) : (
        queue.map((p) => (
          <PatientRow key={p.token} patient={p} />
        ))
      )}
    </div>
  );
}