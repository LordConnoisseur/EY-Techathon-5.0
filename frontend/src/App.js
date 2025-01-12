import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import CallManagement from "./pages/CallManagement";
import KnowledgeBase from "./pages/KnowledgeBase";
import ClientAnalysis from "./pages/ClientAnalysis";
import DataProcessing from "./pages/DataProcessing";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/call-management" element={<CallManagement />} />
        <Route path="/knowledge-base" element={<KnowledgeBase />} />
        <Route path="/client-analysis" element={<ClientAnalysis />} />
        <Route path="/data-processing" element={<DataProcessing />} />
      </Routes>
    </Router>
  );
}

export default App;
