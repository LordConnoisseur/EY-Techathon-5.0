import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CallTracker = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleScheduleCall = () => {
    navigate("/outbound"); // Navigate to the schedule call page
  };

  return (
    <div className="bg-white text-black min-h-screen font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 md:px-20 py-6 fixed w-full top-0 z-50 backdrop-blur-lg bg-white/90 shadow-lg border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900">OptiClaim</h1>
        <div className="hidden md:flex gap-10 items-center text-gray-800 text-lg">
          <button onClick={() => navigate("/anisha")} className="hover:text-yellow-500 transition-colors">Anisha</button>
          <button onClick={() => navigate("/knowledge-base")} className="hover:text-yellow-500 transition-colors">Smart Search</button>
          <button onClick={() => navigate("/agenttraining")} className="hover:text-yellow-500 transition-colors">AI Agent Trainer</button>
          <button onClick={() => navigate("/feedbackanalysis")} className="hover:text-yellow-500 transition-colors">Claim Analyzer</button>
          <button className="px-8 py-3 rounded-full text-white bg-red-500 hover:bg-yellow-400 transition-all font-semibold shadow-lg">Logout</button>
        </div>
      </nav>
      <br></br>

      {/* Main Content */}
      <main className="pt-24 px-6 md:px-20">
        {/* Header Section */}
        <motion.header className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center">
            <button
              onClick={handleBack}
              className="px-6 py-2 rounded-full text-white bg-gray-500 hover:bg-gray-400 transition-all font-semibold shadow-md"
            >
              &larr; Back
            </button>
            <h1 className="text-4xl font-bold text-gray-900">Anisha - Call Tracker</h1>
            <button
              onClick={handleScheduleCall}
              className="px-6 py-2 rounded-full text-white bg-green-500 hover:bg-green-400 transition-all font-semibold shadow-md"
            >
              📞 Schedule Call
            </button>
          </div>
        </motion.header>

        {/* Google Sheets Embed */}
        <motion.div className="bg-gradient-to-r from-gray-50 to-gray-200 rounded-xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="sheet-embed h-[600px]">
            <iframe
              src="https://docs.google.com/spreadsheets/d/1nOI7rz_hD3sRA8to4DD7z5ie1UZRAuMRZIzmn1u_e2E/edit?usp=sharing"
              width="100%"
              height="100%"
              frameBorder="0"
              title="Call Tracker Sheet"
            ></iframe>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-12 text-center bg-black text-gray-300 mt-24">
        <p>© 2025 OptiClaim by Roast and Toast</p>
      </footer>
    </div>
  );
};

export default CallTracker;