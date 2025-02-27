import React, { useState } from 'react';
import './KnowledgeComponent.css'; // Import external CSS

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
    <div className="knowledge-wrapper">
      <div className="glass-card knowledge-container">
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
      </div>
    </div>
  );
};

export default KnowledgeComponent;