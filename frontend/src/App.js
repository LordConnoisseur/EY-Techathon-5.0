import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
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
import AudioAnalysisDashboard from "./pages/AudioAnalysisDashboard";

import { isAuthenticated, getRoles } from "./authService";

function ProtectedRoute({ element, allowedRoles }) {
    const isAuth = isAuthenticated();
    const userRoles = getRoles();

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.some(role => userRoles.includes(role))) {
        return <Navigate to="/" replace />;
    }

    return element;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route to Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Role-based Dashboards */}
        <Route path="/admin/dashboard" element={<ProtectedRoute element={<AdminDashboard />} allowedRoles={['admin']} />} />
        <Route path="/manager/dashboard" element={<ProtectedRoute element={<ManagerDashboard />} allowedRoles={['manager']} />} />
        <Route path="/agent/dashboard" element={<ProtectedRoute element={<AgentDashboard />} allowedRoles={['agent']} />} />

        {/* Other Routes with Protection */}
        <Route path="/call-management" element={<ProtectedRoute element={<CallManagementDashboard />} allowedRoles={['agent', 'manager']} />}/>
        <Route path="/call-queue" element={<CallQueueDashboard />} />
        <Route path="/call-scheduling" element={<CallScheduling />} />
        <Route path="/priority-management" element={<PriorityManagement />} />
        <Route path="/sla-tracking" element={<SLATracking />} />

        <Route path="/knowledge-base" element={<ProtectedRoute element={<KnowledgeBaseDashboard />} />}/>
        <Route path="/search" element={<SearchInterface />} />
        <Route path="/article-view" element={<ArticleView />} />
        <Route path="/knowledge-graph" element={<KnowledgeGraph />} />
        <Route path="/content-management" element={<ContentManagement />} />


        <Route path="/client-analysis" element={<ProtectedRoute element={<ClientAnalysisDashboard />} allowedRoles={['manager', 'admin','agent']} />}/>
        <Route path="/sentiment-dashboard" element={<SentimentDashboard />} />
        <Route path="/client-interaction-history" element={<ClientInteractionHistory />} />
        <Route path="/escalation-management" element={<EscalationManagement />} />
        <Route path="/analytics-overview" element={<AnalyticsOverview />} />


        <Route path="/data-processing" element={<ProtectedRoute element={<DataProcessingDashboard />} allowedRoles={['admin', 'manager','agent']} />}/>
        <Route path="/document-upload" element={<DocumentUpload />} />
        <Route path="/data-validation" element={<DataValidation />} />
        <Route path="/batch-processing" element={<BatchProcessing />} />

        <Route path="/clientdashboard" element={<ProtectedRoute element={<ClientDashboard />} allowedRoles={['agent']} />} />
        <Route path="/feedbackanalysis" element={<ProtectedRoute element={<FeedbackAnalysis />} allowedRoles={['agent','manager', 'admin']} />} />
        <Route path="/autoresponse" element={<ProtectedRoute element={<AutoResponse />} allowedRoles={['agent']} />} />
        <Route path="/form_filling" element={<ProtectedRoute element={<FormProcessing />} allowedRoles={['agent']} />} />
        <Route path="/audio-analysis" element={<ProtectedRoute element={<AudioAnalysisDashboard />} allowedRoles={['agent','manager']} />} />
      </Routes>
    </Router>
  );
}

export default App;
