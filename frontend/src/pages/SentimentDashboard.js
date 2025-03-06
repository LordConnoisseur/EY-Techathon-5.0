import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './SentimentDashboard.css'; // Import the same CSS file for consistency

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
              innerHeight:1400,
              innerWidth:1400,
              outerHeight:1400,
              outerWidth:1400

            
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
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Sentiment Dashboard</h1>
      </header>

      <main className="dashboard-main">
        <div className="glass-card sentiment-container">
          {/* User Selection Dropdown */}
          <div className="user-selection">
            <label className="input-label">Select User:</label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="glass-input"
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
          <div className="chart-container">
            {chartData.labels ? (
              <Line data={chartData} options={{ maintainAspectRatio: false }} />
            ) : (
              <p className="no-data">📉 No sentiment data available.</p>
            )}
          </div>

          {/* Button to Fetch a Joke */}
          <div className="joke-button-container">
            <button onClick={fetchJoke} className="joke-button">
              Need a Boost? 🤗
            </button>
          </div>

          {/* Joke Modal */}
          {isJokeOpen && (
            <div className="joke-modal-overlay">
              <div className="joke-modal">
                <h3>Here's a Joke for You!</h3>
                <p>{joke}</p>
                <button onClick={() => setIsJokeOpen(false)} className="close-button">
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default SentimentDashboard;