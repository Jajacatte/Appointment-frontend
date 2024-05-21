import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getDoctor, getDoctorDetails } from "../../Redux/Actions/DoctorActions";
import "./Booking.css"; // Import CSS file for styling
import Loading from "../../Components/Loading/Loading";
import Message from "../../Loading/Error/Error";

const BookAppointment = () => {

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Replace with your environment variable name
  });

  const dispatch = useDispatch();
  const id = window.location.pathname.split("/")[2];
  const singleDoctors = useSelector((state) => state.singleDoctors);
  const { doctor } = singleDoctors;
  // console.log(doctor);
  useEffect(() => {
    dispatch(getDoctor(id));
  }, [dispatch, id]);

  // console.log(id);

  const userInfoString = localStorage.getItem("patientInfo"); // Retrieve string from local storage
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null; // Parse string to object
  console.log("TOKENNNNNNNN");

  const [date, setDate] = useState(null); // Changed initial date state to null
  const [bookedAppointments, setBookedAppointments] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
     const [error, setError] = useState("");
  const [doctorId, setDoctorId] = useState(id);
  const [isLoading, setIsLoading] = useState(false);
 
  const [appointmentDetails, setAppointmentDetails] = useState({
    doctorId: "",
    date: "",
    time: "",
    status: "scheduled",
  });

  useEffect(() => {
    dispatch(getDoctorDetails());
  }, [dispatch]);

  useEffect(() => {
    setDoctorId(id);
  }, [doctor]);

  useEffect(() => {
    if (date) {
      fetchBookedAppointments();
    }
  }, [date]); // Fetch booked appointments when date changes

  useEffect(() => {
    setAppointmentDetails({
      ...appointmentDetails,
      doctorId: doctorId,
    });
  }, [doctorId]); // Update appointment details when doctorId changes

  const fetchBookedAppointments = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
          "Content-Type": "application/json", // Adjust content type if necessary
        },
      };
      const response = await api.get(
        `/api/appointment/booked-appointments/${doctorId}?date=${moment(
          date
        ).format("YYYY-MM-DD")}`,
        config
      );
      console.log(response.data.bookedAppointments);
      setBookedAppointments(response.data.bookedAppointments);
    } catch (error) {
      console.error("Error fetching booked appointments:", error);
    }
  };

  const isDateDisabled = (date) => {
    const selectedDay = moment(date).format("dddd").toLowerCase();
    return (
      doctor?.clinicInfo?.timings &&
      (doctor?.clinicInfo?.timings[selectedDay] === "Closed" ||
        bookedAppointments.some(
          (appointment) =>
            moment(appointment.date).isSame(date, "day") &&
            moment(appointment.time, "h:mm A").isSame(
              moment(selectedTime, "h:mm A")
            )
        ))
    );
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setSelectedTime(""); // Reset selected time when date changes
    setBookingStatus("");
    setAppointmentDetails({
      ...appointmentDetails,
      date: moment(newDate).format("YYYY-MM-DD"),
    });
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
    setBookingStatus("available");
    setAppointmentDetails({ ...appointmentDetails, time });
  };

  const handleBooking = async () => {
    try {
      setIsLoading(true); // Set loading to true when booking request starts
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
          "Content-Type": "application/json", // Adjust content type if necessary
        },
      };
      const response = await api.post(
        "/api/appointment/book-appointment",
        appointmentDetails,
        config
      );
      setBookingStatus("success");
      // Update booked appointments after successful booking
      fetchBookedAppointments();
    } catch (error) {
    
      setBookingStatus("error");
        console.error("Error booking appointment:", error);
        setError(error);
    } finally {
      setIsLoading(false); // Set loading to false when booking request completes
    }
  };

  return (
    <div className="appointment-container">
      <h2 className="title">Book Appointment</h2>
      <div className="calendar-container">
        <Calendar
          onChange={handleDateChange}
          value={date}
          tileDisabled={({ date }) => isDateDisabled(date)}
          tileClassName={({ date }) =>
            bookedAppointments.some(
              (appointment) =>
                moment(appointment.date).isSame(date, "day") &&
                moment(appointment.time, "h:mm A").isSame(
                  moment(selectedTime, "h:mm A")
                )
            )
              ? "booked-date"
              : ""
          }
        />
      </div>
      <div className="time-container">
        <h3 className="subtitle">Select a Time:</h3>
        {date && ( // Render time list only if date is selected
          <ul>
            {doctor &&
              doctor.clinicInfo &&
              doctor.clinicInfo.timings &&
              Object.entries(doctor.clinicInfo.timings).map(([day, time]) => (
                <li
                  key={day}
                  onClick={() => {
                    if (time !== "Closed" && !isDateDisabled(date)) {
                      handleTimeClick(time);
                    }
                  }}
                  className={`time-item ${
                    time === "Closed" || isDateDisabled(date)
                      ? "disabled"
                      : "enabled"
                  }`}
                >
                  {day}: {time}
                </li>
              ))}
          </ul>
        )}
      </div>
      <div className="status-container">
        {bookingStatus === "unavailable" && (
          <p className="status-message">
            Selected time is closed. Please choose another time.
          </p>
        )}
        {bookingStatus === "available" && (
          <button
            className="book-button"
            onClick={handleBooking}
            disabled={isLoading} // Disable button when isLoading is true
          >
            {isLoading ? "Booking..." : `Book Appointment for ${selectedTime}`}
          </button>
        )}

        {bookingStatus === "success" && (
          <p
            className="status-message"
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            Appointment booked successfully!
          </p>
        )}
        {bookingStatus === "error" && (
          <p className="error">{error.response.data.message}</p>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;
