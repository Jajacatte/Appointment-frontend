import React from "react";
import "./SidebarDoctor.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorDetails, logoutt } from "../../Redux/Actions/DoctorActions";


// import { getPatient } from "../../Redux/Actions/PatientActions";
const SidebarDoctor = ({ item, sidebarVisible, setSidebarVisible }) => {
  const dispatch = useDispatch();
  const doctorDetail = useSelector((state) => state.doctorDetail);
  const { doctor, loading, error } = doctorDetail;
  console.log(doctor);
  const dob = new Date(doctor?.dateOfBirth);
  const options = { year: "numeric", month: "short", day: "2-digit" };

  // Format date to "24 Jul 1983"
  const formattedDate = dob.toLocaleDateString("en-GB", options);

  // Calculate age
  let today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  // Adjust age if birthday hasn't occurred yet this year
  if (
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
  ) {
    age--;
  }

  // Display formatted date and age
  console.log(formattedDate); // Output: "10 Jul 1985"
  console.log(age); // Output: 38

  React.useEffect(() => {
    dispatch(getDoctorDetails());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutt());
  };
  const closeSidebar = () => {
    setSidebarVisible(false);
  
  };

  return (
    <>
      <div className={sidebarVisible ? "sidebar-main open " : "sidebar-main"}>
        <div className="sidebar-cont">
          <span class="material-symbols-outlined close" onClick={closeSidebar}>
            close
          </span>

          <div className="sidebar">
            <div className="d-flex align-items-center flex-column justify-content-center p-top">
              <div className="p-profile-img">
                <img className="img-fluid" src={doctor?.profileImage} />
              </div>
              <h3>
                Dr {doctor?.firstName} {doctor?.lastName}{" "}
              </h3>
              <div className="d-flex align-items-center ic">
                <span class="material-symbols-outlined">cake</span>
                <p className="mb-0">
                  {formattedDate}, {age}
                </p>
              </div>
              <div className="d-flex align-items-center ic">
                <span class="material-symbols-outlined">location_on</span>
                <p className="mb-0">{doctor?.location}</p>
              </div>
            </div>
            <Link
              to={"/doctor"}
              className={`d-flex align-items-center p-3 p-down ${
                item === "doctor" ? "active" : ""
              }`}
            >
              <span class="material-symbols-outlined">dashboard_customize</span>
              <h3 className="mb-0">Dashboard</h3>
            </Link>
            <Link
              to={"/appointments"}
              className={`d-flex align-items-center p-3 p-down ${
                item === "appointment" ? "active" : ""
              }`}
            >
              <span class="material-symbols-outlined">bookmark</span>
              <h3 className="mb-0">Appointments</h3>
            </Link>
            <Link
              to={"/patients"}
              className={`d-flex align-items-center p-3 p-down ${
                item === "patient" ? "active" : ""
              }`}
            >
              <span class="material-symbols-outlined">monitor_heart</span>
              <h3 className="mb-0">My Patients</h3>
            </Link>

            <Link
              to={"/doc-profile-settings"}
              className={`d-flex align-items-center p-3 p-down ${
                item === "doc-profile-setting" ? "active" : ""
              }`}
            >
              <span class="material-symbols-outlined">lock</span>
              <h3 className="mb-0">Profile Settings</h3>
            </Link>
            {/* <Link
          to={"/doc-password"}
          className={`d-flex align-items-center p-3 p-down ${
            item === "doc-password" ? "active" : ""
          }`}
        >
          <span class="material-symbols-outlined">lock</span>
          <h3 className="mb-0">Change Password</h3>
        </Link> */}
            <div
              className="d-flex align-items-center p-3 p-down"
              onClick={handleLogout}
            >
              <span class="material-symbols-outlined">logout</span>
              <h3 className="mb-0">Logout</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarDoctor;
