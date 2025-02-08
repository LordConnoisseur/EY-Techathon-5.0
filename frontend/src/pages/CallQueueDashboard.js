import React, { useEffect, useState } from "react";

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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Call Queue Management</h2>
      {loading ? <p>Loading...</p> : null}
      <div className="bg-gray-100 p-6 rounded shadow">
        {calls.length === 0 ? <p>No calls assigned to you</p> : (
          <ul>
            {calls.map((call) => (
              <li key={call.id} className="mb-4 p-4 border-b">
                <p><strong>Caller:</strong> {call.caller_name} ({call.caller_phone})</p>
                <p><strong>Issue:</strong> {call.issue_type}</p>
                <p><strong>Status:</strong> {call.status}</p>

                {/* Show buttons conditionally based on the call status */}
                {call.status === "pending" && (
                  <button
                    onClick={() => handleUpdateStatus(call.id, "in-progress")}
                    className="bg-yellow-500 text-white p-2 rounded"
                  >
                    Mark as In Progress
                  </button>
                )}

                {call.status === "in-progress" && (
                  <>
                    <button
                      onClick={() => handleUpdateStatus(call.id, "resolved")}
                      className="bg-green-500 text-white p-2 rounded mr-2"
                    >
                      Mark as Resolved
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(call.id, "escalated")}
                      className="bg-red-500 text-white p-2 rounded"
                    >
                      Mark as Escalated
                    </button>
                  </>
                )}

                {(call.status === "resolved" || call.status === "escalated") && (
                  <p className="text-gray-600 mt-2">No further actions available.</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CallQueueDashboard;
