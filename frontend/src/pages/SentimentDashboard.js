import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function SentimentDashboard() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [sentimentData, setSentimentData] = useState([]);
  const [chartData, setChartData] = useState({});
  const [joke, setJoke] = useState('');
  const [isJokeOpen, setIsJokeOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/sentiment/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchSentimentData = async () => {
      const endpoint = selectedUser
        ? `http://127.0.0.1:5000/api/sentiment/sentiment-history/${selectedUser}`
        : 'http://127.0.0.1:5000/api/sentiment/sentiment-history/all';
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        setSentimentData(data);

        const labels = data.map((entry) => new Date(entry.timestamp).toLocaleDateString());
        const scores = data.map((entry) => entry.sentiment_score);
        setChartData({
          labels,
          datasets: [
            {
              label: 'Sentiment Score Over Time',
              data: scores,
              fill: false,
              backgroundColor: 'rgba(255, 99, 132, 0.8)',
              borderColor: 'rgba(255, 99, 132, 1)',
              pointBackgroundColor: 'rgba(255, 99, 132, 1)',
              pointBorderColor: '#fff',
              pointRadius: 5,
              borderWidth: 2,
              tension: 0.3,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching sentiment data:', error);
      }
    };

    fetchSentimentData();
  }, [selectedUser]);

  // Fetch a joke when the button is clicked
  const fetchJoke = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/jokes/get-joke');
      const data = await response.json();
      setJoke(data.joke || 'Couldn’t fetch a joke, but you’re awesome anyway! 😃');
      setIsJokeOpen(true);
    } catch (error) {
      console.error('Error fetching joke:', error);
      setJoke('Oops! Something went wrong. Stay positive! ✨');
      setIsJokeOpen(true);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">📊 Sentiment Dashboard</h2>

      {/* User Selection Dropdown */}
      <div className="mb-6 text-center">
        <label className="font-semibold text-lg mr-3">Select User:</label>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="border border-gray-400 p-2 rounded-lg"
        >
          <option value="">All Users</option>
          {users.map((user) => (
            <option key={user.id} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      {/* Sentiment Trend Chart */}
      <div className="mb-6">
        {chartData.labels ? (
          <div className="w-full mx-auto" style={{ maxWidth: '700px', height: '300px' }}>
            <Line data={chartData} options={{ maintainAspectRatio: false }} />
          </div>
        ) : (
          <p className="text-center text-gray-500">📉 No sentiment data available.</p>
        )}
      </div>

      {/* Sentiment History Table */}
      <div className="overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">📜 Sentiment History</h3>
        <table className="table-auto w-full border border-gray-300 shadow-md">
          <thead className="bg-gray-100">
            <tr className="text-gray-700">
              <th className="border border-gray-300 px-4 py-2">📅 Timestamp</th>
              <th className="border border-gray-300 px-4 py-2">💬 Feedback</th>
              <th className="border border-gray-300 px-4 py-2">📊 Sentiment Score</th>
            </tr>
          </thead>
          <tbody>
            {sentimentData.map((feedback, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{new Date(feedback.timestamp).toLocaleString()}</td>
                <td className="border border-gray-300 px-4 py-2">{feedback.feedback_text}</td>
                <td
                  className={`border border-gray-300 px-4 py-2 font-semibold ${
                    feedback.sentiment_score > 0
                      ? 'text-green-600'
                      : feedback.sentiment_score < 0
                      ? 'text-red-600'
                      : 'text-gray-600'
                  }`}
                >
                  {feedback.sentiment_score}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Button to Fetch a Joke */}
      <div className="text-center mt-6">
        <button
          onClick={fetchJoke}
          className="bg-yellow-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300"
        >
          Need a Boost? 🤗
        </button>
      </div>

      {/* Joke Modal */}
      {isJokeOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            <h3 className="text-lg font-semibold mb-4">😆 Here's a Joke for You!</h3>
            <p className="text-gray-700">{joke}</p>
            <button
              onClick={() => setIsJokeOpen(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SentimentDashboard;
