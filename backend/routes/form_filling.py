# from flask import Blueprint, request, jsonify
# from genai.form_filler import FormFillingBot

# form_filling_bp = Blueprint("form_filling", __name__)
# form_bot = FormFillingBot()

# @form_filling_bp.route("/fill-form", methods=["POST"])
# def fill_form():
#     data = request.get_json()
#     transcript = data.get("transcript")

#     if not transcript:
#         return jsonify({"error": "Transcript is required"}), 400

#     form_data = form_bot.extract_form_data(transcript)
#     return jsonify({"form_data": form_data}), 200
