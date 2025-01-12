import React, { useState, useEffect } from "react";

function EscalationManagement() {
  const [escalatedCalls, setEscalatedCalls] = useState([]);

  useEffect(() => {
    // Mock API call to fetch escalated calls
    const fetchEscalatedCalls = async () => {
      const data = [
        { id: 1, client: "John Doe", issue: "Claim Delay", status: "Escalated" },
        { id: 2, client: "Jane Smith", issue: "Incorrect Information", status: "Resolved" },
      ];
      setEscalatedCalls(data);
    };

    fetchEscalatedCalls();
  }, []);

  const handleResolve = (id) => {
    setEscalatedCalls(escalatedCalls.filter((call) => call.id !== id));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Escalation Management</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Client</th>
            <th className="px-4 py-2 text-left">Issue</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {escalatedCalls.map((call) => (
            <tr key={call.id}>
              <td className="px-4 py-2">{call.client}</td>
              <td className="px-4 py-2">{call.issue}</td>
              <td className="px-4 py-2">{call.status}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleResolve(call.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Resolve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EscalationManagement;
