from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS for all routes
    from app.routes import configure_routes
    configure_routes(app)  # Register the routes
    return app
