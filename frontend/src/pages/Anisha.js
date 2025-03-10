import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Anisha.css';

const Anisha = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="bg-white text-black min-h-screen font-sans">
      {/* Default Navbar */}
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
        {/* Floating Sidebar */}
        <br></br>
        <motion.div
          className="floating-sidebar bg-gradient-to-r from-gray-50 to-gray-200 rounded-xl shadow-lg p-6 fixed left-6 top-24 z-40"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex flex-col gap-4">
            <button
              className="sidebar-button px-6 py-3 rounded-full text-white bg-blue-500 hover:bg-blue-400 transition-all font-semibold shadow-md"
              onClick={() => handleNavigation('/ai-call-tracker')}
            >
              Call Tracking
            </button>
            <button
              className="sidebar-button px-6 py-3 rounded-full text-white bg-green-500 hover:bg-green-400 transition-all font-semibold shadow-md"
              onClick={() => handleNavigation('/ai-email-tracking')}
            >
              Email Tracking
            </button>
            <button
              className="sidebar-button px-6 py-3 rounded-full text-white bg-purple-500 hover:bg-purple-400 transition-all font-semibold shadow-md"
              onClick={() => handleNavigation('/ai-whatsapp-tracking')}
            >
              WhatsApp Tracking
            </button>
            <button
              className="sidebar-button px-6 py-3 rounded-full text-white bg-yellow-500 hover:bg-yellow-400 transition-all font-semibold shadow-md"
              onClick={() => handleNavigation('/outbound')}
            >
              Schedule Call
            </button>
          </div>
        </motion.div>

        {/* Dashboard Embed */}
        <motion.div
          className="dashboard-embed bg-gradient-to-r from-gray-50 to-gray-200 rounded-xl shadow-lg p-6 ml-32"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <iframe
            width="100%"
            height="600px"
            src="https://lookerstudio.google.com/embed/reporting/bd74bf8a-992e-4487-bcc0-bf362145bd44/page/xoZ8E"
            frameBorder="0"
            style={{ border: 'none' }}
            allowFullScreen
            sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
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

export default Anisha;