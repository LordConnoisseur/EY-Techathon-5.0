import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './AiWATracker.css';

const AIWhatsAppTracker = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
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
        <header className="header mb-12">
          <motion.h4 className="text-4xl font-bold text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <center>Anisha WhatsApp Tracker</center>
          </motion.h4>
          <button className="back-button" onClick={handleBack}>
            Back
          </button>
        </header>

        {/* Google Sheets Embed */}
        <motion.div className="sheet-embed bg-gradient-to-r from-gray-50 to-gray-200 rounded-xl shadow-lg p-6 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <iframe
            src="https://docs.google.com/spreadsheets/d/1w9cXlJKRWeii-HCrKC7PNtbea6Owa4OfxdNEgBSkULI/edit?usp=sharing"
            width="100%"
            height="600px"
            style={{ border: 'none' }}
            title="WhatsApp Tracker Sheet"
          ></iframe>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-12 text-center bg-black text-gray-300 mt-24">
        <p>© 2025 OptiClaim by Roast and Toast</p>
      </footer>
    </div>
  );
};

export default AIWhatsAppTracker;