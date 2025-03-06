import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CallQueueDashboard.css";

function CallQueueDashboard() {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const loggedInAgent = "Sundaresh";

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

  const handleCallRedirect = () => {
    navigate("/audio-analysis");
  };

  const handleAutoRedirect = () => {
    navigate("/autoresponse");
  };

  return (
    <div className="dashboard-wrapper">
      {/* Dashboard Header with Buttons */}
      <header className="dashboard-header">
        <h1 className="dashboard-title">Call Queue Management</h1>
        <div className="header-buttons">
          <button onClick={() => navigate("/knowledge-base")} className="header-button">Knowledge Base</button>
          <button onClick={() => navigate("/agenttraining")} className="header-button">AI Agent Trainer</button>
          <button onClick={() => navigate("/feedbackanalysis")} className="header-button">Claim Analyzer</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {loading && <p className="loading-text">Loading...</p>}

        {/* Calls Table */}
        <div className="glass-card call-table">
          <table>
            <thead>
              <tr>
                <th>Phone Number</th>
                <th>Caller Name</th>
                <th>Claim Title</th>
                <th>Claim Issue</th>
                <th>Action</th>
                <th>Automated Response Generator</th>

              </tr>
              <tr>
              <td>+1 555-1234</td>
             <td>John Doe</td>
             <td>Car Insurance Claim</td>
             <td>Delay in claim processing</td>
             <td>
                      <button onClick={handleCallRedirect} className="call-button">Call</button>
                    </td>
                    <td>
                      <button onClick={handleAutoRedirect} className="call-button">Auto Response</button>
                    </td>
              </tr>
              <tr>
      <td>+1 555-5678</td>
      <td>Jane Smith</td>
      <td>Health Insurance Claim</td>
      <td>Incorrect reimbursement amount</td>
      <td>
                      <button onClick={handleCallRedirect} className="call-button">Call</button>
                    </td>
                    <td>
                      <button onClick={handleAutoRedirect} className="call-button">Auto Response</button>
                    </td>
    </tr>
    <tr>
      <td>+1 555-9101</td>
      <td>Robert Lee</td>
      <td>Home Damage Claim</td>
      <td>Denied claim without explanation</td>
      <td>
                      <button onClick={handleCallRedirect} className="call-button">Call</button>
                    </td>
                    <td>
                      <button onClick={handleAutoRedirect} className="call-button">Auto Response</button>
                    </td>
    </tr>
    <tr>
      <td>+1 555-1122</td>
      <td>Emily Clark</td>
      <td>Travel Insurance Claim</td>
      <td>Lost baggage claim not processed</td>
      <td>
                      <button onClick={handleCallRedirect} className="call-button">Call</button>
                    </td>
                    <td>
                      <button onClick={handleAutoRedirect} className="call-button">Auto Response</button>
                    </td>

    </tr>
            </thead>
            <tbody>
              {calls.length === 0 ? (
                <tr>
                  <td colSpan="5" className="no-calls-text">My Calls</td>
                </tr>
              ) : (
                calls.map((call) => (
                  <tr key={call.id}>
                    <td>{call.caller_phone}</td>
                    <td>{call.caller_name}</td>
                    <td>{call.claim_title || "N/A"}</td>
                    <td>{call.claim_issue || "N/A"}</td>
                    <td>
                      <button onClick={handleCallRedirect} className="call-button">Call</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default CallQueueDashboard;