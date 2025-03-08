import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const KnowledgeBaseDashboard = () => {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleFileUpload = async () => {
    if (!file) {
      setError("Please upload a PDF file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setError("");
    setResponse("");

    try {
      const res = await fetch("http://127.0.0.1:5000/api/knowledge/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setResponse(data.message);
      } else {
        setError(data.error || "An error occurred while uploading the file.");
      }
    } catch (error) {
      setError("Error uploading file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuerySubmit = async () => {
    if (!query) {
      setError("Please enter a query.");
      return;
    }

    setLoading(true);
    setError("");
    setResponse("");

    try {
      const res = await fetch("http://127.0.0.1:5000/api/knowledge/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponse(data.answer);
      } else {
        setError(data.error || "An error occurred while processing the query.");
      }
    } catch (error) {
      setError("Error fetching response. Please try again.");
    } finally {
      setLoading(false);
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
      <main className="flex-1 flex items-center justify-center pt-24 pb-16 px-6 md:px-20">
        <motion.div
          className="bg-gradient-to-r from-gray-100 to-gray-300 rounded-xl shadow-2xl p-8 w-full max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Smart SearchInterface</h1>

          {/* File Upload Section */}
          <div className="mb-8">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer px-6 py-3 rounded-full text-white bg-blue-500 hover:bg-blue-400 transition-all font-semibold shadow-md"
            >
              {file ? file.name : "Upload PDF"}
            </label>
            <button
              onClick={handleFileUpload}
              className="ml-4 px-6 py-3 rounded-full text-white bg-green-500 hover:bg-green-400 transition-all font-semibold shadow-md"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Save"}
            </button>
          </div>

          {/* Query Input Section */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Enter your query"
              value={query}
              onChange={handleQueryChange}
              className="w-full md:w-1/2 px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              onClick={handleQuerySubmit}
              className="ml-4 px-6 py-3 rounded-full text-white bg-yellow-500 hover:bg-yellow-400 transition-all font-semibold shadow-md"
              disabled={loading}
            >
              {loading ? "Loading..." : "Ask Question"}
            </button>
          </div>

          {/* Display Response/Error */}
          {response && (
            <div className="mt-8 p-6 rounded-xl bg-white shadow-md">
              <p className="text-gray-800">{response}</p>
            </div>
          )}
          {error && (
            <div className="mt-8 p-6 rounded-xl bg-red-50 shadow-md">
              <p className="text-red-600">{error}</p>
            </div>
          )}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-12 text-center bg-black text-gray-300">
        <p>© 2025 OptiClaim by Roast and Toast</p>
      </footer>
    </div>
  );
};

export default KnowledgeBaseDashboard;