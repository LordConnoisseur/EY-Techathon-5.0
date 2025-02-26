import React, { useState } from 'react';

// KnowledgeComponent for file upload and query submission
const KnowledgeComponent = () => {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleFileUpload = async () => {
    if (!file) {
      setError('Please upload a PDF file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    setError('');
    setResponse('');

    try {
      const res = await fetch('http://127.0.0.1:5000/api/knowledge/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setResponse(data.message);
      } else {
        setError(data.error || 'An error occurred while uploading the file.');
      }
    } catch (error) {
      setError('Error uploading file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuerySubmit = async () => {
    if (!query) {
      setError('Please enter a query.');
      return;
    }

    setLoading(true);
    setError('');
    setResponse('');

    try {
      const res = await fetch('http://127.0.0.1:5000/api/knowledge/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponse(data.answer);
      } else {
        setError(data.error || 'An error occurred while processing the query.');
      }
    } catch (error) {
      setError('Error fetching response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="knowledge-container">
      <h1 className="knowledge-title">Knowledge Base</h1>

      {/* File Upload Section */}
      <div className="upload-section">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="upload-input"
        />
        <button onClick={handleFileUpload} className="upload-button">
          {loading ? 'Uploading...' : 'Upload PDF'}
        </button>
      </div>

      {/* Query Input Section */}
      <div className="query-section">
        <input
          type="text"
          placeholder="Enter your query"
          value={query}
          onChange={handleQueryChange}
          className="query-input"
        />
        <button onClick={handleQuerySubmit} className="query-button">
          {loading ? 'Loading...' : 'Ask Question'}
        </button>
      </div>

      {/* Display Response/Error */}
      {response && <div className="response">{response}</div>}
      {error && <div className="error">{error}</div>}
      
      <style jsx>{`
        .knowledge-container {
          font-family: 'Arial', sans-serif;
          max-width: 800px;
          margin: 50px auto;
          padding: 30px;
          background-color: #f4f7fc;
          border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        .knowledge-title {
          font-size: 2.5rem;
          color: #4b4b4b;
          margin-bottom: 40px;
        }

        .upload-section {
          margin-bottom: 30px;
        }

        .upload-input {
          width: 80%;
          padding: 12px;
          margin: 0 auto;
          display: block;
          border-radius: 5px;
          border: 1px solid #ccc;
          font-size: 1rem;
          background-color: #fff;
        }

        .upload-button {
          margin-top: 15px;
          padding: 12px 20px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .upload-button:hover {
          background-color: #45a049;
        }

        .query-section {
          margin-bottom: 30px;
        }

        .query-input {
          width: 80%;
          padding: 12px;
          margin: 0 auto;
          display: block;
          border-radius: 5px;
          border: 1px solid #ccc;
          font-size: 1rem;
          background-color: #fff;
        }

        .query-button {
          margin-top: 15px;
          padding: 12px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .query-button:hover {
          background-color: #0056b3;
        }

        .response {
          margin-top: 20px;
          padding: 15px;
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
          border-radius: 5px;
          font-size: 1.1rem;
          text-align: left;
        }

        .error {
          margin-top: 20px;
          padding: 15px;
          background-color: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
          border-radius: 5px;
          font-size: 1.1rem;
          text-align: left;
        }
      `}</style>
    </div>
  );
};

export default KnowledgeComponent;
