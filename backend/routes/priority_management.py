from flask import Blueprint, request, jsonify
from db import db
from models import CallQueue
from datetime import datetime, timedelta

priority_bp = Blueprint("priority_management", __name__)

# Function to determine priority based on predefined rules
def assign_priority(issue_type, call_time):
    priority_mapping = {
        "High": ["Fraud", "Urgent Claim", "Technical Issue"],
        "Medium": ["Claim Status Update", "Payment Issue"],
        "Low": ["General Inquiry", "Policy Update"]
    }

    for priority, issues in priority_mapping.items():
        if issue_type in issues:
            return priority

    # Fallback: Consider old pending calls as high priority
    if datetime.utcnow() - call_time > timedelta(hours=6):
        return "High"
    
    return "Medium"

# Endpoint to update priority for all calls
@priority_bp.route("/update-priorities", methods=["POST"])
def update_priorities():
    calls = CallQueue.query.filter_by(status="pending").all()
    
    for call in calls:
        call.priority = assign_priority(call.issue_type, call.created_at)
    
    db.session.commit()
    return jsonify({"message": "Priorities updated successfully"}), 200

# Endpoint to get prioritized call queue
@priority_bp.route("/get-priority-queue", methods=["GET"])
def get_priority_queue():
    calls = CallQueue.query.filter(CallQueue.status == "pending").order_by(
        db.case(
            (CallQueue.priority == "High", 1),
            (CallQueue.priority == "Medium", 2),
            (CallQueue.priority == "Low", 3),
            else_=4
        )
    ).all()
    
    return jsonify([call.to_dict() for call in calls]), 200
