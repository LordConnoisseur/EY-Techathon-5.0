from flask import jsonify, request
from app.sentiment import mock_sentiment_analysis
from app.knowledge_base import knowledge_articles

def configure_routes(app):
    # Call Management Endpoints
    @app.route('/api/calls/queue', methods=['GET'])
    def get_call_queue():
        call_queue = [{"id": 1, "client": "Sundaresh", "status": "pending", "priority": 2}]
        return jsonify(call_queue)

    @app.route('/api/calls/schedule', methods=['POST'])
    def schedule_call():
        data = request.get_json()
        return jsonify({"status": "scheduled", "data": data}), 201

    @app.route('/api/calls/priority', methods=['GET'])
    def get_priority_queue():
        priority_queue = [{"id": 1, "client": "Sundaresh", "priority": 2}]
        return jsonify(priority_queue)

    # Knowledge Base Endpoints
    @app.route('/api/kb/search', methods=['GET'])
    def search_kb():
        query = request.args.get('query', '')
        results = [article for article in knowledge_articles if query.lower() in article['title'].lower()]
        return jsonify(results)

    @app.route('/api/kb/articles', methods=['GET'])
    def get_articles():
        return jsonify(knowledge_articles)

    # Client Analysis Endpoints
    @app.route('/api/analysis/sentiment', methods=['POST'])
    def analyze_sentiment():
        data = request.get_json()
        sentiment = mock_sentiment_analysis(data['text'])
        return jsonify(sentiment)

    # Data Processing Endpoints
    @app.route('/api/data/upload', methods=['POST'])
    def upload_file():
        if 'file' not in request.files:
            return jsonify({"error": "No file part"}), 400
        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400
        file.save(f'./uploads/{file.filename}')
        return jsonify({"status": "file uploaded", "filename": file.filename}), 201
