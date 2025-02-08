from flask import Flask
from flask_cors import CORS
from db import db
from routes.batch_processing import batch_processing_bp
from routes.document_upload import document_upload_bp
from routes.form_processing import form_processing_bp

app = Flask(__name__)
app.config.from_object('config.Config')

# Initialize extensions
CORS(app)
db.init_app(app)

# Register blueprints
app.register_blueprint(batch_processing_bp, url_prefix="/api/batch-processing")
app.register_blueprint(document_upload_bp, url_prefix="/api/document-upload")
app.register_blueprint(form_processing_bp, url_prefix="/api/form-processing")

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
