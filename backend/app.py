from flask import Flask
from flask_cors import CORS
from db import db
from routes.batch_processing import batch_processing_bp
from routes.document_upload import document_upload_bp
from routes.form_processing import form_processing_bp
from routes.call_queue import call_queue_bp
from routes.call_management import call_management_bp
from routes.priority_management import priority_bp
from routes.sla_tracking import sla_bp

app = Flask(__name__)
app.config.from_object('config.Config')

# Initialize extensions
CORS(app)
db.init_app(app)

# Register blueprints
app.register_blueprint(batch_processing_bp, url_prefix="/api/batch-processing")
app.register_blueprint(document_upload_bp, url_prefix="/api/document-upload")
app.register_blueprint(form_processing_bp, url_prefix="/api/form-processing")
app.register_blueprint(call_queue_bp, url_prefix="/api/call-queue")
app.register_blueprint(call_management_bp, url_prefix="/api/calls")
app.register_blueprint(priority_bp, url_prefix="/api/priority-management")
app.register_blueprint(sla_bp, url_prefix="/api/sla-tracking")


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
