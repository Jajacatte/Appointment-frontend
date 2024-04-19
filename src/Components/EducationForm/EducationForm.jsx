import React, { useState } from "react";
import "./EducationForm.css";

const EducationForm = ({ doctorData, setDoctorData }) => {
  const [education, setEducation] = useState(doctorData.education);

  const handleInputChange = (index, field, value) => {
    const newEducation = [...education];
    newEducation[index][field] = value;
    setEducation(newEducation);
    setDoctorData({ ...doctorData, education: newEducation });
  };

  const handleAddMore = () => {
    setEducation([...education, { degree: "", college: "", year: "" }]);
  };

  const handleRemove = (index) => {
    const newEducation = [...education];
    newEducation.splice(index, 1);
    setEducation(newEducation);
    setDoctorData({ ...doctorData, education: newEducation });
  };

  return (
    <>
      <div className="education-form-container">
        {education.map((edu, index) => (
          <div key={index} className="education-group">
            <div className="input-row">
              <div className="input-group">
                <label htmlFor={`degree-${index}`}>Degree</label>
                <input
                  type="text"
                  name={`degree-${index}`}
                  id={`degree-${index}`}
                  value={edu.degree}
                  onChange={(event) =>
                    handleInputChange(index, "degree", event.target.value)
                  }
                />
              </div>
              <div className="input-group">
                <label htmlFor={`college-${index}`}>College</label>
                <input
                  type="text"
                  name={`college-${index}`}
                  id={`college-${index}`}
                  value={edu.college}
                  onChange={(event) =>
                    handleInputChange(index, "college", event.target.value)
                  }
                />
              </div>
              <div className="input-groupg w-100">
                <label htmlFor={`year-${index}`}>Year of Completion</label>
                <div className="d-flex  bb">
                  <input
                    className="w-100"
                    type="text"
                    name={`year-${index}`}
                    id={`year-${index}`}
                    value={edu.year}
                    onChange={(event) =>
                      handleInputChange(index, "year", event.target.value)
                    }
                  />
                  {index !== 0 && (
                    <span
                      className="material-symbols-outlined remove-button px-2 cc"
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
    </>
  );
};

export default EducationForm;
