import React, { useState } from "react";

function FormProcessing() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // API call or form processing logic here
    console.log("Form Data:", formData);
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
      </div>
    </div>
  );
}

export default FormProcessing;
