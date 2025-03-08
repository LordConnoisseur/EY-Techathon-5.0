import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
    <div className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 min-h-screen font-sans flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 md:px-20 py-6 fixed w-full top-0 z-50 backdrop-blur-lg bg-white/90 shadow-lg border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900">OptiClaim</h1>
        <div className="hidden md:flex gap-10 items-center text-gray-800 text-lg">
          <button onClick={() => navigate("/knowledge-base")} className="hover:text-yellow-500 transition-colors">Knowledge Base</button>
          <button onClick={() => navigate("/agenttraining")} className="hover:text-yellow-500 transition-colors">AI Agent Trainer</button>
          <button onClick={() => navigate("/feedbackanalysis")} className="hover:text-yellow-500 transition-colors">Claim Analyzer</button>
          <button className="px-8 py-3 rounded-full text-white bg-red-500 hover:bg-red-400 transition-all font-semibold shadow-lg">Logout</button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center pt-24 pb-16 px-6 md:px-20">
        {/* 3 Buttons Group */}
        <div className="flex flex-wrap justify-center gap-4 mb-8 w-full max-w-4xl">
          <button
            onClick={() => navigate("/sentiment-dashboard")}
            className="px-6 py-3 rounded-full text-white bg-blue-600 hover:bg-blue-500 transition-all font-semibold shadow-md"
          >
            📊 Client Sentiment Tracker
          </button>
          <button
            onClick={() => navigate("/knowledge-base")}
            className="px-6 py-3 rounded-full text-white bg-green-600 hover:bg-green-500 transition-all font-semibold shadow-md"
          >
            📚 Knowledge Base
          </button>
          <button
            onClick={() => navigate("/form-processing")}
            className="px-6 py-3 rounded-full text-white bg-purple-600 hover:bg-purple-500 transition-all font-semibold shadow-md"
          >
            📝 Automated Detail Extractor
          </button>
        </div>

        {/* Audio Analysis Card */}
        <motion.div
          className="bg-gradient-to-r from-gray-100 to-gray-300 rounded-xl shadow-2xl p-8 w-full max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-8">🎙 Audio Analysis</h2>

          {error && <p className="text-red-600 mb-4">{error}</p>}

          {/* Button Group */}
          <center>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {!recording ? (
            
              <button
                onClick={startRecording}
                className="px-6 py-3 rounded-full text-white bg-blue-600 hover:bg-blue-500 transition-all font-semibold shadow-md"
              >
                🎤 Start Recording
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="px-6 py-3 rounded-full text-white bg-red-600 hover:bg-red-500 transition-all font-semibold shadow-md"
              >
                ⏹ Stop Recording
              </button>
            
            )}
            

            <input
              type="file"
              accept="audio/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileUpload}
            />
            <button
              onClick={() => fileInputRef.current.click()}
              className="px-6 py-3 rounded-full text-white bg-green-600 hover:bg-green-500 transition-all font-semibold shadow-md"
            >
              📂 Upload Audio File
            </button>
          </div>
          </center>

          {/* Transcription */}
          {transcript && (
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">📝 Transcription:</h3>
              <p className="text-gray-800">{transcript}</p>
            </motion.div>
          )}

          {/* Sentiment Analysis */}
          {sentiment && (
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">💡 Sentiment Analysis:</h3>
              <p className="text-gray-800">
                <strong>Label:</strong> {sentiment.label} <br />
                <strong>Confidence:</strong> {(sentiment.score * 100).toFixed(2)}%
              </p>
            </motion.div>
          )}

          {/* Emotion Analysis */}
          {emotion.length > 0 && (
            
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">🎭 Emotion Analysis:</h3>
              <ul className="text-gray-800">
                {emotion[0].map((emo, index) => (
                  <li key={index}>
                    <strong>{emo.label}:</strong> {(emo.score * 100).toFixed(2)}%
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Submit Feedback Button */}
         
        </motion.div>
        <br></br>
        <br></br>
        <center>
          <button
            onClick={() => navigate("/clientdashboard")}
            className="px-6 py-3 rounded-full text-white bg-purple-600 hover:bg-purple-500 transition-all font-semibold shadow-md"
          >
            📚 Submit Feedback
          </button>
          </center>
      </main>

      {/* Footer */}
      <footer className="py-12 text-center bg-black text-gray-300">
        <p>© 2025 OptiClaim by Roast and Toast</p>
      </footer>
    </div>
  );
}

export default AudioRecorder;