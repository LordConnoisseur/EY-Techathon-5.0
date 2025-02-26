import React, { useState } from 'react';

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
    <div style={styles.container}>
      <h1 style={styles.heading}>Client Dashboard</h1>
      <div style={styles.formContainer}>
        <h2 style={styles.subHeading}>Submit Feedback</h2>
        {error && <p style={styles.errorText}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div>
            <label style={styles.label}>Language:</label>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} style={styles.select}>
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="bn">Bengali</option>
              <option value="gu">Gujarati</option>
            </select>
          </div>
          <div>
            <label style={styles.label}>Feedback:</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
              style={styles.textarea}
            />
          </div>
          <button type="submit" style={styles.button}>Submit Feedback</button>
        </form>
        {sentiment !== null && (
          <div style={styles.resultContainer}>
            <h3>Sentiment Analysis Result</h3>
            <p><strong>Sentiment Score:</strong> {sentiment}</p>
            {translatedText && <p><strong>Translated Text:</strong> {translatedText}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    minHeight: '100vh',
  },
  heading: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
  },
  subHeading: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#444',
    marginBottom: '10px',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '450px',
    width: '100%',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  label: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#555',
    alignSelf: 'flex-start',
  },
  select: {
    width: '100%',
    padding: '10px',
    marginBottom: '12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
    backgroundColor: '#fff',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    marginBottom: '12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
    resize: 'vertical',
    minHeight: '80px',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  errorText: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px',
  },
  resultContainer: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderRadius: '5px',
    textAlign: 'left',
  }
};

export default ClientDashboard;
