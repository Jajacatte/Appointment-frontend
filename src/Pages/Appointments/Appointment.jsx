import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Appointment.css";
import DoctorSidebar from "../../Components/DoctorSidebar/DoctorSidebar";
import SidebarDoctor from "../../Components/SidebarDoctor/SidebarDoctor";

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [loadingA, setLoadingA] = useState(false);
  const [loadingC, setLoadingC] = useState(false);
  const doctorId = "6600465244b8078fb0c1435f";
  console.log(appointments);

  const userInfoString = localStorage.getItem("doctorInfo"); // Retrieve string from local storage
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null; // Parse string to object

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Replace with your environment variable name
  });

  const fetchScheduledAppointments = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
          "Content-Type": "application/json", // Adjust content type if necessary
        },
      };
      const response = await api.get(
        `/api/appointment/appointments/scheduled`,
        config
      );
      setAppointments(response.data.appointments);

    } catch (error) {
      setError(error.message);
    } finally {
      // setLoadingg(false);
    }
  };

  useEffect(() => {
    fetchScheduledAppointments();
  }, [doctorId]);

  const acceptAppointment = async (appointmentId, index) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
          "Content-Type": "application/json", // Adjust content type if necessary
        },
      };
      setLoadingA(true); // Set loading to true when accepting appointment
      await api.put(
        `/api/appointment/appointments/accept/${appointmentId}`,
        {},
        config
      );
      // Refresh appointments after accepting
      fetchScheduledAppointments();
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
      await api.put(
        `/api/appointment/appointments/cancel/${appointmentId}`,
        {},
        config
      );
      // Refresh appointments after cancelling
      fetchScheduledAppointments();
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    } finally {
      setLoadingC(false); // Set loading to false after cancelling or error
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
          item="appointment"
          sidebarVisible={sidebarVisible}
          setSidebarVisible={setSidebarVisible}
        />
        <div className="container">
          <div className="doctor-strip">
            <h2>Appointments</h2>
            <p>Home / Appointments</p>
          </div>
        </div>
      </div>
      <div className="appt-wrapper">
        <div className="container">
          <div className="appt">
            <DoctorSidebar item="appointment" />
            <div className="main">
              <span
                class="material-symbols-outlined open-button d-md-none d-block mb-3"
                onClick={toggleSidebar}
              >
                menu_open
              </span>
              <div className="appt-main row px-4">
                {appointments.length === 0 ? (
                  <div className="no-appointments">No appointments</div>
                ) : (
                  appointments.map((appointment) => (
                    <div 
                      className="d-flex col-12 align-items-center justify-content-between appt-cont px-4 py-4"
                      key={appointment._id}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <div className="p-img">
                          <img
                            className="img-fluid"
                            src={appointment.patient.profileImage}
                            alt="Profile"
                          />
                        </div>
                        <div>
                          <h3>
                            {appointment.patient.firstName}{" "}
                            {appointment.patient.lastName}
                          </h3>
                          <div className="d-flex gap-2 align-items-center">
                            <span className="material-icons span1">
                              schedule
                            </span>
                            <p className="mb-0">14 Nov 2023, 10.00 AM</p>
                          </div>
                          <div className="d-flex gap-2 align-items-center">
                            <span className="material-icons span1">
                              location_on
                            </span>
                            <p className="mb-0">
                              Edo, Benin City
                            </p>
                          </div>
                          <div className="d-flex gap-2 align-items-center">
                            <span className="material-icons span1">email</span>
                            <p className="mb-0">{appointment.patient.email}</p>
                          </div>
                          <div className="d-flex gap-2 align-items-center">
                            <span className="material-icons span1">call</span>
                            <p className="mb-0">08077194667</p>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex gap-2 balign-items-center">
                        {appointment.status === "scheduled" && (
                          <div
                            className="d-flex gap-1 align-items-center doc-icon1 px-2 py-1"
                            onClick={() => acceptAppointment(appointment._id)}
                            style={{ cursor: "pointer" }}
                          >
                            <span class="material-icons">done</span>
                            <span
                              className="mb-0"
                              style={{
                                cursor: loadingA ? "not-allowed" : "pointer",
                              }}
                            >
                              {loadingA ? "Processing" : "Accept"}
                            </span>
                          </div>
                        )}
                        {appointment.status === "scheduled" && (
                          <div
                            className="d-flex align-items-center doc-icon2 px-2 py-1"
                            onClick={() => cancelAppointment(appointment._id)}
                            style={{ cursor: "pointer" }}
                          >
                            <span class="material-icons">close</span>
                            <span
                              className="mb-0"
                              style={{
                                cursor: loadingC ? "not-allowed" : "pointer",
                              }}
                            >
                              {loadingC ? "Processing..." : "Cancel"}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointment;
