import React, { useEffect, useState } from "react";
import "./CallQueueDashboard.css"; // Import external CSS

function CallQueueDashboard() {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(false);
  const loggedInAgent = "Sundaresh"; // Replace with actual agent authentication

  useEffect(() => {
    fetchAssignedCalls();
  }, []);

  const fetchAssignedCalls = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/call-queue/agent/${loggedInAgent}`);
      const data = await response.json();
      setCalls(data);
    } catch (error) {
      console.error("Error fetching calls:", error);
    }
    setLoading(false);
  };

  const handleUpdateStatus = async (callId, status) => {
    try {
      await fetch("http://127.0.0.1:5000/api/call-queue/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ call_id: callId, status }),
      });

      fetchAssignedCalls();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getEscalationSymbol = (level) => {
    switch (level) {
      case 1: return "⚠️ Tier 1";
      case 2: return "🔥 Tier 2";
      case 3: return "🛑 Admin Intervention";
      default: return "No Escalation";
    }
  };

  const timeSinceUpdate = (lastUpdated) => {
    const updatedTime = new Date(lastUpdated);
    const now = new Date();
    const diff = Math.floor((now - updatedTime) / (1000 * 60 * 60)); // Convert to hours
    return `${diff} hours ago`;
  };

  return (
    <div className="dashboard-wrapper">
      {/* Dashboard Header */}
      <header className="dashboard-header">
        <h1 className="dashboard-title">Call Queue Management</h1>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Loading State */}
        {loading && <p className="loading-text">Loading...</p>}

        {/* Call List */}
        <div className="glass-card call-list">
          {calls.length === 0 ? (
            <p className="no-calls-text">No calls assigned to you</p>
          ) : (
            <ul className="call-items">
              {calls.map((call) => (
                <li key={call.id} className="call-item">
                  <div className="call-details">
                    <p><strong>Caller:</strong> {call.caller_name} ({call.caller_phone})</p>
                    <p><strong>Issue:</strong> {call.issue_type}</p>
                    <p><strong>Status:</strong> {call.status}</p>
                    <p><strong>Priority:</strong> {call.priority}</p>
                    <p><strong>Escalation Level:</strong> {getEscalationSymbol(call.escalation_level)}</p>
                    <p><strong>Last Updated:</strong> {timeSinceUpdate(call.last_updated)}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="call-actions">
                    {call.status === "pending" && (
                      <button
                        onClick={() => handleUpdateStatus(call.id, "in-progress")}
                        className="action-button in-progress"
                      >
                        Mark as In Progress
                      </button>
                    )}

                    {call.status === "in-progress" && (
                      <button
                        onClick={() => handleUpdateStatus(call.id, "resolved")}
                        className="action-button resolved"
                      >
                        Mark as Resolved
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

export default CallQueueDashboard;