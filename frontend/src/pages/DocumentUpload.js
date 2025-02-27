import React, { useState } from "react";
import "./DocumentUpload.css"; // Import the same CSS file for consistency

function DocumentUpload() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/document-upload", {
        method: "POST",
        body: formData,
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid server response. Expected JSON.");
      }

      const data = await response.json();
      if (response.ok) {
        setUploadStatus(`✅ Upload Successful: ${data.file_path}`);
      } else {
        setUploadStatus(`❌ Upload Failed: ${data.error}`);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("❌ Upload Failed: Server Error");
    }
  };

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Document Upload</h1>
      </header>

      <main className="dashboard-main">
        <div className="glass-card upload-container">
          <h2 className="upload-title">Upload a Document</h2>
          <input
            type="file"
            onChange={handleFileChange}
            className="file-input"
          />
          <button onClick={handleUpload} className="upload-button">
            Upload Document
          </button>
          {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
        </div>
      </main>
    </div>
  );
}

export default DocumentUpload;