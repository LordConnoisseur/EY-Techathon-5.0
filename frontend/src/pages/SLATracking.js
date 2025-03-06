import React, { useEffect, useState } from "react";
import "./SLATracking.css"; // Import external CSS

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
    <div className="dashboard-wrapper">
      {/* Dashboard Header */}
      <header className="dashboard-header">
        <h1 className="dashboard-title">SLA Tracking</h1>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className=" sla-alerts">
          {slaAlerts.length === 0 ? (
            <p className="no-alerts">No SLA breaches</p>
          ) : (
            <ul className="alert-list">
              {slaAlerts.map((alert) => (
                <li key={alert.call_id} className="alert-item">
                  <p><strong>Caller:</strong> {alert.caller_name}</p>
                  <p><strong>Priority:</strong> {alert.priority}</p>
                  <p><strong>Status:</strong> {alert.status}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

export default SLATracking;