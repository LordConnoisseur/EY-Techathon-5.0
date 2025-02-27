import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import "./AnalyticsOverview.css"; // Import CSS file

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
        backgroundColor: ["#FFC107", "#002244"], // Vibrant Yellow & Deep Navy Blue
        hoverBackgroundColor: ["#E0A800", "#004080"], // Slightly darker shades for hover effect
        borderWidth: 3,
        borderColor: "#FFFFFF", // White border for a clean contrast
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
    <div className="analytics-overview">
      <header className="analytics-header">
        <h1>Analytics Overview</h1>
      </header>

      <main className="analytics-main">
        <div className="glass-card">
          <div className="analytics-grid">
            {/* Textual Analytics Overview */}
            <div className="textual-analytics">
              <div className="analytics-item">
                <h3>Total Interactions</h3>
                <p>{analytics.totalInteractions}</p>
              </div>
              <div className="analytics-item">
                <h3>Resolved</h3>
                <p>{analytics.resolved}</p>
              </div>
              <div className="analytics-item">
                <h3>Escalated</h3>
                <p>{analytics.escalated}</p>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="chart-container">
              <Pie data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AnalyticsOverview;
