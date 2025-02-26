
from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
from dotenv import load_dotenv
from pathlib import Path
from langchain_community.vectorstores import FAISS
from langchain.indexes.vectorstore import VectorStoreIndexWrapper
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from PyPDF2 import PdfReader
import google.generativeai as genai
import os
import time
from langchain.llms.base import LLM
from typing import Any, List, Optional, Dict
from pydantic import Field, BaseModel

knowledge_bp = Blueprint('knowledge', __name__)


class GeminiLLM(LLM, BaseModel):
    model_name: str = Field(default="gemini-1.5-flash", description="The name of the Gemini model")
    model: Optional[Any] = Field(None, description="The GenerativeModel instance")

    def __init__(self, model_name: str, **data):
        super().__init__(**data)
        self.model = genai.GenerativeModel(model_name=self.model_name)  # Initialize the model here

    def _call(self, prompt: str, stop: Optional[List[str]] = None) -> str:
        system_prompt = (
            "You are a document-based Q&A assistant. Only answer questions based on the uploaded document. "
            "If the answer is not found in the document, respond with: 'The requested information is not available in the uploaded document. "
            "Please ask something related to the document's content.' Do not use external knowledge or speculate."
        )
        full_prompt = f"{system_prompt}\n\nUser Query: {prompt}\n\nAnswer:"
        
        if self.model is None:
            raise ValueError("Model is not initialized properly.")
        
        response = self.model.generate_content(full_prompt)
        return response.text

    @property
    def _llm_type(self) -> str:
        return "gemini"

    @property
    def _identifying_params(self) -> Dict[str, Any]:
        return {"model_name": self.model_name}

load_dotenv(Path(".env"))

db = None

@knowledge_bp.route('/upload', methods=['POST'])
def upload_pdf():
    global db
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    uploaded_file = request.files['file']
    pdf_reader = PdfReader(uploaded_file)
    raw_text = ''
    for page in pdf_reader.pages:
        content = page.extract_text()
        if content:
            raw_text += content
    GOOGLE_API_KEY="AIzaSyAZCfPg4CG778dEtoWW4BwDICXjven5u-k"
    genai.configure(api_key=GOOGLE_API_KEY)
    embedding_function = HuggingFaceEmbeddings(model_name='sentence-transformers/all-MiniLM-L6-v2')
    faiss_vector_store = FAISS.from_texts([raw_text], embedding_function)
    
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=200,
    )
    texts = text_splitter.split_text(raw_text)
    faiss_vector_store.add_texts(texts[:50])
    
    db = VectorStoreIndexWrapper(vectorstore=faiss_vector_store)
    return jsonify({"message": "PDF processed and database initialized!"})

@knowledge_bp.route('/query', methods=['POST'])
def query():
    global db
    if db is None:
        return jsonify({"error": "Database not initialized. Upload a PDF first."}), 400
    
    data = request.json
    query_text = data.get('query', '').strip()
    if not query_text:
        return jsonify({"error": "No query provided."}), 400
    
    gemini_llm = GeminiLLM(model_name='gemini-1.5-flash')
    answer = db.query(query_text, llm=gemini_llm).strip()
    
    return jsonify({"answer": answer})