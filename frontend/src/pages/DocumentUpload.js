import React, { useState } from "react";

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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Document Upload</h2>
      <div className="bg-gray-100 p-6 rounded shadow">
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4 p-2 border rounded"
        />
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Upload Document
        </button>
        {uploadStatus && <p className="mt-4">{uploadStatus}</p>}
      </div>
    </div>
  );
}

export default DocumentUpload;