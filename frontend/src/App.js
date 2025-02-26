import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import CallManagementDashboard from "./pages/CallManagementDashboard";
import CallQueueDashboard from "./pages/CallQueueDashboard";
import CallScheduling from "./pages/CallScheduling";
import PriorityManagement from "./pages/PriorityManagement";
import SLATracking from "./pages/SLATracking";
import ClientAnalysisDashboard from "./pages/ClientAnalysisDashboard";
import SentimentDashboard from "./pages/SentimentDashboard";
import ClientInteractionHistory from "./pages/ClientInteractionHistory";
import EscalationManagement from "./pages/EscalationManagement";
import AnalyticsOverview from "./pages/AnalyticsOverview";
import DataProcessingDashboard from "./pages/DataProcessingDashboard";
import DocumentUpload from "./pages/DocumentUpload";
import FormProcessing from "./pages/FormProcessing";
import DataValidation from "./pages/DataValidation";
import BatchProcessing from "./pages/BatchProcessing";
import KnowledgeBaseDashboard from "./pages/KnowledgeBaseDashboard";
import SearchInterface from "./pages/SearchInterface";
import ArticleView from "./pages/ArticleView";
import KnowledgeGraph from "./pages/KnowledgeGraph";
import ContentManagement from "./pages/ContentManagement";
import AdminDashboard from "./pages/AdminDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import AgentDashboard from "./pages/AgentDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ClientDashboard from "./pages/ClientDashboard";
import FeedbackAnalysis from "./pages/FeedbackAnalysis";
import AutoResponse from "./pages/AutoResponse";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/call-management" element={<CallManagementDashboard />}>
          <Route path="call-queue" element={<CallQueueDashboard />} />
          <Route path="call-scheduling" element={<CallScheduling />} />
          <Route path="priority-management" element={<PriorityManagement />} />
          <Route path="sla-tracking" element={<SLATracking />} />
        </Route>
        <Route path="/knowledge-base" element={<KnowledgeBaseDashboard />}>
          <Route path="search" element={<SearchInterface />} />
          <Route path="article-view" element={<ArticleView />} />
          <Route path="knowledge-graph" element={<KnowledgeGraph />} />
          <Route path="content-management" element={<ContentManagement />} />
        </Route>
        <Route path="/client-analysis" element={<ClientAnalysisDashboard />}>
          <Route path="sentiment-dashboard" element={<SentimentDashboard />} />
          <Route path="client-interaction-history" element={<ClientInteractionHistory />} />
          <Route path="escalation-management" element={<EscalationManagement />} />
          <Route path="analytics-overview" element={<AnalyticsOverview />} />
        </Route>
        <Route path="/data-processing" element={<DataProcessingDashboard />}>
          <Route path="document-upload" element={<DocumentUpload />} />
          {/* <Route path="form_filling" element={<FormProcessing />} /> */}
          <Route path="data-validation" element={<DataValidation />} />
          <Route path="batch-processing" element={<BatchProcessing />} />
        </Route>
        <Route path="/clientdashboard" element={<ClientDashboard />} />
        <Route path="/feedbackanalysis" element={<FeedbackAnalysis />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/:role/dashboard" element={<Dashboard />} />
        <Route path="/autoresponse" element={<AutoResponse />} />
        <Route path="/form_filling" element={<FormProcessing />} />

      </Routes>
    </Router>
  );
}

export default App;
