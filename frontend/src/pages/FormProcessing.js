import React, { useState, useEffect, useRef } from 'react';
import './FormProcessing.css'; // Import external CSS

const FormProcessing = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [transcriptId, setTranscriptId] = useState('');
  const [formData, setFormData] = useState({
    name: 'Unknown',
    age: 'Unknown',
    sentiment: 'Unknown',
    issue_summary: 'Unknown',
    call_duration: 'Unknown',
    agent_name: 'Unknown'
  });
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isProcessed, setIsProcessed] = useState(false);

  const fileInputRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      setError('Please select a file first.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/form_filling/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error processing transcript');
      }
      
      const data = await response.json();
      
      setTranscriptId(data.transcript_id);
      setFormData(data.extracted_info);
      setSuccess('Transcript processed successfully!');
      setIsProcessed(true);
      
      // Add a welcome message to the chat
      setChatHistory([{
        role: 'assistant',
        content: 'Hello, I am Forms, your Call Transcript Assistant! Ask me anything about the transcript.'
      }]);
    } catch (err) {
      setError(err.message || 'Error processing transcript.');
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!transcriptId) return;
    
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/form_filling/form/${transcriptId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Error updating form');
      }
      
      setSuccess('Form updated successfully!');
    } catch (err) {
      setError(err.message || 'Error updating form.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    
    if (!query.trim() || !transcriptId) return;
    
    // Add user message to chat
    const userMessage = {
      role: 'user',
      content: query
    };
    setChatHistory([...chatHistory, userMessage]);
    
    // Clear input
    const currentQuery = query;
    setQuery('');
    
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/form_filling/query/${transcriptId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: currentQuery }),
      });
      
      if (!response.ok) {
        throw new Error('Error processing query');
      }
      
      const data = await response.json();
      
      // Add assistant response to chat
      setChatHistory(prevChat => [...prevChat, {
        role: 'assistant',
        content: data.answer
      }]);
    } catch (err) {
      setError(err.message || 'Error processing query.');
      setChatHistory(prevChat => [...prevChat, {
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your question.'
      }]);
    }
  };

  return (
    <div className="form-processing-wrapper">
      <div className="glass-card form-processing">
        <h2 className="dashboard-title">Call Transcript Analyzer & Q&A Bot</h2>

        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}

        <div className="file-upload-section">
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.txt"
            ref={fileInputRef}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="glass-card action-button"
          >
            Browse Files
          </button>
          <span className="file-name">{file ? file.name : 'No file chosen'}</span>
          <button
            onClick={handleFileUpload}
            disabled={!file || loading}
            className="glass-card action-button"
          >
            {loading ? 'Processing...' : 'Process Transcript'}
          </button>
        </div>

        {isProcessed && (
          <div className="form-section">
            <h3 className="section-title">Auto-Filled BPO Form</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label>Customer Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                />
              </div>
              <div className="form-group">
                <label>Customer Age</label>
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleFormChange}
                />
              </div>
              <button type="submit" className="glass-card action-button">
                {loading ? 'Updating...' : 'Update Form'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormProcessing;
