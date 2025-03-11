from flask import Blueprint, request, jsonify
from db import db
from models import ClaimSubmission

client_bp = Blueprint("client", __name__)

@client_bp.route("/claim/submit", methods=["POST"])
def submit_claim():
    data = request.get_json()
    
    if not data.get("name") or not data.get("phone") or not data.get("policy") or not data.get("incident"):
        return jsonify({"message": "All fields are required"}), 400

    new_claim = ClaimSubmission(
        name=data["name"],
        phone=data["phone"],
        policy_number=data["policy"],
        incident_detail=data["incident"]
    )

    try:
        db.session.add(new_claim)
        db.session.commit()
        return jsonify({"message": "Claim submitted successfully!"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error saving claim", "error": str(e)}), 500
    
@client_bp.route("/claims", methods=["GET"])
def get_claims():
    claims = ClaimSubmission.query.all()
    claims_list = [
        {
            "name": claim.name,
            "phone": claim.phone,
            "policy_no": claim.policy_number,
            "incident_detail": claim.incident_detail
        }
        for claim in claims
    ]
    return jsonify(claims_list)