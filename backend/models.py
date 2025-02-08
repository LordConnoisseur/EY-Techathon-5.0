from db import db
from datetime import datetime

class FormSubmission(db.Model):
    __tablename__ = "form_submission"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(15), nullable=False)  # Updated field to match frontend

class CallQueue(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    caller_name = db.Column(db.String(100), nullable=False)
    caller_phone = db.Column(db.String(20), nullable=False)
    issue_type = db.Column(db.String(100), nullable=False)
    issue_description = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(20), default="pending")
    assigned_agent = db.Column(db.String(100), nullable=True)
    priority = db.Column(db.String(10), default="Medium")
    sentiment_score = db.Column(db.Float, default=0.0)
    escalation_level = db.Column(db.Integer, default=0)  # New column for multi-tier escalation
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_updated = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "caller_name": self.caller_name,
            "caller_phone": self.caller_phone,
            "issue_type": self.issue_type,
            "issue_description": self.issue_description,
            "status": self.status,
            "priority": self.priority,
            "sentiment_score": self.sentiment_score,
            "escalation_level": self.escalation_level,
            "created_at": self.created_at.isoformat(),
            "last_updated": self.last_updated.isoformat(),
        }