import React, { useState } from "react";

function DocumentUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      // API call or file handling logic here
      console.log("Uploading file:", file.name);
    } else {
      alert("Please select a file to upload.");
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
      </div>
    </div>
  );
}

export default DocumentUpload;
