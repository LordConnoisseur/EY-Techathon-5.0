import React, { useState } from "react";

function AutoResponse() {
  const [message, setMessage] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchSuggestion = async () => {
    if (!message.trim()) return; // Prevent empty requests

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/api/auto_response/generate-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      console.log("API Response:", data); // Debugging

      if (data.generated_response) {
        setSuggestion(data.generated_response); // Store response correctly
      } else {
        setSuggestion("No response generated.");
      }
    } catch (error) {
      console.error("Error fetching suggestion:", error);
      setSuggestion("Error generating response.");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 to-indigo-500">
      <div className="p-6 bg-white rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-center">AI-Powered Auto Response</h2>
        
        <textarea
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300 outline-none"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        <button
          className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          onClick={fetchSuggestion}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Response"}
        </button>

        {suggestion && (
          <div className="mt-4 bg-gray-100 p-3 rounded-lg">
            <h3 className="text-md font-semibold text-gray-700">Suggested Response:</h3>
            <p className="text-gray-800 mt-2">{suggestion}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AutoResponse;
