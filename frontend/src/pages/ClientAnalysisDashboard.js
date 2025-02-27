import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./ClientAnalysisDashboard.css"; // Import external CSS

function ClientAnalysisDashboard() {
  return (
    <div className="dashboard-wrapper">
      {/* Header with Dashboard Title */}
      <header className="dashboard-header">
        <h1 className="dashboard-title">Client Analysis Dashboard</h1>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Navigation links */}
        <div className="navigation-grid">
          <Link
            to="/sentiment-dashboard"
            className="glass-card navigation-link"
          >
            <h2 className="navigation-title">Sentiment Dashboard</h2>
            <p>View sentiment analysis of client interactions.</p>
          </Link>
          <Link
            to="/client-interaction-history"
            className="glass-card navigation-link"
          >
            <h2 className="navigation-title">Client Interaction History</h2>
            <p>Explore past client interactions and statuses.</p>
          </Link>
          <Link
            to="/escalation-management"
            className="glass-card navigation-link"
          >
            <h2 className="navigation-title">Escalation Management</h2>
            <p>Manage escalated calls and interactions.</p>
          </Link>
          <Link
            to="/analytics-overview"
            className="glass-card navigation-link"
          >
            <h2 className="navigation-title">Analytics Overview</h2>
            <p>View overall client interaction analytics.</p>
          </Link>
        </div>

        {/* Subpage content -- to be commented
        <div className="glass-card subpage-content">
          <Outlet />
        </div> */}
      </main>

      {/* Floating Navigation Bar */}
      <nav className="floating-nav">
        <Link to="/call-management" className="nav-link">
          Call Management
        </Link>
        <Link to="/knowledge-base" className="nav-link">
          Knowledge Base
        </Link>
        <Link to="/client-analysis" className="nav-link">
          Client Analysis
        </Link>
        <Link to="/data-processing" className="nav-link">
          Data Processing
        </Link>
      </nav>
    </div>
  );
}

export default ClientAnalysisDashboard;