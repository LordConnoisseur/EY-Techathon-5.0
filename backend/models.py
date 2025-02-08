from db import db

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
    status = db.Column(db.String(50), default="pending")
    assigned_agent = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "caller_name": self.caller_name,
            "caller_phone": self.caller_phone,
            "issue_type": self.issue_type,
            "status": self.status,
            "assigned_agent": self.assigned_agent,
        }