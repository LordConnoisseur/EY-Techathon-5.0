import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Link, Outlet } from "react-router-dom";

function DataProcessingDashboard() {
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
          <h1 className="text-2xl font-bold mb-4">Data Processing Dashboard</h1>

          {/* Navigation links */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/document-upload"
              className="bg-blue-100 p-4 rounded shadow hover:bg-blue-200 transition"
            >
              <h2 className="text-lg font-semibold">Document Upload</h2>
              <p>Upload documents for processing.</p>
            </Link>
            <Link
              to="/form-processing"
              className="bg-green-100 p-4 rounded shadow hover:bg-green-200 transition"
            >
              <h2 className="text-lg font-semibold">Form Processing</h2>
              <p>Process forms for data extraction.</p>
            </Link>
            <Link
              to="/data-validation"
              className="bg-yellow-100 p-4 rounded shadow hover:bg-yellow-200 transition"
            >
              <h2 className="text-lg font-semibold">Data Validation</h2>
              <p>Ensure data accuracy and integrity.</p>
            </Link>
            <Link
              to="/batch-processing"
              className="bg-red-100 p-4 rounded shadow hover:bg-red-200 transition"
            >
              <h2 className="text-lg font-semibold">Batch Processing</h2>
              <p>Manage large batches of data processing.</p>
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

export default DataProcessingDashboard;
