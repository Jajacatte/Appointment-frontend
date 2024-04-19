import React from "react";
import "./AwardsForm.css";

const AwardsForm = ({ doctorData, setDoctorData }) => {
  const handleInputChange = (index, field, value) => {
    const newAwards = [...doctorData.awards];
    newAwards[index][field] = value;
    setDoctorData({ ...doctorData, awards: newAwards });
  };

  const handleAddMore = () => {
    setDoctorData({
      ...doctorData,
      awards: [...doctorData.awards, { name: "", year: "" }],
    });
  };

  const handleRemove = (index) => {
    const newAwards = [...doctorData.awards];
    newAwards.splice(index, 1);
    setDoctorData({ ...doctorData, awards: newAwards });
  };

  return (
    <div className="awards-form-container">
      {doctorData.awards.map((award, index) => (
        <div key={index} className="award-group">
          <div className="input-row">
            <div className="input-group">
              <label htmlFor={`award-${index}`} className="label">
                Award
              </label>
              <input
                type="text"
                name={`award-${index}`}
                id={`award-${index}`}
                value={award.name}
                onChange={(event) =>
                  handleInputChange(index, "name", event.target.value)
                }
                className="input"
              />
            </div>
            <div className="input-groupg">
              <label htmlFor={`year-${index}`} className="label">
                Year
              </label>
              <div className="d-flex">
                <input
                  className="w-100"
                  type="text"
                  name={`year-${index}`}
                  id={`year-${index}`}
                  value={award.year}
                  onChange={(event) =>
                    handleInputChange(index, "year", event.target.value)
                  }
                
                />
                {index !== 0 && (
                  <span
                    className="material-symbols-outlined remove-button px-2"
                    onClick={() => handleRemove(index)}
                  >
                    delete
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="d-flex align-items-center cc" onClick={handleAddMore}>
        <span className="material-symbols-outlined">add_circle</span>
        <h5 className="mb-0">Add More</h5>
      </div>
    </div>
  );
};

export default AwardsForm;
