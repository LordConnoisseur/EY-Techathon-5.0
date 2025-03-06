import React, { useState } from "react";
import "./CallScheduling.css"; // Import external CSS

function CallScheduling() {
  const [schedule, setSchedule] = useState({
    caller: "",
    phone: "",
    issue: "",
    description: "",
    agent: "",
  });

  // Predefined issue types for dropdown
  const issueTypes = [
    "Fraud",
    "Urgent Claim",
    "Technical Issue",
    "Claim Status Update",
    "Payment Issue",
    "General Inquiry",
    "Policy Update",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/api/call-queue/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caller_name: schedule.caller,
          caller_phone: schedule.phone,
          issue_type: schedule.issue,
          issue_description: schedule.description,
          assigned_agent: schedule.agent,
          status: "pending",
        }),
      });

      if (response.ok) {
        alert("Call scheduled successfully!");
        setSchedule({ caller: "", phone: "", issue: "", description: "", agent: "" });
      } else {
        alert("Failed to schedule call.");
      }
    } catch (error) {
      console.error("Error scheduling call:", error);
    }
  };

  return (
    <div className="dashboard-wrapper">
      {/* Dashboard Header */}
      <header className="dashboard-header">
        <h1 className="dashboard-title">Call Scheduling</h1>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <form onSubmit={handleSubmit} className="glass-card scheduling-form">
          {/* Caller Name */}
          <div className="form-group">
            <label className="form-label">Caller Name</label>
            <input
              type="text"
              value={schedule.caller}
              onChange={(e) => setSchedule({ ...schedule, caller: e.target.value })}
              className="form-input"
              required
            />
          </div>

          {/* Caller Phone */}
          <div className="form-group">
            <label className="form-label">Caller Phone</label>
            <input
              type="text"
              value={schedule.phone}
              onChange={(e) => setSchedule({ ...schedule, phone: e.target.value })}
              className="form-input"
              required
            />
          </div>

          {/* Issue Type */}
          <div className="form-group">
            <label className="form-label">Issue Type</label>
            <select
              value={schedule.issue}
              onChange={(e) => setSchedule({ ...schedule, issue: e.target.value })}
              className="form-input"
              required
            >
              <option value="">Select an Issue Type</option>
              {issueTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Issue Description */}
          <div className="form-group">
            <label className="form-label">Issue Description</label>
            <textarea
              value={schedule.description}
              onChange={(e) => setSchedule({ ...schedule, description: e.target.value })}
              className="form-input"
              required
            ></textarea>
          </div>

          {/* Assign to Agent */}
          <div className="form-group">
            <label className="form-label">Assign to Agent</label>
            <input
              type="text"
              value={schedule.agent}
              onChange={(e) => setSchedule({ ...schedule, agent: e.target.value })}
              className="form-input"
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="action-button submit-button">
            Schedule Call
          </button>
        </form>
      </main>
    </div>
  );
}

export default CallScheduling;