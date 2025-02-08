import React, { useEffect, useState } from "react";

function SLATracking() {
  const [slaAlerts, setSlaAlerts] = useState([]);

  useEffect(() => {
    fetchSLAAlerts();
  }, []);

  const fetchSLAAlerts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/sla-tracking/check-sla");
      const data = await response.json();
      setSlaAlerts(data.sla_alerts);
    } catch (error) {
      console.error("Error fetching SLA alerts:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">SLA Tracking</h2>
      <div className="bg-gray-100 p-6 rounded shadow">
        {slaAlerts.length === 0 ? <p>No SLA breaches</p> : (
          <ul>
            {slaAlerts.map((alert) => (
              <li key={alert.call_id} className="mb-4 p-4 border-b bg-red-200">
                <p><strong>Caller:</strong> {alert.caller_name}</p>
                <p><strong>Priority:</strong> {alert.priority}</p>
                <p><strong>Status:</strong> {alert.status}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SLATracking;
