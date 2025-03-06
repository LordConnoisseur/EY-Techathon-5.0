import React from "react";
import { useNavigate } from "react-router-dom";
import { getRoles, logout } from "../authService";
import "./Dashboard.css"; // Import external CSS

const Dashboard = () => {
  const navigate = useNavigate();
  const roles = getRoles();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Sample Data
  const claimsData = [
    { id: "C123", issue: "Fraud", agent: "Avijeet", sentiment: "Negative", priority: "High", sla: "Breached" },
    { id: "C124", issue: "Account Locked", agent: "Bob", sentiment: "Neutral", priority: "Medium", sla: "Not Breached" },
    { id: "C125", issue: "Payment Issue", agent: "Sayan", sentiment: "Negative", priority: "High", sla: "Not Breached" },
  ];

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <a href="/call-management" className="nav-button">📞 Call Management</a>
        <a href="/call-scheduling" className="nav-button">📅 Call Scheduling</a>
        <a href="/priority-management" className="nav-button">⚡ Priority Management</a>
        <a href="/sla-tracking" className="nav-button">📊 SLA Tracking</a>
        <a href="/data-processing" className="nav-button">🎛️ Data Processing</a>
        <a href="/document-upload" className="nav-button">📃 Document Upload</a>
        <a href="/data-validation" className="nav-button">✅ Data Validation</a>
        <a href="/batch-processing" className="nav-button">📚 Batch Processing</a>
        <button className="logout-button" onClick={handleLogout}>🚪 Logout</button>
      </nav>

      {/* Dashboard Content */}
      <div className="dashboard-content">
        <h1 className="dashboard-title">Welcome Manager</h1>

        {/* Claims Table */}
        <div className="claims-table-container">
          <h2 className="table-title">Claims</h2>
          <table className="claims-table">
            <thead>
              <tr>
                <th>Claim ID</th>
                <th>Claim Issue</th>
                <th>Agent Name</th>
                <th>Tracked Sentiment</th>
                <th>Priority</th>
                <th>SLA Status</th>
              </tr>
            </thead>
            <tbody>
              {claimsData.map((claim, index) => (
                <tr key={index}>
                  <td>{claim.id}</td>
                  <td>{claim.issue}</td>
                  <td>{claim.agent}</td>
                  <td>{claim.sentiment}</td>
                  <td>{claim.priority}</td>
                  <td className={claim.sla === "Breached" ? "sla-breached" : "sla-ok"}>
                    {claim.sla}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;