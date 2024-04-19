import React, { useState, useEffect, useRef } from "react";

import axios from "axios";
import "./PatientDashboard.css";
import ReactStars from "react-rating-stars-component";
import PatientSidebar from "../../Components/PatientSidebar/PatientSidebar";
import { useDispatch, useSelector } from "react-redux";
import { getPatientProfile } from "../../Redux/Actions/PatientActions";
import { getPatient } from "../../Redux/Actions/PatientActions";
import Sidebar from "../../Components/Sidebar/Sidebar";

const PatientDashboard = () => {
  const dispatch = useDispatch();
  const appointments = [
    {
      doctor: {
        name: "Dr. John Doe",
        image: "/images/doctor-thumb-01.jpg",
        speciality: "Cardiology",
      },
      appointmentDate: "2024-03-15",
      bookingDate: "2024-03-10",
      amount: "$100",
      followUp: "Yes",
      status: "Confirmed",
    },
    {
      doctor: {
        name: "Dr. Jane Smith",
        image: "/images/doctor-thumb-02.jpg",
        speciality: "Orthopedics",
      },
      appointmentDate: "2024-03-20",
      bookingDate: "2024-03-12",
      amount: "$120",
      followUp: "No",
      status: "Pending",
    },
    {
      doctor: {
        name: "Dr. Alex Johnson",
        image: "/images/doctor-thumb-03.jpg",
        speciality: "Dermatology",
      },
      appointmentDate: "2024-03-25",
      bookingDate: "2024-03-18",
      amount: "$80",
      followUp: "Yes",
      status: "Canceled",
    },
    // Add more appointment data here if needed
  ];

  const medics = [
    {
      created: {
        name: "Dr. John Doe",
        image: "/images/doctor-thumb-01.jpg",
        speciality: "Cardiology",
      },
      id: "#MR-0010",
      date: "2024-03-10",
      description: "$100",
      attachment: "Yes",
    },
    {
      created: {
        name: "Dr. John Doe",
        image: "/images/doctor-thumb-02.jpg",
        speciality: "Cardiology",
      },
      id: "#MR-009",
      date: "2024-03-10",
      description: "$100",
      attachment: "Yes",
    },
    {
      created: {
        name: "Dr. John Doe",
        image: "/images/doctor-thumb-03.jpg",
        speciality: "Cardiology",
      },
      id: "#MR-008",
      date: "2024-03-10",
      description: "$100",
      attachment: "Yes",
    },
    // Add more appointment data here if needed
  ];

  const billing = [
    {
      created: {
        name: "Dr. John Doe",
        image: "/images/doctor-thumb-01.jpg",
        speciality: "Cardiology",
      },
      id: "#MR-0010",
      date: "2024-03-10",
      amount: "$100",
    },
    {
      created: {
        name: "Dr. John Doe",
        image: "/images/doctor-thumb-02.jpg",
        speciality: "Cardiology",
      },
      id: "#MR-009",
      date: "2024-03-10",
      amount: "$100",
    },
    {
      created: {
        name: "Dr. John Doe",
        image: "/images/doctor-thumb-03.jpg",
        speciality: "Cardiology",
      },
      id: "#MR-008",
      date: "2024-03-10",
      amount: "$100",
    },
    // Add more appointment data here if needed
  ];

  const getStatusClassName = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "status-confirmed";
      case "scheduled":
        return "status-pending";
      case "canceled":
        return "status-canceled";
      default:
        return "";
    }
  };

  const [activeTab, setActiveTab] = useState("appointment");
  const [lineStyle, setLineStyle] = useState({});
  const [lineStyle2, setLineStyle2] = useState({});
  const tabsRef = useRef(null);
  useEffect(() => {
    // Set initial position of the line under the active tab when the component mounts
    const activeButton = tabsRef.current.querySelector(".active");
    const activeRect = activeButton.getBoundingClientRect();
    const tabsRect = tabsRef.current.getBoundingClientRect();
    setLineStyle({
      left: activeRect.left - tabsRect.left + "px",
      width: activeRect.width + "px",
    });
  }, []);

  const handleTabClick = (tab, event) => {
    setActiveTab(tab);
    const tabRect = event.target.getBoundingClientRect();
    const tabsRect = tabsRef.current.getBoundingClientRect();
    setLineStyle({
      left: tabRect.left - tabsRect.left + "px",
      width: tabRect.width + "px",
    });
  };
  const handleTabHover = (event) => {
    const tabRect = event.target.getBoundingClientRect();
    const tabsRect = tabsRef.current.getBoundingClientRect();
    setLineStyle2({
      left: tabRect.left - tabsRect.left + "px",
      width: tabRect.width + "px",
      backgroundColor: "rgb(218, 217, 217)", // Change the color to grey when hovering
    });
  };

  const handleTabLeave = () => {
    const activeButton = tabsRef.current.querySelector(".active");
    const activeRect = activeButton.getBoundingClientRect();
    const tabsRect = tabsRef.current.getBoundingClientRect();
    setLineStyle2({
      left: activeRect.left - tabsRect.left + "px",
      width: activeRect.width + "px",
    });
  };

  const patientProfile = useSelector((state) => state.patientProfile);
  const { patient, loading, error } = patientProfile;
  console.log(patient);

  React.useEffect(() => {
    dispatch(getPatient());
  }, [dispatch]);

  const sortedHealthData = patient?.healthData?.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Get the latest health data
  const latestHealthData = sortedHealthData?.[0];

  const [appointmentss, setAppointmentss] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [errorr, setErrorr] = useState(null);
  const patientId = "6601a1b865432f99696ecefb"; // Replace 'YOUR_PATIENT_ID' with the actual patient ID
  console.log(appointmentss);

  const userInfoString = localStorage.getItem("patientInfo"); // Retrieve string from local storage
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null; // Parse string to object
  console.log("TOKENNN", userInfo?.token);
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
            "Content-Type": "application/json", // Adjust content type if necessary
          },
        };
        const response = await axios.get(
          `/api/appointment/appointments/patient`,
          config
        );
        setAppointmentss(response.data.appointments);
        console.log("APPPONTETTT", response.data);
      } catch (error) {
        setErrorr(error.message);
      } finally {
        // setLoading(false);
      }
    };

    fetchAppointments();
  }, [patientId]);

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <>
      <div className="strip-wrapper py-2">
        <Sidebar
          item="dashboard"
          sidebarVisible={sidebarVisible}
          setSidebarVisible={setSidebarVisible}
        />
        <div className="container">
          <div className="doctor-strip">
            <h2>Dashboard</h2>
            <p>Home / Dashboard</p>
          </div>
        </div>
      </div>
      <div className="patient-dashboard-wrapper">
        <div className="container">
          <div className="patient">
            <PatientSidebar item="dashboard" />
            <div className="main px-4">
              <span
                class="material-symbols-outlined open-button d-md-none d-block mb-3"
                onClick={toggleSidebar}
              >
                menu_open
              </span>
              <div className="row">
                <div className="col-lg-4 col-12 d-flex justify-content-center da flex-column">
                  <div className="t">
                    <div className="da-img">
                      <img
                        className="img-fluid"
                        src="/images/pt-dashboard-01.png"
                        alt="Heart Rate"
                      />
                    </div>
                    <div className="mt-2">
                      <h3>Heart Rate</h3>
                      <h3>
                        {latestHealthData?.heartRate}
                        <sub>bpm</sub>
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-12 d-flex justify-content-center da flex-column">
                  <div className="t">
                    <div className="da-img">
                      <img
                        className="img-fluid"
                        src="/images/pt-dashboard-02.png"
                        alt="Body Temperature"
                      />
                    </div>
                    <div className="mt-2">
                      <h3>Body Temperature</h3>
                      <h3>
                        {latestHealthData?.bodyTemp}
                        <sub>c</sub>
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-12 d-flex justify-content-center da flex-column">
                  <div className="t">
                    <div className="da-img">
                      <img
                        className="img-fluid"
                        src="/images/pt-dashboard-03.png"
                        alt="Glucose Level"
                      />
                    </div>
                    <div className="mt-2">
                      <h3>Glucose Level</h3>
                      <h3>{latestHealthData?.glucoseLevel}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-12  d-flex justify-content-center da flex-column">
                  <div className="t">
                    <div className="da-img">
                      <img
                        className="img-fluid"
                        src="/images/pt-dashboard-04.png"
                        alt="Blood Pressure"
                      />
                    </div>
                    <div className="mt-2">
                      <h3>Blood Pressure</h3>
                      <h3>
                        {latestHealthData?.bloodPressure}
                        <sub>mg/dl</sub>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 graph">
                <div className="medics">
                  <h3 className="mb-0">Medical Status</h3>
                </div>
                <div className="row p-3">
                  <div className="col-lg-4 col-12 ">
                    <div className="x1">
                      <h3>BMI Status</h3>
                      <img className="img-fluid" src="/images/graph-01.png" />
                      <h3 className="mt-2"> {latestHealthData?.bmi}</h3>
                    </div>
                  </div>
                  <div className="col-lg-4 col-12 ">
                    <div className="x2">
                      <h3>Heart Rate Status</h3>
                      <img className="img-fluid" src="/images/graph-02.png" />
                      <h3 className="mt-2"> {latestHealthData?.heartRate}</h3>
                    </div>
                  </div>
                  <div className="col-lg-4 col-12 ">
                    <div className="x3">
                      <h3>FBC Status</h3>
                      <img className="img-fluid" src="/images/graph-03.png" />
                      <h3 className="mt-2"> {latestHealthData?.fbcStatus}</h3>
                    </div>
                  </div>
                  <div className="col-lg-4 col-12 ">
                    <div className="x2">
                      <h3>Weight Status</h3>
                      <img className="img-fluid" src="/images/graph-04.png" />
                      <h3 className="mt-2"> {latestHealthData?.weight}</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 appointment">
                <div className="tabs-main">
                  <div className="tabs" ref={tabsRef}>
                    <button
                      className={activeTab === "appointment" ? "active" : ""}
                      onClick={(e) => handleTabClick("appointment", e)}
                      onMouseEnter={handleTabHover}
                      onMouseLeave={handleTabLeave}
                    >
                      Appointments
                    </button>

                    <button
                      className={activeTab === "billing" ? "active" : ""}
                      onClick={(e) => handleTabClick("billing", e)}
                      onMouseEnter={handleTabHover}
                      onMouseLeave={handleTabLeave}
                    >
                      Billing
                    </button>

                    <div className="line" style={lineStyle}></div>
                    <div className="line2" style={lineStyle2}></div>
                  </div>
                  <div className="content">
                    {activeTab === "appointment" && (
                      <div>
                        <div className="user-table-container">
                          <table className="user-table">
                            <thead>
                              <tr>
                                <th>Doctor</th>
                                <th>Appointment Date</th>
                                <th>Booking time</th>

                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {appointmentss?.map((appointment, index) => (
                                <tr key={index}>
                                  <td>
                                    <div className="d-flex">
                                      <img
                                        src={appointment?.doctor?.profileImage}
                                        alt="Doctor"
                                        className="doctor-image"
                                      />
                                      <div>
                                        <h4>
                                          {appointment.doctor.firstName}{" "}
                                          {appointment.doctor.lastName}
                                        </h4>
                                        <p className="mb-0">
                                          {appointment.doctor.field}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td>{appointment.date}</td>
                                  <td>{appointment.time}</td>

                                  <td
                                    className={getStatusClassName(
                                      appointment.status
                                    )}
                                  >
                                    <span>{appointment.status}</span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {activeTab === "billing" && (
                      <div>
                        <div className="user-table-container">
                          <table className="user-table">
                            <thead>
                              <tr>
                                <th>Invoice No</th>
                                <th>Doctor</th>
                                <th>Amount</th>
                                <th>Paid On</th>
                              </tr>
                            </thead>
                            <tbody>
                              {billing.map((appointment, index) => (
                                <tr key={index}>
                                  <td>{appointment.id}</td>
                                  <td>
                                    <div className="d-flex">
                                      <img
                                        src={appointment.created.image}
                                        alt="Doctor"
                                        className="doctor-image"
                                      />
                                      <div>
                                        <h4>{appointment.created.name}</h4>
                                        <p className="mb-0">
                                          {appointment.created.speciality}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td>{appointment.amount}</td>
                                  <td>{appointment.date}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
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

export default PatientDashboard;
