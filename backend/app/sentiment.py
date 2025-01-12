def mock_sentiment_analysis(text):
    if "good" in text:
        return {"sentiment": "positive", "score": 0.9}
    elif "bad" in text:
        return {"sentiment": "negative", "score": 0.2}
    else:
        return {"sentiment": "neutral", "score": 0.5}
