import os
import whisper
from transformers import pipeline

# Load the Whisper model (this will download the model if needed)
print("Loading Whisper model...")
whisper_model = whisper.load_model("base")

# Load the sentiment analysis pipeline with an explicit model
print("Loading sentiment analysis model...")
sentiment_pipeline = pipeline(
    "sentiment-analysis",
    model="distilbert-base-uncased-finetuned-sst-2-english"
)

def transcribe_audio(audio_path):
    """
    Transcribes an audio file using the Whisper model.
    Assumes the audio file is a valid WAV file.
    """
    abs_path = os.path.abspath(audio_path)
    print("Transcribing audio file at:", abs_path)
    
    # Transcribe using Whisper (force CPU mode with fp16=False)
    result = whisper_model.transcribe(audio_path, fp16=False)
    print("Transcription result:", result)
    return result["text"]

def analyze_sentiment(text):
    """
    Analyzes the sentiment of the transcribed text.
    """
    print("Analyzing sentiment for text:", text)
    sentiment = sentiment_pipeline(text)
    print("Sentiment result:", sentiment)
    return sentiment[0]  # Returns a dictionary with 'label' and 'score'
