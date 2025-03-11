import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Client = () => {
  const [feedback, setFeedback] = useState('');
  const [language, setLanguage] = useState('en');
  const [sentiment, setSentiment] = useState(null);
  const [translatedText, setTranslatedText] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = {
      name: e.target.name.value,
      phone: e.target.phone.value,
      policy: e.target.policy.value,
      incident: e.target.incident.value
    };
  
    try {
      const response = await fetch("http://127.0.0.1:5000/api/client/claim/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        alert("Claim submitted successfully!");
        e.target.reset(); // Clear form fields
      } else {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error submitting claim:", error);
      alert("An error occurred while submitting the claim.");
    }
  };
  

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    const userId = "user123"; // Replace with actual user ID

    try {
      const response = await fetch("http://127.0.0.1:5000/api/feedback/submit-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ feedback, language, client_id: userId }),
      });

      if (response.ok) {
        const data = await response.json();
        setSentiment(data.sentiment_score);
        setTranslatedText(data.translated_text);
        alert("Feedback submitted successfully.");
        setFeedback("");
        setError(null);
      } else {
        const data = await response.json();
        setError(`Error: ${data.message}`);

   
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setError("An error occurred while submitting your feedback. Please try again later.");
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="bg-white text-black min-h-screen font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 md:px-20 py-6 fixed w-full top-0 z-50 backdrop-blur-lg bg-white/90 shadow-lg border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900">OptiClaim</h1>
      </nav>
      <br></br>

      {/* Main Content */}
      <main className="pt-24 px-6 md:px-20">
        {/* Dashboard Header */}
        <header className="mb-12">
          <motion.h1 className="text-4xl font-bold text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <center>Client Feedback and Support</center>
          </motion.h1>
        </header>

        {/* Form Section */}
        <motion.div className="bg-gradient-to-r from-gray-50 to-gray-200 rounded-xl shadow-lg p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                <input type="text" id="name" name="name" required className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
              </div>
              <div className="form-group">
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
                <input type="tel" id="phone" name="phone" required className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
              </div>
              <div className="form-group">
                <label htmlFor="policy" className="block text-gray-700 font-medium mb-2">Policy Number</label>
                <input type="text" id="policy" name="policy" required className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
              </div>
              <div className="form-group">
                <label htmlFor="incident" className="block text-gray-700 font-medium mb-2">Incident Detail</label>
                <textarea id="incident" name="incident" rows="4" required className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"></textarea>
              </div>
            </div>
            <button type="submit" className="mt-6 px-6 py-2 rounded-full text-white bg-yellow-500 hover:bg-yellow-400 transition-all font-semibold shadow-md">Submit</button>
          </form>
        </motion.div>

        {/* Contact and Feedback Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Section */}
          <motion.div className="bg-gradient-to-r from-gray-50 to-gray-200 rounded-xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="login-section mb-6">
              <button className="w-full px-6 py-2 rounded-full text-white bg-blue-500 hover:bg-blue-400 transition-all font-semibold shadow-md" onClick={handleLoginClick}>
                Opticlaim Official Login
              </button>
            </div>
            <div className="contact-options">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Register on Call</h3>
              <p className="text-gray-700 mb-4">+19134446459</p>
              <div className="social-links flex gap-4">
                <a href="https://wa.me/+19134446459" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 transition-colors">WhatsApp</a>
                <a href="mailto:support@opticlaim.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 transition-colors">Mail</a>
              </div>
            </div>
          </motion.div>

          {/* Feedback Form Section */}
          <motion.div className="bg-gradient-to-r from-gray-50 to-gray-200 rounded-xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Feedback</h3>
            <form onSubmit={handleFeedbackSubmit}>
              <div className="form-group mb-4">
                <label htmlFor="feedback" className="block text-gray-700 font-medium mb-2">Your Feedback</label>
                <textarea
                  id="feedback"
                  name="feedback"
                  rows="4"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                ></textarea>
              </div>
              <div className="form-group mb-4">
                <label htmlFor="language" className="block text-gray-700 font-medium mb-2">Language</label>
                <select
                  id="language"
                  name="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
              <button type="submit" className="mt-4 px-6 py-2 rounded-full text-white bg-yellow-500 hover:bg-yellow-400 transition-all font-semibold shadow-md">Submit Feedback</button>
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {sentiment !== null && (
              <div className="feedback-result mt-4">
                <p><strong>Sentiment Score:</strong> {sentiment}</p>
                {translatedText && <p><strong>Translated Text:</strong> {translatedText}</p>}
              </div>
            )}
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 text-center bg-black text-gray-300 mt-24">
        <p>© 2025 OptiClaim by Roast and Toast</p>
      </footer>
    </div>
  );
};

export default Client;