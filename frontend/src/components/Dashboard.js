import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-100 p-4 rounded shadow">
            <h2 className="text-xl font-semibold">Pending Tasks</h2>
            <p>15 Tasks</p>
          </div>
          <div className="bg-green-100 p-4 rounded shadow">
            <h2 className="text-xl font-semibold">Resolved Issues</h2>
            <p>120 Cases</p>
          </div>
          <div className="bg-red-100 p-4 rounded shadow">
            <h2 className="text-xl font-semibold">Escalated Calls</h2>
            <p>5 Calls</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
