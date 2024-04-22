import React, { useState, useEffect, useRef } from "react";
import "./PatientFavorite.css";
import ReactStars from "react-rating-stars-component";
import PatientSidebar from "../../Components/PatientSidebar/PatientSidebar";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getPatient } from "../../Redux/Actions/PatientActions";
import { Link } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
const PatientFavorite = () => {
  const dispatch = useDispatch();
  const patientProfile = useSelector((state) => state.patientProfile);
  const { patient, loading, error } = patientProfile;
  console.log(patient);

  React.useEffect(() => {
    dispatch(getPatient());
  }, [dispatch]);

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  return (
    <>
      <div className="strip-wrapper py-2">
        <Sidebar
          item="favorite"
          sidebarVisible={sidebarVisible}
          setSidebarVisible={setSidebarVisible}
        />
        <div className="container">
          <div className="doctor-strip">
            <h2>Favorites</h2>
            <p>Home / Favorites</p>
          </div>
        </div>
      </div>
      <div className="favorite-wrapper">
        <div className="container">
          <div className="fav-doc">
            <PatientSidebar item="favorite" />
            <div className="main px-3">
              <span
                class="material-symbols-outlined open-button d-md-none d-block mb-3"
                onClick={toggleSidebar}
              >
                menu_open
              </span>
              <div className="row">
                {patient?.bookmarks?.map((doc, idx) => (
                  <div className="col-lg-4 col-md-6 col-12">
                    <div className="x p-3">
                      <img
                        className="img-fluid w-100"
                        src={doc?.profileImage}
                      />
                      <div className="mt-3">
                        <div className="d-flex align-items-center gap-2">
                          <h3 className="mb-0">
                            Dr. {doc?.firstName} {doc?.lastName}
                          </h3>
                          <span class="material-icons span1">verified</span>
                        </div>
                        <p className="mb-0">{doc?.field}</p>
                        <ReactStars
                          count={5}
                          size={18}
                          value={4.5}
                          edit={false}
                          activeColor="#ffd700"
                        />
                        <div className="d-flex align-items-center mt-2 ic">
                          <span class="material-symbols-outlined">
                            chat_bubble
                          </span>
                          <h5 className="mb-0">35 Feedback</h5>
                        </div>
                        <div className="d-flex align-items-center mt-2 ic">
                          <span class="material-symbols-outlined">
                            location_on
                          </span>
                          <h5 className="mb-0">{doc?.location}</h5>
                        </div>
                        <div className="d-flex align-items-center mt-2 ic">
                          <span class="material-symbols-outlined">
                            payments
                          </span>
                          <h5 className="mb-0">${doc?.pricing}</h5>
                        </div>
                        <div className=" mt-2 but">
                          <Link to={`/doc/${doc?._id}`}>
                            <button className="view-profile1">
                              View Profile
                            </button>
                          </Link>
                          <Link to={`/booking/${doc?._id}`}>
                            <button className="book1">Book Now</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientFavorite;
