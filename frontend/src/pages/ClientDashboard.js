import React, { useState } from 'react';
import './ClientDashboard.css'; // Import external CSS

function ClientDashboard() {
  const [feedback, setFeedback] = useState('');
  const [language, setLanguage] = useState('en');
  const [error, setError] = useState(null);
  const [sentiment, setSentiment] = useState(null);
  const [translatedText, setTranslatedText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback) {
      setError('Please provide feedback.');
      return;
    }

    const userId = localStorage.getItem('user_id');
    if (!userId) {
      setError('User not authenticated.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/api/feedback/submit-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedback, language, client_id: userId }),
      });

      if (response.ok) {
        const data = await response.json();
        setSentiment(data.sentiment_score);
        setTranslatedText(data.translated_text);
        alert('Feedback submitted successfully.');
        setFeedback('');
        setError(null);
      } else {
        const data = await response.json();
        setError(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setError('An error occurred while submitting your feedback. Please try again later.');
    }
  };

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Client Dashboard</h1>
      </header>

      <main className="dashboard-main">
        <div className="glass-card form-container">
          <h2 className="sub-heading">Submit Feedback</h2>
          {error && <p className="error-text">{error}</p>}
          <form onSubmit={handleSubmit} className="form">
            <div>
              <label className="label">Language:</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="select"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="bn">Bengali</option>
                <option value="gu">Gujarati</option>
              </select>
            </div>
            <div>
              <label className="label">Feedback:</label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
                className="textarea"
              />
            </div>
            <button type="submit" className="action-button">
              Submit Feedback
            </button>
          </form>
          {sentiment !== null && (
            <div className="result-container">
              <h3>Sentiment Analysis Result</h3>
              <p><strong>Sentiment Score:</strong> {sentiment}</p>
              {translatedText && <p><strong>Translated Text:</strong> {translatedText}</p>}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default ClientDashboard;