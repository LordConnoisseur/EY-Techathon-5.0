import React, { useState, useRef } from "react";
import Sidebar from "../components/Sidebar"; // Adjust path as necessary
import Header from "../components/Header"; // Adjust path as necessary

function AudioRecorder() {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [sentiment, setSentiment] = useState(null);
  const [emotion, setEmotion] = useState([]);
  const [error, setError] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const fileInputRef = useRef(null);

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
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Header />
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#F4F4F4] to-[#EAEAEA] p-4">
          <div className="w-full bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-[#333333] text-center mb-6">
              🎙️ Audio Analysis
            </h2>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {!recording ? (
                <button
                  onClick={startRecording}
                  className="bg-[#FFC72C] hover:bg-[#E5B700] text-black font-semibold py-2 px-4 rounded-xl transition duration-300 shadow-md w-full sm:w-auto"
                >
                  🎤 Call Recording
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-xl transition duration-300 shadow-md w-full sm:w-auto"
                >
                  ⏹️ Stop Recording
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
                className="bg-[#333333] hover:bg-[#1A1A1A] text-white font-semibold py-2 px-4 rounded-xl transition duration-300 shadow-md w-full sm:w-auto"
              >
                📂 Upload Audio File
              </button>
            </div>

            {transcript && (
              <div className="mt-6 p-4 bg-[#F4F4F4] rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-[#333333] flex items-center">
                  📝 Transcription:
                </h3>
                <p className="text-[#666666] mt-2">{transcript}</p>
              </div>
            )}

            {sentiment && (
              <div className="mt-4 p-4 bg-[#F4F4F4] rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-[#333333] flex items-center">
                  💡 Sentiment Analysis:
                </h3>
                <p className="text-[#666666]">
                  <strong>Label:</strong> {sentiment.label} <br />
                  <strong>Confidence:</strong> {(sentiment.score * 100).toFixed(2)}%
                </p>
              </div>
            )}

            {emotion.length > 0 && (
              <div className="mt-4 p-4 bg-[#F4F4F4] rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-[#333333] flex items-center">
                  🎭 Emotion Analysis:
                </h3>
                <ul className="text-[#666666] list-disc pl-4">
                  {emotion[0].map((emo, index) => (
                    <li key={index}>
                      <strong>{emo.label}:</strong> {(emo.score * 100).toFixed(2)}%
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AudioRecorder;
