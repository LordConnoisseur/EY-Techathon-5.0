from flask import Flask
from flask_cors import CORS
from db import db
from apscheduler.schedulers.background import BackgroundScheduler

# Import Blueprints
from routes.batch_processing import batch_processing_bp
from routes.document_upload import document_upload_bp
from routes.form_processing import form_processing_bp
from routes.call_queue import call_queue_bp
from routes.call_management import call_management_bp
from routes.priority_management import priority_bp
from routes.sla_tracking import sla_bp
from routes.escalation import escalation_bp, auto_escalate_calls
from routes.knowledge_base import knowledge_bp
from routes.form_filling import form_filling_bp
from routes.streamlit import streamlit_bp

# Initialize Flask App
app = Flask(__name__)
app.config.from_object("config.Config")

# Initialize Extensions
CORS(app)
db.init_app(app)

# Register Blueprints
app.register_blueprint(batch_processing_bp, url_prefix="/api/batch-processing")
app.register_blueprint(document_upload_bp, url_prefix="/api/document-upload")
app.register_blueprint(form_processing_bp, url_prefix="/api/form-processing")
app.register_blueprint(call_queue_bp, url_prefix="/api/call-queue")
app.register_blueprint(call_management_bp, url_prefix="/api/calls")
app.register_blueprint(priority_bp, url_prefix="/api/priority-management")
app.register_blueprint(sla_bp, url_prefix="/api/sla-tracking")
app.register_blueprint(escalation_bp, url_prefix="/api/escalation")
app.register_blueprint(knowledge_bp, url_prefix="/api/knowledge")
app.register_blueprint(form_filling_bp, url_prefix="/api/form-filling")
app.register_blueprint(streamlit_bp, url_prefix="/api/streamlit")

# Initialize Scheduler (Fix: Pass `app` explicitly)
scheduler = BackgroundScheduler()
scheduler.add_job(lambda: auto_escalate_calls(app), "interval", minutes=1)  # ✅ Pass `app`
scheduler.start()

# Create Database Tables
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
