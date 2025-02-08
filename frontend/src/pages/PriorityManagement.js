import React, { useEffect, useState } from "react";

function PriorityManagement() {
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    fetchPriorityQueue();
  }, []);

  const fetchPriorityQueue = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/priority-management/get-priority-queue");
      const data = await response.json();
      setCalls(data);
    } catch (error) {
      console.error("Error fetching priority queue:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Priority Management</h2>
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
