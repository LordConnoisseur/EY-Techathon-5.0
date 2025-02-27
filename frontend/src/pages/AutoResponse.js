import React, { useState } from "react";
import "./AutoResponse.css"; // Import external CSS

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
    <div className="auto-response-wrapper">
      <div className="glass-card auto-response-container">
        <h2 className="auto-response-title">AI-Powered Auto Response</h2>
        
        <textarea
          className="auto-response-textarea"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        <button
          className="auto-response-button"
          onClick={fetchSuggestion}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Response"}
        </button>

        {suggestion && (
          <div className="auto-response-suggestion">
            <h3 className="suggestion-title">Suggested Response:</h3>
            <p className="suggestion-text">{suggestion}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AutoResponse;