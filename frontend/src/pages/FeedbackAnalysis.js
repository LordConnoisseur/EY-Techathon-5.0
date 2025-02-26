import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

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
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Feedback Analysis
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading feedback data...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center">
            <div className="w-80 h-80">
              <Pie data={chartData} options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: { color: "#4B5563", font: { size: 14 } }
                  }
                }
              }} />
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              AI Powered Feedback Summary
            </h3>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Category</th>
                  <th className="border border-gray-300 px-4 py-2">Frequency</th>
                  <th className="border border-gray-300 px-4 py-2">AI Advice</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(data.advice).map(([category, summary]) => (
                  <tr key={category}>
                    <td className="border border-gray-300 px-4 py-2">{category}</td>
                    <td className="border border-gray-300 px-4 py-2">{data.grouped_feedback_counts[category]}</td>
                    <td className="border border-gray-300 px-4 py-2">{summary}</td>
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
