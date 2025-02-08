from flask import Blueprint, request, jsonify
from db import db

form_processing_bp = Blueprint("form_processing", __name__)

class FormSubmission(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    message = db.Column(db.Text, nullable=False)

@form_processing_bp.route("/", methods=["POST"])
def submit_form():
    """
    Processes and validates a submitted form.
    """
    data = request.get_json()

    if not data or not all(k in data for k in ("name", "email", "message")):
        return jsonify({"error": "Invalid form data"}), 400

    new_submission = FormSubmission(name=data["name"], email=data["email"], message=data["message"])
    db.session.add(new_submission)
    db.session.commit()

    return jsonify({"message": "Form submitted successfully"}), 201
