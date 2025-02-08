import React, { useState } from "react";

function FormProcessing() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/form-processing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const data = await response.json();
      setResponseMessage(data.message);
    } catch (error) {
      console.error("Error submitting form:", error);
      setResponseMessage("Error submitting form");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Form Processing</h2>
      <div className="bg-gray-100 p-6 rounded shadow">
        <div className="mb-4">
          <label className="block text-sm font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white p-2 rounded"
        >
          Submit Form
        </button>
        {responseMessage && <p className="mt-4">{responseMessage}</p>}
      </div>
    </div>
  );
}

export default FormProcessing;
