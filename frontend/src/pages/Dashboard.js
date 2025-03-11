import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRoles, logout } from "../authService";
import { motion } from "framer-motion";

const Dashboard = () => {
  const navigate = useNavigate();
  const [claimsData, setClaimsData] = useState([]);
  const [schedulingClaim, setSchedulingClaim] = useState(null); // Track claim being scheduled
  const [issueType, setIssueType] = useState("");
  const [assignedAgent, setAssignedAgent] = useState("");
  const [loading, setLoading] = useState(false);

  const roles = getRoles();

  // Fetch claims from backend
  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/call-queue/pending-claims");
        if (response.ok) {
          const data = await response.json();
          setClaimsData(data);
        } else {
          console.error("Failed to fetch claims.");
        }
      } catch (error) {
        console.error("Error fetching claims:", error);
      }
    };

    fetchClaims();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleScheduleClick = (claim) => {
    setSchedulingClaim(claim);
    setIssueType("");
    setAssignedAgent("");
  };

  const handleScheduleSubmit = async (claim) => {
    if (!issueType || !assignedAgent) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/api/call-queue/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          caller_name: claim.name,
          caller_phone: claim.phone,
          issue_type: issueType,
          issue_description: claim.incident_detail,
          assigned_agent: assignedAgent,
          status: "pending",
        }),
      });

      if (response.ok) {
        alert("Call scheduled successfully!");
        setSchedulingClaim(null);
      } else {
        alert("Failed to schedule call.");
      }
    } catch (error) {
      console.error("Error scheduling call:", error);
      alert("An error occurred.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 min-h-screen font-sans flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 md:px-20 py-6 fixed w-full top-0 z-50 backdrop-blur-lg bg-white/90 shadow-lg border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900">OptiClaim</h1>
        <div className="hidden md:flex gap-6 items-center text-gray-800 text-lg">
          <button onClick={() => navigate("/call-management")} className="hover:text-yellow-500 transition-colors">📞 Call Management</button>
          <button onClick={() => navigate("/call-scheduling")} className="hover:text-yellow-500 transition-colors">📅 Call Scheduling</button>
          <button onClick={() => navigate("/priority-management")} className="hover:text-yellow-500 transition-colors">⚡ Priority Management</button>
          <button onClick={() => navigate("/sla-tracking")} className="hover:text-yellow-500 transition-colors">📊 SLA Tracking</button>
          <button onClick={() => navigate("/document-upload")} className="hover:text-yellow-500 transition-colors">📑 Documents</button>
          <button onClick={handleLogout} className="px-8 py-3 rounded-full text-white bg-red-500 hover:bg-red-400 transition-all font-semibold shadow-lg">Logout</button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center pt-24 pb-16 px-6 md:px-20">
        <motion.div
          className="bg-gradient-to-r from-gray-100 to-gray-300 rounded-xl shadow-2xl p-8 w-full max-w-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Claims Table */}
          <div className="w-full overflow-x-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6"><center>Pending Claims</center></h2>
            <table className="w-full bg-white rounded-xl shadow-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Phone Number</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Policy Number</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Incident Detail</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {claimsData.length > 0 ? (
                  claimsData.map((claim, index) => (
                    <React.Fragment key={index}>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-900">{claim.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{claim.phone}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{claim.policy_no}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{claim.incident_detail}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <button
                            onClick={() => handleScheduleClick(claim)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600 transition-all"
                          >
                            Schedule
                          </button>
                        </td>
                      </tr>

                      {schedulingClaim === claim && (
                        <tr>
                          <td colSpan="5" className="px-6 py-4 bg-gray-100">
                            <div className="flex items-center space-x-4">
                              <input
                                type="text"
                                placeholder="Issue Type"
                                value={issueType}
                                onChange={(e) => setIssueType(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md"
                              />
                              <input
                                type="text"
                                placeholder="Agent Name"
                                value={assignedAgent}
                                onChange={(e) => setAssignedAgent(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md"
                              />
                              <button
                                onClick={() => handleScheduleSubmit(claim)}
                                className="bg-green-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-600 transition-all"
                                disabled={loading}
                              >
                                {loading ? "Scheduling..." : "Confirm"}
                              </button>
                              <button
                                onClick={() => setSchedulingClaim(null)}
                                className="bg-gray-400 text-white px-4 py-2 rounded-full shadow-lg hover:bg-gray-500 transition-all"
                              >
                                Cancel
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-500">No claims available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div>
            <center>
              <button
                onClick={() => navigate("/analytics-overview")}
                className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-2 px-4 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Analytics Overview
              </button>
            </center>
          </div>
        </motion.div>
      </main>
    </div>
    
  );
};

export default Dashboard;
