import React from "react";
import "./PatientSidebar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getPatient, logout } from "../../Redux/Actions/PatientActions";
const PatientSidebar = ({ item }) => {
  const dispatch = useDispatch();
  const patientProfile = useSelector((state) => state.patientProfile);
  const { patient, loading, error } = patientProfile;
  console.log(patient);
  // Assuming patient?.dob is "1985-07-10T00:00:00.000Z"
  const dob = new Date(patient?.dob);
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
    dispatch(getPatient());
  }, [dispatch]);

    const handleLogout = () => {
      dispatch(logout());
    };
  return (
    <>
      <div className="sidebar d-md-block d-none">
        <div className="d-flex align-items-center flex-column justify-content-center p-top">
          <div className="p-profile-img">
            <img className="img-fluid" src={patient?.profileImage} />
          </div>
          <h3>
            {patient?.firstName} {patient?.lastName}
          </h3>
          <div className="d-flex align-items-center ic">
            <span class="material-symbols-outlined">cake</span>

            <p className="mb-0">
              {formattedDate}, {age}
            </p>
          </div>
          <div className="d-flex align-items-center ic">
            <span class="material-symbols-outlined">location_on</span>
            <p className="mb-0">Newyork, USA</p>
          </div>
        </div>
        <Link
          to={"/patient-dashboard"}
          className={`d-flex align-items-center p-3 p-down ${
            item === "dashboard" ? "active" : ""
          }`}
        >
          <span className="material-symbols-outlined">dashboard_customize</span>
          <h3 className="mb-0">Dashboard</h3>
        </Link>

        <Link
          to={"/favorite"}
          className={`d-flex align-items-center p-3 p-down ${
            item === "favorite" ? "active" : ""
          }`}
        >
          <span class="material-symbols-outlined">bookmark</span>
          <h3 className="mb-0">Favorites</h3>
        </Link>
        <Link
          to={"/med"}
          className={`d-flex align-items-center p-3 p-down ${
            item === "med" ? "active" : ""
          }`}
        >
          <span class="material-symbols-outlined">monitor_heart</span>
          <h3 className="mb-0">Medical Details</h3>
        </Link>
        <Link
          to={"/profile-setting"}
          className={`d-flex align-items-center p-3 p-down ${
            item === "profile-setting" ? "active" : ""
          }`}
        >
          <span class="material-symbols-outlined">manage_accounts</span>
          <h3 className="mb-0">Profile Settings</h3>
        </Link>
        {/* <Link
          to={"/password"}
          className={`d-flex align-items-center p-3 p-down ${
            item === "patient-password" ? "active" : ""
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
    </>
  );
};

export default PatientSidebar;
