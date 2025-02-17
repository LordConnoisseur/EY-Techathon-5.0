import React, { useState } from "react";

function ArticleView() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAsk = async () => {
    if (!question) return;
    
    try {
      const response = await fetch("http://127.0.0.1:5000/api/knowledge/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      console.error("Error fetching answer:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Smart Knowledge Base</h2>
      <input
        type="text"
        className="border p-2 w-full mb-2"
        placeholder="Ask a question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button className="bg-blue-500 text-white p-2" onClick={handleAsk}>Ask</button>
      {answer && <p className="mt-4 p-4 bg-gray-200">{answer}</p>}
    </div>
  );
}

export default ArticleView;
