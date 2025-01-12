import React, { useState, useEffect } from "react";

function CallQueueDashboard() {
  const [callQueue, setCallQueue] = useState([]);

  useEffect(() => {
    // Simulating API call to fetch call queue
    const fetchCallQueue = async () => {
      const response = await fetch("/api/call-queue"); // Replace with actual API endpoint
      const data = await response.json();
      setCallQueue(data);
    };
    fetchCallQueue();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Call Queue Dashboard</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Caller</th>
            <th className="border border-gray-300 p-2">Priority</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {callQueue.map((call, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">{call.callerName}</td>
              <td className="border border-gray-300 p-2">{call.priority}</td>
              <td className="border border-gray-300 p-2">{call.status}</td>
              <td className="border border-gray-300 p-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CallQueueDashboard;
