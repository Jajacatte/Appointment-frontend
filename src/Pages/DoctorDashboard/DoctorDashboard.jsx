import React, { useState, useEffect, useRef } from "react";
import "./DoctorDashboard.css";
import DoctorSidebar from "../../Components/DoctorSidebar/DoctorSidebar";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getDoctorDetails } from "../../Redux/Actions/DoctorActions";
import axios from "axios";
import SidebarDoctor from "../../Components/SidebarDoctor/SidebarDoctor";
const DoctorDashboard = () => {
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

  const [activeTab, setActiveTab] = useState("upcoming");
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

  const doctorDetail = useSelector((state) => state.doctorDetail);
  const { doctor, loading, error } = doctorDetail;
  console.log(doctor);

  React.useEffect(() => {
    dispatch(getDoctorDetails());
  }, [dispatch]);

  const [appointmentss, setAppointmentss] = useState([]);

  const [loadingA, setLoadingA] = useState(false);
  const [loadingC, setLoadingC] = useState(false);
  const [errorr, setErrorr] = useState(null);
  const doctorId = "6600465244b8078fb0c1435f";

  const userInfoString = localStorage.getItem("doctorInfo"); // Retrieve string from local storage
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null; // Parse string to object

  console.log(appointmentss);
  const fetchAppointments = async () => {
    try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
            "Content-Type": "application/json", // Adjust content type if necessary
          },
        };
      const response = await axios.get(
        `/api/appointment/appointments/doctor`, config
      );
      console.log("APPOPO YES", response.data.appointments);
      setAppointmentss(response.data.appointments);
    } catch (error) {
      setErrorr(error.message);
    } finally {
      // setLoadingg(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [doctorId]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  const acceptAppointment = async (appointmentId, index) => {
    try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
            "Content-Type": "application/json", // Adjust content type if necessary
          },
        };
      setLoadingA(true); // Set loading to true when accepting appointment
      await axios.put(`/api/appointment/appointments/accept/${appointmentId}`, {},config);
      // Refresh appointments after accepting
      fetchAppointments();
    } catch (error) {
      console.error("Error accepting appointment:", error);
    } finally {
      setLoadingA(false); // Set loading to false after accepting or error
    }
  };

  const cancelAppointment = async (appointmentId, index) => {
    try {
       const config = {
         headers: {
           Authorization: `Bearer ${userInfo?.token}`,
           "Content-Type": "application/json", // Adjust content type if necessary
         },
       };
      setLoadingC(true); // Set loading to true when cancelling appointment
      await axios.put(`/api/appointment/appointments/cancel/${appointmentId}`, {}, config);
      // Refresh appointments after cancelling
      fetchAppointments();
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    } finally {
      setLoadingC(false); // Set loading to false after cancelling or error
    }
  };

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
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
      setSidebarVisible(!sidebarVisible);
    };
  return (
    <>
      <div className="strip-wrapper py-2">
        <SidebarDoctor
          item="doctor"
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
      <div className="doctor-dasboard-wrapper">
        <div className="container">
          <div className="doctor-dashboard">
            <DoctorSidebar item="doctor" />
            <div className="main px-3">
              <span
                class="material-symbols-outlined open-button d-md-none d-block mb-3"
                onClick={toggleSidebar}
              >
                menu_open
              </span>
              <div className="doctor-dashboardd px-3">
                <div className="d-flex doc-top py-4">
                  <div className="d-flex gap-3 align-items-center ic-cont px-3">
                    <div className="icon-img">
                      <img className="img-fluid" src="/images/icon-01.png" />
                    </div>
                    <div>
                      <h2 className="mb-0">Total Patient</h2>
                      <h3>150</h3>
                      <p className="mb-0">Till Today</p>
                    </div>
                  </div>
                  <div className="d-flex gap-3 align-items-center ic-cont px-3">
                    <div className="icon-img2">
                      <img className="img-fluid" src="/images/icon-02.png" />
                    </div>
                    <div>
                      <h2 className="mb-0">Total Patient</h2>
                      <h3>1500</h3>
                      <p className="mb-0">Till Today</p>
                    </div>
                  </div>
                  <div className="d-flex gap-3 align-items-center ic-cont px-3">
                    <div className="icon-img3">
                      <img className="img-fluid" src="/images/icon-03.png" />
                    </div>
                    <div>
                      <h2 className="mb-0">Appointments</h2>
                      <h3>{appointmentss?.length}</h3>
                      <p className="mb-0">Till Today</p>
                    </div>
                  </div>
                </div>
                <div className="tabs-main">
                  <div className="tabs" ref={tabsRef}>
                    <button
                      className={activeTab === "upcoming" ? "active" : ""}
                      onClick={(e) => handleTabClick("upcoming", e)}
                      onMouseEnter={handleTabHover}
                      onMouseLeave={handleTabLeave}
                    >
                      Upcoming
                    </button>
                    {/* <button
                      className={activeTab === "today" ? "active" : ""}
                      onClick={(e) => handleTabClick("upcoming", e)}
                      onMouseEnter={handleTabHover}
                      onMouseLeave={handleTabLeave}
                    >
                      Today
                    </button> */}

                    <div className="line" style={lineStyle}></div>
                    <div className="line2" style={lineStyle2}></div>
                  </div>
                  <div className="content">
                    {/* {activeTab === "upcoming" && (
                      <div>
                        <div className="user-table-container">
                          <table className="user-table">
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Appointment Date</th>
                                <th>Purpose</th>
                                <th>Type</th>
                                <th>Paid Amount</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {appointments.map((appointment, index) => (
                                <tr key={index}>
                                  <td>
                                    <div className="d-flex">
                                      <img
                                        src={appointment.doctor.image}
                                        alt="Doctor"
                                        className="doctor-image"
                                      />
                                      <div>
                                        <h4>{appointment.doctor.name}</h4>
                                        <p className="mb-0">
                                          {appointment.doctor.speciality}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td>{appointment.appointmentDate}</td>
                                  <td>{appointment.bookingDate}</td>
                                  <td>{appointment.amount}</td>
                                  <td>{appointment.followUp}</td>

                                  <td>
                                    <div className="d-flex gap-2 balign-items-center">
                                      <div className="d-flex gap-1 align-items-center doc-icon px-2 py-1">
                                        <span class="material-icons">
                                          visibility
                                        </span>
                                        <span className="mb-0">View</span>
                                      </div>
                                      <div className="d-flex gap-1 align-items-center doc-icon1 px-2 py-1">
                                        <span class="material-icons">done</span>
                                        <span className="mb-0">Accept</span>
                                      </div>
                                      <div className="d-flex  align-items-center doc-icon2 px-2 py-1">
                                        <span class="material-icons">
                                          close
                                        </span>
                                        <span className="mb-0">Cancel</span>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )} */}

                    {activeTab === "upcoming" && (
                      <div>
                        <div className="user-table-container">
                          <table className="user-table">
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Appointment Date</th>
                                <th>Booking Time</th>
                                <th>Status</th>

                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {appointmentss?.map((appointment, index) => (
                                <tr key={index}>
                                  <td>
                                    <div className="d-flex">
                                      <img
                                        src={appointment.patient.profileImage}
                                        alt="Doctor"
                                        className="doctor-image"
                                      />
                                      <div>
                                        <h4>
                                          {appointment.patient.firstName}
                                          {appointment.patient.lastName}
                                        </h4>
                                        <p className="mb-0">
                                          {appointment.patient.email}
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

                                  <td>
                                    <div className="d-flex gap-2 balign-items-center">
                                      {appointment.status === "scheduled" && (
                                        <div
                                          className="d-flex gap-1 align-items-center doc-icon1 px-2 py-1"
                                          onClick={() =>
                                            acceptAppointment(appointment._id)
                                          }
                                          style={{ cursor: "pointer" }}
                                        >
                                          <span class="material-icons">
                                            done
                                          </span>
                                          <span
                                            className="mb-0"
                                            style={{
                                              cursor: loadingA
                                                ? "not-allowed"
                                                : "pointer",
                                            }}
                                          >
                                            {loadingA ? "Processing" : "Accept"}
                                          </span>
                                        </div>
                                      )}
                                      {appointment.status === "scheduled" && (
                                        <div
                                          className="d-flex align-items-center doc-icon2 px-2 py-1"
                                          onClick={() =>
                                            cancelAppointment(appointment._id)
                                          }
                                          style={{ cursor: "pointer" }}
                                        >
                                          <span class="material-icons">
                                            close
                                          </span>
                                          <span
                                            className="mb-0"
                                            style={{
                                              cursor: loadingC
                                                ? "not-allowed"
                                                : "pointer",
                                            }}
                                          >
                                            {loadingC
                                              ? "Processing..."
                                              : "Cancel"}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  </td>
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

export default DoctorDashboard;
