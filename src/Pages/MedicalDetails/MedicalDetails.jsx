import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./MedicalDetails.css";
import PatientSidebar from "../../Components/PatientSidebar/PatientSidebar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { getPatient } from "../../Redux/Actions/PatientActions";
import MedicalDetailsModal from "../../Components/MedicalDetailsModal/MedicalDetailsModal";
import Sidebar from "../../Components/Sidebar/Sidebar";

const MedicalDetails = () => {
  const medDetails = [
    {
      name: "Emeka",
      bmi: "23.7",
      heartRate: "89",
      fbc: "140",
      weight: "74kg",
      date: "2024-03-15",
    },
    {
      name: "Christopher",
      bmi: "23.7",
      heartRate: "89",
      fbc: "140",
      weight: "74kg",
      date: "2024-03-15",
    },
    {
      name: "Vena",
      bmi: "23.7",
      heartRate: "89",
      fbc: "140",
      weight: "74kg",
      date: "2024-03-15",
    },
    // Add more appointment data here if needed
  ];

  const dispatch = useDispatch();
  const patientProfile = useSelector((state) => state.patientProfile);
  const { patient, loading, error } = patientProfile;
  console.log(patient);

  React.useEffect(() => {
    dispatch(getPatient());
  }, [dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddDetails = () => {
    setIsModalOpen(true);
    console.log("hyyy");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const [loadingg, setLoadingg] = useState(false);
  const [errorr, setErrorr] = useState(null);
  const [success, setSuccess] = useState(false);

  const userInfoString = localStorage.getItem("patientInfo"); // Retrieve string from local storage
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null; // Parse string to object
  const handleSaveDetails = async (newDetails) => {
    try {
      // Send request to add medical details
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
          "Content-Type": "application/json", // Adjust content type if necessary
        },
      };
      const response = await axios.post(
        "/api/patient/add-health-data",
        {
          newData: newDetails,
        },
        config
      );
      console.log(response.data);
      dispatch(getPatient());
      setSuccess(true);
      // Refresh patient data or update state accordingly
    } catch (error) {
      setErrorr(error.response?.data?.message || "Something went wrong");
      console.error("Error adding medical details:", error);
      // Handle error
    }
    setLoadingg(false);
  };

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  return (
    <>
      <div className="strip-wrapper py-2">
        <Sidebar
          item="med"
          sidebarVisible={sidebarVisible}
          setSidebarVisible={setSidebarVisible}
        />
        <div className="container">
          <div className="doctor-strip">
            <h2>Medical Details</h2>
            <p>Home / Medical Details</p>
          </div>
        </div>
      </div>
      <div className="med-wrapper">
        <div className="container">
          <div className="meds">
            <PatientSidebar item="med" />
            <div className="main px-4">
              <span
                class="material-symbols-outlined open-button d-md-none d-block mb-3"
                onClick={toggleSidebar}
              >
                menu_open
              </span>
              <div className="med-main py-2">
                <div className="med-top">
                  <h3 className="mb-0">Medical Details</h3>
                  <button className="add-details" onClick={handleAddDetails}>
                    Add Details
                  </button>
                </div>
                <div>
                  <div className="user-table-container">
                    <table className="user-table">
                      <thead>
                        <tr>
                          <th>Dame</th>
                          <th>BMI</th>
                          <th>Heart Rate</th>
                          <th>FBC Status</th>
                          <th>Weight</th>
                          <th>Date</th>
                          <th>Body Temp</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {patient?.healthData?.map((med, index) => (
                          <tr key={index}>
                            <td>{moment(med.date).format("M/D/YYYY")}</td>
                            <td>{med.bmi}</td>
                            <td>{med.heartRate}</td>
                            <td>{med.fbcStatus}</td>
                            <td>{med.weight}</td>
                            <td>{med.glucoseLevel}</td>
                            <td>{med.bodyTemp}</td>
                            <td>
                              <div className="d-flex align-items-center ed gap-2">
                                <span class="material-icons">edit</span>
                                <span class="material-icons">delete</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <MedicalDetailsModal
                      isOpen={isModalOpen}
                      success={success}
                      errorr={errorr}
                      onClose={handleCloseModal}
                      onSubmit={handleSaveDetails}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MedicalDetails;
