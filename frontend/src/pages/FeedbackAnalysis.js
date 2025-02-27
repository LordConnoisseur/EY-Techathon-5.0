import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import "./FeedbackAnalysis.css"; // Import external CSS

Chart.register(ArcElement, Tooltip, Legend);

function FeedbackAnalysis() {
  const [data, setData] = useState({ grouped_feedback_counts: {}, advice: {} });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/feedback_analysis/analyze-feedback")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const chartData = {
    labels: Object.keys(data.grouped_feedback_counts),
    datasets: [
      {
        data: Object.values(data.grouped_feedback_counts),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
        hoverBackgroundColor: ["#FF4365", "#2E7CB8", "#D4A233", "#3A9A48"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="feedback-wrapper">
      <h2 className="feedback-title">Feedback Analysis</h2>

      {loading ? (
        <p className="loading-text">Loading feedback data...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : (
        <div className="feedback-content">
          <div className="chart-container">
            <div className="chart-wrapper">
              <Pie data={chartData} options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: { color: "#ffffff", font: { size: 14 } }
                  }
                }
              }} />
            </div>
          </div>

          <div className="summary-container glass-card">
            <h3 className="summary-title">AI Powered Feedback Summary</h3>
            <table className="summary-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Frequency</th>
                  <th>AI Advice</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(data.advice).map(([category, summary]) => (
                  <tr key={category}>
                    <td>{category}</td>
                    <td>{data.grouped_feedback_counts[category]}</td>
                    <td>{summary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default FeedbackAnalysis;