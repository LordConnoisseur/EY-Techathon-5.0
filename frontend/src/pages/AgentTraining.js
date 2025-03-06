import React, { useState } from "react";
import "./AgentTraining.css";

const customerTypes = [
  { value: "angry", label: "😡 Angry Customer" },
  { value: "disappointed", label: "😞 Disappointed Customer" },
  { value: "happy", label: "😊 Happy Customer" },
  { value: "confused", label: "🤔 Confused Customer" },
];

const issueTypes = [
  { value: "claim_rejected", label: "Claim Rejected" },
  { value: "claim_delayed", label: "Claim Delayed" },
  { value: "missing_documents", label: "Missing Documents" },
  { value: "successful_claim", label: "Successful Claim" },
  { value: "claim_partially_approved", label: "Claim Partially Approved" },
  { value: "claim_escalation", label: "Claim Escalation" },
  { value: "incorrect_payout", label: "Incorrect Payout" },
  { value: "claim_cancellation", label: "Claim Cancellation" },
  { value: "policy_coverage_issue", label: "Policy Coverage Issue" },
  { value: "technical_error", label: "Technical Error" },
];

const AgentTraining = () => {
  const [selectedCustomerType, setSelectedCustomerType] = useState("");
  const [selectedIssueType, setSelectedIssueType] = useState("");
  const [conversation, setConversation] = useState([]);
  const [agentMessage, setAgentMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showTyping, setShowTyping] = useState(false);
  const [agentScore, setAgentScore] = useState("");
  const [totalScore, setTotalScore] = useState(0);
  const [milestoneMessage, setMilestoneMessage] = useState("");

  // Milestones
  const milestones = [100, 300, 500, 1000];

  // Update progress and check for milestones
  const updateProgress = (score) => {
    const newTotalScore = totalScore + score;
    setTotalScore(newTotalScore);

    // Check for milestones
    for (const milestone of milestones) {
      if (newTotalScore >= milestone && !milestoneMessage.includes(milestone.toString())) {
        setMilestoneMessage(`Congratulations! You reached a milestone of ${milestone} points.`);
        break; // Stop after the first milestone reached
      }
    }
  };

  const sendMessage = async () => {
    if (!selectedCustomerType || !selectedIssueType || !agentMessage.trim()) {
      setError("Please select a customer type, issue type, and enter a message.");
      return;
    }

    const newConversation = [...conversation, { sender: "Agent", text: agentMessage }];
    setConversation(newConversation);
    setAgentMessage("");
    setLoading(true);
    setError("");
    setShowTyping(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/agent_training/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_type: selectedCustomerType,
          issue_type: selectedIssueType,
          message: agentMessage,
          history: newConversation,
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch AI response.");

      const data = await response.json();
      if (data.response) {
        setTimeout(() => {
          setConversation([...newConversation, { sender: "Customer", text: data.response }]);
          setAgentScore(data.rating);
          setShowTyping(false);

          // Update progress with the score
          const score = parseInt(data.rating.split(" ")[0]); // Extract score from rating
          if (!isNaN(score)) {
            updateProgress(score);
          }
        }, 1000);
      }
    } catch (error) {
      setError(error.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="agent-training-container">
      <h2 className="training-title">🎓 AI Agent Training</h2>
      <div className="scenario-selection">
        <select
          className="scenario-dropdown"
          value={selectedCustomerType}
          onChange={(e) => setSelectedCustomerType(e.target.value)}
        >
          <option value="">Select Customer Type...</option>
          {customerTypes.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <select
          className="scenario-dropdown"
          value={selectedIssueType}
          onChange={(e) => setSelectedIssueType(e.target.value)}
        >
          <option value="">Select Issue Type...</option>
          {issueTypes.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
      <div className="conversation-box">
        {conversation.map((msg, i) => (
          <div key={i} className={`message-bubble ${msg.sender.toLowerCase()}-msg`}>
            {msg.sender}: {msg.text}
          </div>
        ))}
        {showTyping && <div className="message-bubble customer-msg">Customer is typing...</div>}
      </div>
      <div className="message-input">
        <input
          className="input-field"
          type="text"
          value={agentMessage}
          onChange={(e) => setAgentMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="send-button" onClick={sendMessage} disabled={loading}>
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
      {agentScore && (
        <>
          <p className="performance-score">Performance Score: {agentScore}</p>
          {/* <p className="total-score">Total Score: {totalScore}</p> */}
        </>
      )}
      {milestoneMessage && <p className="milestone-message">{milestoneMessage}</p>}
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default AgentTraining;