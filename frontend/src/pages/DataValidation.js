import React, { useState } from "react";

function DataValidation() {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [valid, setValid] = useState(true);

  const validateData = () => {
    const { name, email, phone } = data;
    // Example validation logic (you can expand this)
    if (name && email && phone) {
      setValid(true);
      alert("Data is valid!");
    } else {
      setValid(false);
      alert("Please fill all the fields.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Data Validation</h2>
      <div className="bg-gray-100 p-6 rounded shadow">
        <div className="mb-4">
          <label className="block text-sm font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Phone</label>
          <input
            type="text"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            className="p-2 border rounded w-full"
          />
        </div>
        <button
          onClick={validateData}
          className={`${
            valid ? "bg-green-500" : "bg-red-500"
          } text-white p-2 rounded`}
        >
          Validate Data
        </button>
      </div>
    </div>
  );
}

export default DataValidation;
