import React, { useState, useEffect } from "react";

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

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Analytics Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Total Interactions</h3>
          <p>{analytics.totalInteractions}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Resolved</h3>
          <p>{analytics.resolved}</p>
        </div>
        <div className="bg-red-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">Escalated</h3>
          <p>{analytics.escalated}</p>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsOverview;
