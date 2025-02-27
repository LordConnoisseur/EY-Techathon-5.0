import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CallManagementDashboard.css"; // Import external CSS

function CallManagementDashboard() {
  const [stats, setStats] = useState({
    pending: 0,
    inProgress: 0,
    resolved: 0,
    escalated: 0,
  });

  const [formData, setFormData] = useState({
    customerName: "",
    issue: "",
    resolutionNotes: "",
  });

  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCallStats();
  }, []);

  const fetchCallStats = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/calls/call-stats");
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching call stats:", error);
    }
  };

  const handleTranscriptChange = (event) => {
    setTranscript(event.target.value);
  };

  const extractFormDetails = async () => {
    if (!transcript.trim()) {
      setError("Please enter a call transcript.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:5000/api/form-processing/fill-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transcript }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setFormData({
        customerName: data.form_data.customerName || "",
        issue: data.form_data.issue || "",
        resolutionNotes: data.form_data.resolutionNotes || "",
      });
    } catch (error) {
      console.error("Error extracting form details:", error);
      setError("Failed to extract details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-wrapper">
      {/* Header with Dashboard Title */}
      <header className="dashboard-header">
        <h1 className="dashboard-title">Call Management Dashboard</h1>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Call Statistics Grid */}
        <div className="stats-grid">
          <div className="glass-card stat-card">
            <h2 className="stat-title">Pending Calls</h2>
            <p className="stat-value">{stats.pending}</p>
          </div>
          <div className="glass-card stat-card">
            <h2 className="stat-title">In Progress Calls</h2>
            <p className="stat-value">{stats.inProgress}</p>
          </div>
          <div className="glass-card stat-card">
            <h2 className="stat-title">Resolved Issues</h2>
            <p className="stat-value">{stats.resolved}</p>
          </div>
          <div className="glass-card stat-card">
            <h2 className="stat-title">Escalated Calls</h2>
            <p className="stat-value">{stats.escalated}</p>
          </div>
        </div>

        {/* Automated Form Filling Section
        <div className="glass-card form-section">
          <h2 className="section-title">Automated Form Filling (AI Bot)</h2>

          Call Transcript Input -- Comment this out
          <textarea
            placeholder="Paste the call transcript here..."
            value={transcript}
            onChange={handleTranscriptChange}
            className="transcript-input"
          />

          Extract Details Button -- Comment this out
          <button
            onClick={extractFormDetails}
            className="glass-card action-button"
            disabled={loading}
          >
            {loading ? "Extracting..." : "Extract Details"}
          </button>

          Error Message -- Comment this out
          {error && <p className="error-message">{error}</p>}

          Display Extracted Form Data -- Comment this out
          {formData.customerName && (
            <div className="form-data">
              <label>Customer Name:</label>
              <input type="text" value={formData.customerName} readOnly />

              <label>Issue:</label>
              <textarea value={formData.issue} readOnly />

              <label>Resolution Notes:</label>
              <textarea value={formData.resolutionNotes} readOnly />
            </div>
          )}
        </div> */}
      </main>

      {/* Floating Navigation Bar */}
      <nav className="floating-nav">
        <Link to="/call-queue" className="nav-link">
          Call Queue
        </Link>
        <Link to="/call-scheduling" className="nav-link">
          Call Scheduling
        </Link>
        <Link to="/priority-management" className="nav-link">
          Priority Management
        </Link>
        <Link to="/sla-tracking" className="nav-link">
          SLA Tracking
        </Link>
      </nav>
    </div>
  );
}

export default CallManagementDashboard;