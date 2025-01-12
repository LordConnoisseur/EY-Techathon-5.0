import React, { useState, useEffect } from "react";

function CallQueueDashboard() {
  const [callQueue, setCallQueue] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetching the call queue data from the Flask API
    const fetchCallQueue = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/calls/queue"); // Corrected API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch call queue");
        }
        const data = await response.json();
        setCallQueue(data);
      } catch (error) {
        setError(error.message); // Handle errors like network issues
      }
    };
    fetchCallQueue();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>; // Display error message if there's an issue
  }

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
          {callQueue.length > 0 ? (
            callQueue.map((call, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{call.client}</td>
                <td className="border border-gray-300 p-2">{call.priority}</td>
                <td className="border border-gray-300 p-2">{call.status}</td>
                <td className="border border-gray-300 p-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded">
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4">No calls in the queue</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CallQueueDashboard;
