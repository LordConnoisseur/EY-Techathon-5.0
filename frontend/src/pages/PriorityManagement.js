import React, { useEffect, useState } from "react";

function PriorityManagement() {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPriorityQueue();
  }, []);

  const fetchPriorityQueue = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/api/priority-management/get-priority-queue");
      const data = await response.json();
      setCalls(data);
    } catch (error) {
      console.error("Error fetching priority queue:", error);
    }
    setLoading(false);
  };

  const updatePriorities = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/api/priority-management/update-priorities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        alert("Priorities updated successfully!");
        fetchPriorityQueue(); // Refresh the list after updating
      } else {
        alert("Failed to update priorities.");
      }
    } catch (error) {
      console.error("Error updating priorities:", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Priority Management</h2>
      
      <button
        onClick={updatePriorities}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Priorities"}
      </button>

      <div className="bg-gray-100 p-6 rounded shadow">
        {calls.length === 0 ? <p>No pending calls</p> : (
          <ul>
            {calls.map((call) => (
              <li key={call.id} className="mb-4 p-4 border-b">
                <p><strong>Caller:</strong> {call.caller_name} ({call.caller_phone})</p>
                <p><strong>Issue:</strong> {call.issue_type}</p>
                <p><strong>Priority:</strong> {call.priority}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PriorityManagement;