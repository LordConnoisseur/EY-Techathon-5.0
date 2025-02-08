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

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1">
        {/* Header */}
        <Header />

        {/* Call Management Navigation */}
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Call Management Dashboard</h1>
          <div className="flex space-x-4 mb-6">
            <Link
              to="call-queue"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Call Queue
            </Link>
            <Link
              to="call-scheduling"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Call Scheduling
            </Link>
            <Link
              to="priority-management"
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Priority Management
            </Link>
            <Link
              to="sla-tracking"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              SLA Tracking
            </Link>
          </div>

          {/* Dashboard Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-blue-100 p-4 rounded shadow">
              <h2 className="text-xl font-semibold">Pending Calls</h2>
              <p>{stats.pending}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded shadow">
              <h2 className="text-xl font-semibold">In Progress Calls</h2>
              <p>{stats.inProgress}</p>
            </div>
            <div className="bg-green-100 p-4 rounded shadow">
              <h2 className="text-xl font-semibold">Resolved Issues</h2>
              <p>{stats.resolved}</p>
            </div>
            <div className="bg-red-100 p-4 rounded shadow">
              <h2 className="text-xl font-semibold">Escalated Calls</h2>
              <p>{stats.escalated}</p>
            </div>
          </div>

          {/* Nested Routing for Call Management Pages */}
          <div className="bg-gray-100 p-4 rounded shadow">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CallManagementDashboard;
