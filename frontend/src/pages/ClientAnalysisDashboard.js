import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Link, Outlet } from "react-router-dom";

function ClientAnalysisDashboard() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1">
        {/* Header */}
        <Header />

        {/* Page content */}
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Client Analysis Dashboard</h1>

          {/* Navigation links */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="sentiment-dashboard"
              className="bg-blue-100 p-4 rounded shadow hover:bg-blue-200 transition"
            >
              <h2 className="text-lg font-semibold">Sentiment Dashboard</h2>
              <p>View sentiment analysis of client interactions.</p>
            </Link>
            <Link
              to="client-interaction-history"
              className="bg-green-100 p-4 rounded shadow hover:bg-green-200 transition"
            >
              <h2 className="text-lg font-semibold">Client Interaction History</h2>
              <p>Explore past client interactions and statuses.</p>
            </Link>
            <Link
              to="escalation-management"
              className="bg-yellow-100 p-4 rounded shadow hover:bg-yellow-200 transition"
            >
              <h2 className="text-lg font-semibold">Escalation Management</h2>
              <p>Manage escalated calls and interactions.</p>
            </Link>
            <Link
              to="analytics-overview"
              className="bg-red-100 p-4 rounded shadow hover:bg-red-200 transition"
            >
              <h2 className="text-lg font-semibold">Analytics Overview</h2>
              <p>View overall client interaction analytics.</p>
            </Link>
          </div>

          {/* Subpage content */}
          <div className="bg-gray-100 p-6 rounded shadow">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientAnalysisDashboard;
