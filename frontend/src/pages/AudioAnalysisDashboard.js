import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./AudioAnalysisDashboard.css"; // Import external CSS

function AudioRecorder() {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [sentiment, setSentiment] = useState(null);
  const [emotion, setEmotion] = useState([]);
  const [error, setError] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const processAudio = async (audioBlob) => {
    setError("");
    setTranscript("");
    setSentiment(null);
    setEmotion([]);

    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.wav");

    try {
      const response = await fetch("http://127.0.0.1:5000/api/audio/analyze-audio", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setTranscript(data.transcription);
      setSentiment(data.sentiment);
      setEmotion(data.emotions || []);
    } catch (err) {
      console.error("Error processing audio:", err);
      setError("Failed to process audio.");
    }
  };

  const startRecording = async () => {
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        await processAudio(audioBlob);
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setError("Could not access the microphone.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      await processAudio(file);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <nav className="navbar">
        <button onClick={() => navigate("/sentiment-dashboard")} className="nav-button">📊 Client Sentiment Tracker</button>
        <button onClick={() => navigate("/knowledge-base")} className="nav-button">📚 KnowledgeBase</button>
        <button onClick={() => navigate("/form-processing")} className="nav-button">📝 Automated Detail Extractor</button>
      </nav>
      
      <div className="dashboard-content">
        <main className="dashboard-main">
          <div className="glass-card audio-recorder">
            <h2 className="dashboard-title">🎙 Audio Analysis</h2>

            {error && <p className="error-text">{error}</p>}

            <div className="button-group">
              {!recording ? (
                <button onClick={startRecording} className="glass-card action-button">🎤 Call Recording</button>
              ) : (
                <button onClick={stopRecording} className="glass-card action-button stop-button">⏹ Stop Recording</button>
              )}

              <input type="file" accept="audio/*" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
              <button onClick={() => fileInputRef.current.click()} className="glass-card action-button">📂 Upload Audio File</button>
            </div>

            {transcript && (
              <div className="glass-card result-card">
                <h3 className="result-title">📝 Transcription:</h3>
                <p className="result-text">{transcript}</p>
              </div>
            )}

            {sentiment && (
              <div className="glass-card result-card">
                <h3 className="result-title">💡 Sentiment Analysis:</h3>
                <p className="result-text">
                  <strong>Label:</strong> {sentiment.label} <br />
                  <strong>Confidence:</strong> {(sentiment.score * 100).toFixed(2)}%
                </p>
              </div>
            )}

            {emotion.length > 0 && (
              <div className="glass-card result-card">
                <h3 className="result-title">🎭 Emotion Analysis:</h3>
                <ul className="result-text">
                  {emotion[0].map((emo, index) => (
                    <li key={index}><strong>{emo.label}:</strong> {(emo.score * 100).toFixed(2)}%</li>
                  ))}
                </ul>
              </div>
            )}
            <button onClick={() => navigate("/clientdashboard")} className="nav-button">📚 Submit Feedback</button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AudioRecorder;