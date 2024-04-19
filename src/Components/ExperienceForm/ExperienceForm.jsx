import React, { useState } from "react";
import "./ExperienceForm.css"; // Import your CSS file for styling

const ExperienceForm = ({ doctorData, setDoctorData }) => {
  const [experiences, setExperiences] = useState(doctorData.experience);

  const handleInputChange = (index, field, value) => {
    const newExperiences = [...experiences];
    newExperiences[index][field] = value;
    setExperiences(newExperiences);
    setDoctorData({ ...doctorData, experience: newExperiences });
  };

  const handleAddMore = () => {
    setExperiences([
      ...experiences,
      { organization: "", from: "", to: "", designation: "" },
    ]);
  };

  const handleRemove = (index) => {
    const newExperiences = [...experiences];
    newExperiences.splice(index, 1);
    setExperiences(newExperiences);
    setDoctorData({ ...doctorData, experience: newExperiences });
  };

  return (
    <div className="experience-form-container">
      {experiences.map((exp, index) => (
        <div key={index} className="experience-group">
          <div className="input-row">
            <div className="input-group">
              <label htmlFor={`organization-${index}`}>Organization</label>
              <input
                type="text"
                name={`organization-${index}`}
                id={`organization-${index}`}
                placeholder="Organization"
                value={exp.organization}
                onChange={(event) =>
                  handleInputChange(index, "organization", event.target.value)
                }
              />
            </div>
            <div className="input-group">
              <label htmlFor={`from-${index}`}>From</label>
              <input
                type="date"
                name={`from-${index}`}
                id={`from-${index}`}
                value={exp.from}
                onChange={(event) =>
                  handleInputChange(index, "from", event.target.value)
                }
              />
            </div>
            <div className="input-group">
              <label htmlFor={`to-${index}`}>To</label>
              <input
                type="date"
                name={`to-${index}`}
                id={`to-${index}`}
                value={exp.to}
                onChange={(event) =>
                  handleInputChange(index, "to", event.target.value)
                }
              />
            </div>
            <div className="input-groupg">
              <label htmlFor={`designation-${index}`}>Designation</label>
              <div className="d-flex">
                <input
                  className="w-100"
                  type="text"
                  name={`designation-${index}`}
                  id={`designation-${index}`}
                  value={exp.designation}
                  onChange={(event) =>
                    handleInputChange(index, "designation", event.target.value)
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

export default ExperienceForm;
