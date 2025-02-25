// import React, { useState } from "react";
// import Sidebar from "../components/Sidebar"; // Adjust path if needed
// import Header from "../components/Header";   // Adjust path if needed

// function AudioAnalysisDashboard() {
//   // State to hold the selected audio file and results
//   const [audioFile, setAudioFile] = useState(null);
//   const [transcription, setTranscription] = useState("");
//   const [sentiment, setSentiment] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Handle file selection
//   const handleFileChange = (e) => {
//     setAudioFile(e.target.files[0]);
//   };

//   // Handle file upload and API call
//   const analyzeAudio = async () => {
//     if (!audioFile) {
//       setError("Please select an audio file.");
//       return;
//     }

//     setError("");
//     setLoading(true);
//     setTranscription("");
//     setSentiment("");

//     const formData = new FormData();
//     formData.append("audio", audioFile);

//     try {
//       // Replace with your backend URL if necessary
//       const response = await fetch("http://127.0.0.1:5000/api/audio/analyze-audio", {
//         method: "POST",
//         body: formData,
//       });
//       const data = await response.json();

//       if (response.ok) {
//         setTranscription(data.transcription);
//         setSentiment(
//           typeof data.sentiment === "object"
//             ? `${data.sentiment.label} (${(data.sentiment.score * 100).toFixed(1)}%)`
//             : data.sentiment
//         );
//       } else {
//         setError(data.error || "An error occurred.");
//       }
//     } catch (err) {
//       console.error("Error:", err);
//       setError("Failed to analyze audio.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar Component */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex-1">
//         <Header />
//         <div className="p-6">
//           <h1 className="text-2xl font-bold mb-4">Audio Analysis Dashboard</h1>
          
//           {/* File Upload Section */}
//           <div className="bg-white p-6 rounded shadow mb-6">
//             <h2 className="text-xl font-semibold mb-4">Upload Audio for Analysis</h2>
//             <input
//               type="file"
//               accept="audio/*"
//               onChange={handleFileChange}
//               className="border p-2 w-full mb-4"
//             />
//             <button
//               onClick={analyzeAudio}
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//               disabled={loading}
//             >
//               {loading ? "Analyzing..." : "Upload & Analyze"}
//             </button>
//             {error && <p className="mt-2 text-red-500">{error}</p>}
//           </div>

//           {/* Display Results */}
//           {(transcription || sentiment) && (
//             <div className="bg-gray-100 p-6 rounded shadow">
//               <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
//               {transcription && (
//                 <div className="mb-4">
//                   <h3 className="font-semibold">Transcription:</h3>
//                   <p className="p-2 bg-white rounded shadow">{transcription}</p>
//                 </div>
//               )}
//               {sentiment && (
//                 <div>
//                   <h3 className="font-semibold">Sentiment:</h3>
//                   <p className="p-2 bg-white rounded shadow">{sentiment}</p>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AudioAnalysisDashboard;



import React, { useState, useRef } from "react";

function AudioRecorder() {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    setTranscript("");
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

      mediaRecorderRef.current.onstop = () => {
        // Combine audio chunks into a single Blob.
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        // Prepare FormData to send to the backend.
        const formData = new FormData();
        formData.append("audio", audioBlob, "recording.wav");

        // Use fetch API to send the recorded audio.
        fetch("http://127.0.0.1:5000/api/audio/analyze-audio", {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            setTranscript(data.transcription);
          })
          .catch((err) => {
            console.error("Error uploading recording:", err);
            setError("Failed to transcribe audio.");
          });
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

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Record and Transcribe Audio</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex justify-center space-x-4 mb-4">
        {!recording ? (
          <button 
            onClick={startRecording} 
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Start Recording
          </button>
        ) : (
          <button 
            onClick={stopRecording} 
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Stop Recording
          </button>
        )}
      </div>
      {transcript && (
        <div className="mt-4">
          <h3 className="font-semibold">Transcription:</h3>
          <p className="p-2 bg-gray-100 rounded">{transcript}</p>
        </div>
      )}
    </div>
  );
}

export default AudioRecorder;
