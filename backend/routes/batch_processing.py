from flask import Blueprint, request, jsonify

batch_processing_bp = Blueprint("batch_processing", __name__)

@batch_processing_bp.route("/", methods=["POST"])
def process_batch():
    """
    Receives batch data in JSON format and simulates processing.
    """
    try:
        data = request.get_json()
        if not data or "items" not in data:
            return jsonify({"error": "Invalid request format"}), 400

        items = data["items"]
        processed_items = [{"id": i, "status": "processed"} for i in items]

        return jsonify({"message": "Batch processed successfully", "processed_items": processed_items}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
