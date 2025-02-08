from db import db

class FormSubmission(db.Model):
    __tablename__ = "form_submission"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(15), nullable=False)  # Updated field to match frontend
