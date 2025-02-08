import React, { useState } from "react";

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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Call Scheduling</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Caller Name</label>
          <input
            type="text"
            value={schedule.caller}
            onChange={(e) => setSchedule({ ...schedule, caller: e.target.value })}
            className="border border-gray-300 rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Caller Phone</label>
          <input
            type="text"
            value={schedule.phone}
            onChange={(e) => setSchedule({ ...schedule, phone: e.target.value })}
            className="border border-gray-300 rounded w-full p-2"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Issue Type</label>
          <select
            value={schedule.issue}
            onChange={(e) => setSchedule({ ...schedule, issue: e.target.value })}
            className="border border-gray-300 rounded w-full p-2"
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
        <div>
          <label className="block text-gray-700">Issue Description</label>
          <textarea
            value={schedule.description}
            onChange={(e) => setSchedule({ ...schedule, description: e.target.value })}
            className="border border-gray-300 rounded w-full p-2 h-24"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700">Assign to Agent</label>
          <input
            type="text"
            value={schedule.agent}
            onChange={(e) => setSchedule({ ...schedule, agent: e.target.value })}
            className="border border-gray-300 rounded w-full p-2"
            required
          />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Schedule Call
        </button>
      </form>
    </div>
  );
}

export default CallScheduling;
