import React, { useState, useEffect } from "react";

function SentimentDashboard() {
  const [sentimentData, setSentimentData] = useState({
    positive: 0,
    neutral: 0,
    negative: 0,
  });

  useEffect(() => {
    // Mock API call to fetch sentiment data
    const fetchSentimentData = async () => {
      const data = {
        positive: 50,
        neutral: 30,
        negative: 20,
      };
      setSentimentData(data);
    };

    fetchSentimentData();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Sentiment Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-green-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Positive Sentiment</h3>
          <p>{sentimentData.positive}%</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Neutral Sentiment</h3>
          <p>{sentimentData.neutral}%</p>
        </div>
        <div className="bg-red-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Negative Sentiment</h3>
          <p>{sentimentData.negative}%</p>
        </div>
      </div>
    </div>
  );
}

export default SentimentDashboard;
