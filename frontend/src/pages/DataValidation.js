import React, { useState } from "react";
import "./DataValidation.css"; // Import external CSS

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
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Data Validation</h1>
      </header>

      <main className="dashboard-main">
        <div className="glass-card validation-container">
          <div className="input-group">
            <label className="input-label">Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label className="input-label">Email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label className="input-label">Phone</label>
            <input
              type="text"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <button
            onClick={validateData}
            className={`validation-button ${
              valid ? "valid" : "invalid"
            }`}
          >
            Validate Data
          </button>
        </div>
      </main>
    </div>
  );
}

export default DataValidation;