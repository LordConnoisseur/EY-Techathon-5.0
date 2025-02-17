from flask import Blueprint, request, jsonify
from genai.knowledge_base import KnowledgeBaseBot

knowledge_bp = Blueprint("knowledge", __name__)
qa_bot = KnowledgeBaseBot()  # Initialize the bot

@knowledge_bp.route("/ask", methods=["POST"])
def ask_question():
    data = request.get_json()
    question = data.get("question")

    if not question:
        return jsonify({"error": "Question is required"}), 400

    answer = qa_bot.answer_question(question)
    return jsonify({"answer": answer}), 200
