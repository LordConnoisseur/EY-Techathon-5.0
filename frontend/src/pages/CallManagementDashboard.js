import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar"; // Adjust path as necessary
import Header from "../components/Header"; // Adjust path as necessary
import { Link, Outlet } from "react-router-dom";

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

    // const interval = setInterval(() => {
    //   fetchCallStats();
    // }, 50); // Adjust the refresh rate as required

    // return () => clearInterval(interval);
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
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Call Management Dashboard</h1>

          {/* Navigation Links */}
          <div className="flex space-x-4 mb-6">
            <Link to="call-queue" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Call Queue</Link>
            <Link to="call-scheduling" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Call Scheduling</Link>
            <Link to="priority-management" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Priority Management</Link>
            <Link to="sla-tracking" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">SLA Tracking</Link>
          </div>

          {/* Call Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-blue-100 p-4 rounded shadow"><h2 className="text-xl font-semibold">Pending Calls</h2><p>{stats.pending}</p></div>
            <div className="bg-yellow-100 p-4 rounded shadow"><h2 className="text-xl font-semibold">In Progress Calls</h2><p>{stats.inProgress}</p></div>
            <div className="bg-green-100 p-4 rounded shadow"><h2 className="text-xl font-semibold">Resolved Issues</h2><p>{stats.resolved}</p></div>
            <div className="bg-red-100 p-4 rounded shadow"><h2 className="text-xl font-semibold">Escalated Calls</h2><p>{stats.escalated}</p></div>
          </div>

          {/* Automated Form Filling Section */}
          <div className="bg-gray-100 p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Automated Form Filling (AI Bot)</h2>

            {/* Call Transcript Input */}
            <textarea
              placeholder="Paste the call transcript here..."
              value={transcript}
              onChange={handleTranscriptChange}
              className="w-full h-24 p-2 border rounded mb-4"
            />

            {/* Button Wrapper (Flexbox Centered) */}
            <div className="flex justify-end">
              <button 
                onClick={extractFormDetails} 
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
              >
                {loading ? "Extracting..." : "Extract Details"}
              </button>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 mt-2">{error}</p>}

            {/* Display Extracted Form Data */}
            {formData.customerName && (
              <div className="mt-6">
                <label className="block text-lg font-semibold">Customer Name:</label>
                <input type="text" value={formData.customerName} className="border p-2 rounded w-full mb-2" readOnly />

                <label className="block text-lg font-semibold">Issue:</label>
                <textarea value={formData.issue} className="border p-2 rounded w-full mb-2" readOnly />

                <label className="block text-lg font-semibold">Resolution Notes:</label>
                <textarea value={formData.resolutionNotes} className="border p-2 rounded w-full mb-2" readOnly />
              </div>
            )}
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default CallManagementDashboard;