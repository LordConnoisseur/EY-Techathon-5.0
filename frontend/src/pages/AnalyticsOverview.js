import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

// Register chart elements
Chart.register(ArcElement, Tooltip, Legend);

function AnalyticsOverview() {
  const [analytics, setAnalytics] = useState({
    totalInteractions: 0,
    resolved: 0,
    escalated: 0,
  });

  useEffect(() => {
    // Mock API call to fetch analytics data
    const fetchAnalyticsData = async () => {
      const data = {
        totalInteractions: 500,
        resolved: 450,
        escalated: 50,
      };
      setAnalytics(data);
    };

    fetchAnalyticsData();
  }, []);

  // Prepare chart data
  const chartData = {
    labels: ["Resolved", "Escalated"],
    datasets: [
      {
        data: [analytics.resolved, analytics.escalated],
        backgroundColor: ["#6EC6FF", "#FF8BCB"], // Light blue & pink
        hoverBackgroundColor: ["#4BA3D8", "#FF5FA8"], // Darker shades for hover effect
        borderWidth: 3,
        borderColor: "#FFFFFF", // White border for a cleaner look
        hoverOffset: 10, // Creates a 3D-like effect
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 14,
          },
          color: "#333",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        bodyFont: {
          size: 14,
        },
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Analytics Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Textual Analytics Overview */}
        <div className="flex flex-col space-y-4">
          <div className="p-4 bg-blue-100 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-blue-800">Total Interactions</h3>
            <p className="text-xl font-bold">{analytics.totalInteractions}</p>
          </div>
          <div className="p-4 bg-pink-100 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-blue-800">Resolved</h3>
            <p className="text-xl font-bold">{analytics.resolved}</p>
          </div>
          <div className="p-4 bg-red-100 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-red-800">Escalated</h3>
            <p className="text-xl font-bold">{analytics.escalated}</p>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="flex justify-center items-center">
          <div className="w-80 h-80">
            <Pie data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsOverview;
