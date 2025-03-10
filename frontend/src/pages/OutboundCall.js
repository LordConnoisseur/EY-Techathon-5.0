import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const OutboundCallPage = () => {
  const [loading, setLoading] = useState(false);
  const [callStatus, setCallStatus] = useState(null);
  const navigate = useNavigate();

  const handleMadeCall = async () => {
    setLoading(true);
    setCallStatus(null);

    try {
      const webhookUrl = "https://hook.us2.make.com/dqldexdvej6h6yqmnak85lhi3qpamh0f";

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // No body is required as per your requirement
      });

      if (!response.ok) {
        throw new Error("Failed to trigger call");
      }

      // Assuming the response is just "ok"
      const data = await response.text();
      if (data === "ok") {
        setCallStatus("Call made successfully!");
      } else {
        throw new Error("Unexpected response");
      }
    } catch (err) {
      setCallStatus("Calling..., You can Schedule other calls");
    } finally {
      setLoading(false);
    }
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
        {/* Header */}
        <motion.header className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-gray-900">
            <center>Schedule Anisha's Call</center>
          </h1>
        </motion.header>

        {/* Embedded Google Form */}
        <motion.div className="bg-gradient-to-r from-gray-50 to-gray-200 rounded-xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSd3LDo55rggCMao5BUdTX4hYT8u6sv0iIguqJfMR4Sqav1DJQ/viewform?embedded=true"
            width="100%"
            height="687"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            title="Schedule Call Form"
          >
            Loading…
          </iframe>
        </motion.div>

        {/* Made Call Button */}
        <motion.div className="flex justify-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            onClick={handleMadeCall}
            disabled={loading}
            className="px-8 py-3 rounded-full text-white bg-green-500 hover:bg-green-400 transition-all font-semibold shadow-md"
          >
            {loading ? "Making Call..." : "Make Call"}
          </button>
        </motion.div>

        {/* Call Status Notification */}
        {callStatus && (
          <motion.p className="text-center mt-4 text-green-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {callStatus}
          </motion.p>
        )}
      </main>

      {/* Footer */}
      <footer className="py-12 text-center bg-black text-gray-300 mt-24">
        <p>© 2025 OptiClaim by Roast and Toast</p>
      </footer>
    </div>
  );
};

export default OutboundCallPage;