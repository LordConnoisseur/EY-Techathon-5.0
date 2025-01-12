import React, { useState } from "react";

function BatchProcessing() {
  const [batchData, setBatchData] = useState([]);
  const [status, setStatus] = useState("Idle");

  const handleProcessBatch = () => {
    // Simulate batch processing
    setStatus("Processing...");
    setTimeout(() => {
      setStatus("Completed");
      alert("Batch processing completed!");
    }, 3000);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Batch Processing</h2>
      <div className="bg-gray-100 p-6 rounded shadow">
        <button
          onClick={handleProcessBatch}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Start Batch Processing
        </button>
        <div className="mt-4">
          <p>Status: {status}</p>
        </div>
      </div>
    </div>
  );
}

export default BatchProcessing;
