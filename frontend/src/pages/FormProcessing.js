import React, { useState, useEffect, useRef } from 'react';

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

  // Inline styles
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    },
    header: {
      color: '#2c3e50',
      textAlign: 'center',
      marginBottom: '30px',
    },
    sectionHeader: {
      color: '#34495e',
      marginBottom: '20px',
      borderBottom: '2px solid #eee',
      paddingBottom: '10px',
    },
    mainContent: {
      display: 'grid',
      gridTemplateColumns: window.innerWidth > 992 ? '1fr 1fr' : '1fr',
      gap: '30px',
    },
    section: {
      backgroundColor: '#f8f9fa',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
    },
    fileUpload: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
    },
    browseButton: {
      backgroundColor: '#6c757d',
      color: 'white',
      border: 'none',
      padding: '10px 15px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'background-color 0.3s',
    },
    fileName: {
      marginLeft: '10px',
      color: '#6c757d',
      fontSize: '14px',
    },
    actionButton: {
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      padding: '12px 20px',
      borderRadius: '4px',
      cursor: 'pointer',
      width: '100%',
      fontSize: '16px',
      transition: 'background-color 0.3s',
    },
    disabledButton: {
      backgroundColor: '#95a5a6',
      cursor: 'not-allowed',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: '600',
      color: '#34495e',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',
    },
    textarea: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',
      resize: 'vertical',
      minHeight: '80px',
    },
    submitButton: {
      backgroundColor: '#2ecc71',
      color: 'white',
      border: 'none',
      padding: '12px 20px',
      borderRadius: '4px',
      cursor: 'pointer',
      width: '100%',
      fontSize: '16px',
      marginTop: '10px',
      transition: 'background-color 0.3s',
    },
    chatContainer: {
      height: '400px',
      overflowY: 'auto',
      border: '1px solid #ddd',
      borderRadius: '4px',
      marginBottom: '20px',
      padding: '15px',
      backgroundColor: 'white',
    },
    chatMessage: {
      marginBottom: '15px',
      padding: '10px 15px',
      borderRadius: '18px',
      maxWidth: '80%',
      wordWrap: 'break-word',
    },
    userMessage: {
      backgroundColor: '#3498db',
      color: 'white',
      marginLeft: 'auto',
      borderBottomRightRadius: '4px',
    },
    assistantMessage: {
      backgroundColor: '#f1f1f1',
      color: '#333',
      marginRight: 'auto',
      borderBottomLeftRadius: '4px',
    },
    queryForm: {
      display: 'flex',
      gap: '10px',
    },
    errorMessage: {
      backgroundColor: '#f8d7da',
      color: '#721c24',
      padding: '10px',
      borderRadius: '4px',
      marginTop: '15px',
    },
    successMessage: {
      backgroundColor: '#d4edda',
      color: '#155724',
      padding: '10px',
      borderRadius: '4px',
      marginTop: '15px',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Call Transcript Analyzer & Q&A Bot</h1>
      
      <div style={styles.mainContent}>
        <div style={styles.section}>
          <h2 style={styles.sectionHeader}>Upload Transcript</h2>
          <div style={styles.fileUpload}>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.txt"
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <button 
              onClick={() => fileInputRef.current.click()}
              style={styles.browseButton}
            >
              Browse Files
            </button>
            <span style={styles.fileName}>{file ? file.name : 'No file chosen'}</span>
          </div>
          
          <button 
            onClick={handleFileUpload} 
            disabled={!file || loading}
            style={{
              ...styles.actionButton,
              ...((!file || loading) ? styles.disabledButton : {})
            }}
          >
            {loading ? 'Processing...' : 'Process Transcript'}
          </button>
          
          {error && <div style={styles.errorMessage}>{error}</div>}
          {success && <div style={styles.successMessage}>{success}</div>}
        </div>
        
        {isProcessed && (
          <div style={styles.section}>
            <h2 style={styles.sectionHeader}>Auto-Filled BPO Form</h2>
            <form onSubmit={handleFormSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Customer Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  style={styles.input}
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Customer Age</label>
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleFormChange}
                  style={styles.input}
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Sentiment</label>
                <select 
                  name="sentiment" 
                  value={formData.sentiment}
                  onChange={handleFormChange}
                  style={styles.input}
                >
                  <option value="Unknown">Unknown</option>
                  <option value="Positive">Positive</option>
                  <option value="Negative">Negative</option>
                  <option value="Neutral">Neutral</option>
                </select>
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Issue Summary</label>
                <textarea
                  name="issue_summary"
                  value={formData.issue_summary}
                  onChange={handleFormChange}
                  style={styles.textarea}
                  rows="3"
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Call Duration (minutes)</label>
                <input
                  type="text"
                  name="call_duration"
                  value={formData.call_duration}
                  onChange={handleFormChange}
                  style={styles.input}
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Agent Name</label>
                <input
                  type="text"
                  name="agent_name"
                  value={formData.agent_name}
                  onChange={handleFormChange}
                  style={styles.input}
                />
              </div>
              
              <button 
                type="submit" 
                style={{
                  ...styles.submitButton,
                  ...(loading ? styles.disabledButton : {})
                }} 
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Form'}
              </button>
            </form>
          </div>
        )}
        
        {isProcessed && (
          <div style={{...styles.section, gridColumn: window.innerWidth > 992 ? '1 / 3' : 'auto'}}>
            <h2 style={styles.sectionHeader}>Ask Questions About the Transcript</h2>
            
            <div style={styles.chatContainer} ref={chatContainerRef}>
              {chatHistory.map((message, index) => (
                <div 
                  key={index} 
                  style={{
                    ...styles.chatMessage,
                    ...(message.role === 'user' ? styles.userMessage : styles.assistantMessage)
                  }}
                >
                  <div>{message.content}</div>
                </div>
              ))}
            </div>
            
            <form onSubmit={handleQuerySubmit} style={styles.queryForm}>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about the transcript..."
                style={styles.input}
                disabled={!isProcessed}
              />
              <button 
                type="submit" 
                style={{
                  ...styles.actionButton, 
                  width: 'auto',
                  ...((!isProcessed || !query.trim()) ? styles.disabledButton : {})
                }} 
                disabled={!isProcessed || !query.trim()}
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormProcessing;