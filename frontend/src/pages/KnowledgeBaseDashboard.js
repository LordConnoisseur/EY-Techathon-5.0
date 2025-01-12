import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Link, Outlet } from "react-router-dom";

function KnowledgeBaseDashboard() {
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
          <h1 className="text-2xl font-bold mb-4">Knowledge Base Dashboard</h1>

          {/* Navigation links */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="search"
              className="bg-blue-100 p-4 rounded shadow hover:bg-blue-200 transition"
            >
              <h2 className="text-lg font-semibold">Search</h2>
              <p>Find knowledge articles quickly.</p>
            </Link>
            <Link
              to="article-view"
              className="bg-green-100 p-4 rounded shadow hover:bg-green-200 transition"
            >
              <h2 className="text-lg font-semibold">Article View</h2>
              <p>View details of specific articles.</p>
            </Link>
            <Link
              to="knowledge-graph"
              className="bg-yellow-100 p-4 rounded shadow hover:bg-yellow-200 transition"
            >
              <h2 className="text-lg font-semibold">Knowledge Graph</h2>
              <p>Visualize relationships between topics.</p>
            </Link>
            <Link
              to="content-management"
              className="bg-red-100 p-4 rounded shadow hover:bg-red-200 transition"
            >
              <h2 className="text-lg font-semibold">Content Management</h2>
              <p>Manage articles and content.</p>
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

export default KnowledgeBaseDashboard;
