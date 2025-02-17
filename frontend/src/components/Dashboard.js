import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

function Dashboard() {
  const handleDeploy = () => {
    // Redirect to the Streamlit deployment URL (if available)
    window.open("http://your-streamlit-app-url", "_blank");
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        
        {/* Dashboard Widgets */}
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

        {/* Deploy Button - Centered Below Widgets */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleDeploy}
            className="bg-purple-600 text-white px-6 py-2 rounded shadow-lg hover:bg-purple-700 transition"
          >
            Deploy on Streamlit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;