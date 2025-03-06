import React, { useState, useEffect, useRef } from 'react';
import './FormProcessing.css';

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
        throw new Error('Error processing transcript');
      }
      
      const data = await response.json();
      
      setTranscriptId(data.transcript_id);
      setFormData(data.extracted_info);
      setSuccess('Transcript processed successfully!');
      setIsProcessed(true);
      
      setChatHistory([{ role: 'assistant', content: 'Hello, I am your Call Transcript Assistant! Ask me anything about the transcript.' }]);
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
        headers: { 'Content-Type': 'application/json' },
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
    setChatHistory([...chatHistory, { role: 'user', content: query }]);
    const currentQuery = query;
    setQuery('');
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/form_filling/query/${transcriptId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: currentQuery }),
      });
      if (!response.ok) {
        throw new Error('Error processing query');
      }
      const data = await response.json();
      setChatHistory(prevChat => [...prevChat, { role: 'assistant', content: data.answer }]);
    } catch (err) {
      setError(err.message || 'Error processing query.');
      setChatHistory(prevChat => [...prevChat, { role: 'assistant', content: 'Sorry, I encountered an error processing your question.' }]);
    }
  };

  return (
    <div className="form-processing-wrapper">
      <div className="glass-card form-processing">
        <h2>Call Transcript Analyzer & Q&A Bot</h2>

        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}

        <div className="file-upload-section">
          <input type="file" onChange={handleFileChange} ref={fileInputRef} hidden />
          <button onClick={() => fileInputRef.current.click()}>Browse Files</button>
          <span>{file ? file.name : 'No file chosen'}</span>
          <button onClick={handleFileUpload} disabled={!file || loading}>{loading ? 'Processing...' : 'Process Transcript'}</button>
        </div>

        {isProcessed && (
          <div className="form-section">
            <h3>Auto-Filled BPO Form</h3>
            <form onSubmit={handleFormSubmit}>
              {Object.keys(formData).map(key => (
                <div className="form-group" key={key}>
                  <label>{key.replace('_', ' ')}</label>
                  <input type="text" name={key} value={formData[key]} onChange={handleFormChange} />
                </div>
              ))}
              <button type="submit">{loading ? 'Updating...' : 'Update Form'}</button>
            </form>
          </div>
        )}

        {isProcessed && (
          <div className="chat-section">
            <h3>Chat with Transcript Assistant</h3>
            <div className="chat-container" ref={chatContainerRef}>
              {chatHistory.map((msg, index) => (
                <p key={index} className={msg.role}>{msg.content}</p>
              ))}
            </div>
            <form onSubmit={handleQuerySubmit}>
              <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ask about the transcript..." />
              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormProcessing;
