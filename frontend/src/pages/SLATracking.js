import React, { useState, useEffect } from "react";

function SLATracking() {
  const [slaData, setSlaData] = useState([]);

  useEffect(() => {
    // Simulating API call for SLA data
    const fetchSlaData = async () => {
      const response = await fetch("/api/sla-tracking"); // Replace with actual endpoint
      const data = await response.json();
      setSlaData(data);
    };
    fetchSlaData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">SLA Tracking</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Call ID</th>
            <th className="border border-gray-300 p-2">SLA Status</th>
            <th className="border border-gray-300 p-2">Time Remaining</th>
          </tr>
        </thead>
        <tbody>
          {slaData.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">{item.callId}</td>
              <td className="border border-gray-300 p-2">{item.slaStatus}</td>
              <td className="border border-gray-300 p-2">{item.timeRemaining}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SLATracking;
