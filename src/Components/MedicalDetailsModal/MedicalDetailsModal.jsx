import React, { useState } from "react";

const MedicalDetailsModal = ({ isOpen, onClose, onSubmit, success, errorr }) => {
  console.log(isOpen);
  const [medicalDetails, setMedicalDetails] = useState({
    date: "",
    bmi: "",
    heartRate: "",
    fbcStatus: "",
    weight: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicalDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(medicalDetails);
    onClose();
  };

  return (
    isOpen && (
      <div className="medical-modal">
        <div className="medical-modal-content">
          <span className="med-close" onClick={onClose}>
            &times;
          </span>
          <h2>Add Medical Details</h2>
          {errorr && <p style={{ color: "red" }}>{errorr}</p>}
          {success && (
            <p style={{ color: "green" }}>Health data added successfully!</p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Date:</label>
              <input
                type="date"
                name="date"
                value={medicalDetails.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>BMI:</label>
              <input
                type="number"
                name="bmi"
                value={medicalDetails.bmi}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Heart Rate:</label>
              <input
                type="number"
                name="heartRate"
                value={medicalDetails.heartRate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label> Weight:</label>
              <input
                type="number"
                name="weight"
                value={medicalDetails.weight}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label> fbcStatus:</label>
              <input
                type="number"
                name="fbcStatus"
                value={medicalDetails.fbcStatus}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>BodyTemp:</label>
              <input
                type="number"
                name="bodyTemp"
                value={medicalDetails.bodyTemp}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>GlucoseLevel:</label>
              <input
                type="number"
                name="glucoseLevel"
                value={medicalDetails.glucoseLevel}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>BloodPressure:</label>
              <input
                type="number"
                name="bloodPressure"
                value={medicalDetails.bloodPressure}
                onChange={handleChange}
                required
              />
            </div>
            {/* Add more input fields for other medical details */}
            <button type="submit">Update</button>
          </form>
        </div>
      </div>
    )
  );
};

export default MedicalDetailsModal;
