import React, { useEffect, useState } from "react";
import "./PriorityManagement.css"; // Import external CSS

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
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Priority Management</h1>
      </header>

      <main className="dashboard-main">
        <button

          onClick={updatePriorities}
          className="glass-card action-button"
          id="c"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Priorities"}
        </button>

        <div className="glass-card calls-container">
          {calls.length === 0 ? (
            <p className="no-calls-text">No pending calls</p>
          ) : (
            <ul className="calls-list">
              {calls.map((call) => (
                <li key={call.id} className="call-item">
                  <p><strong>Caller:</strong> {call.caller_name} ({call.caller_phone})</p>
                  <p><strong>Issue:</strong> {call.issue_type}</p>
                  <p><strong>Priority:</strong> {call.priority}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

export default PriorityManagement;