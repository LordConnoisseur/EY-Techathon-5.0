from flask import Blueprint, request, jsonify
import os
from audio_analysis import transcribe_audio, analyze_sentiment

audio_bp = Blueprint('audio', __name__)
UPLOAD_FOLDER = os.path.join(os.getcwd(), "uploads")

# Ensure the uploads folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
    print("Created upload folder at:", UPLOAD_FOLDER)
else:
    print("Upload folder exists at:", UPLOAD_FOLDER)

@audio_bp.route("/analyze-audio", methods=["POST"])
def analyze_audio_endpoint():
    if "audio" not in request.files:
        return jsonify({"error": "No audio file provided"}), 400

    audio_file = request.files["audio"]
    # Use a safe filename if needed (here we assume filename is safe)
    file_path = os.path.join(UPLOAD_FOLDER, audio_file.filename)
    print("Saving uploaded file to:", file_path)
    audio_file.save(file_path)
    
    # Verify the file exists
    if not os.path.exists(file_path):
        return jsonify({"error": "File saving failed"}), 500
    else:
        print("File saved successfully.")

    try:
        # Transcribe the audio and analyze sentiment
        transcription = transcribe_audio(file_path)
        sentiment_result = analyze_sentiment(transcription)
        response = {
            "transcription": transcription,
            "sentiment": sentiment_result
        }
        return jsonify(response)
    except Exception as e:
        print("Error during processing:", e)
        return jsonify({"error": str(e)}), 500
