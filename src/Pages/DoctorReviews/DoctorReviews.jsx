import React, { useState, useEffect, useRef } from "react";
import "./DoctorReviews.css";
import ReactStars from "react-rating-stars-component";

const DoctorReviews = () => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5); // Default rating
  const MAX_CHARACTERS = 120;

  const handleReviewTextChange = (event) => {
    const text = event.target.value;
    if (text.length <= MAX_CHARACTERS) {
      setReviewText(text);
    }
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };    
  return (
    <div>
      <div className="strip-wrapper py-2">
        <div className="container">
          <div className="doctor-strip">
            <h2>Reviews</h2>
            <p>Home / Reviews</p>
          </div>
        </div>
      </div>
      <div className="doc-reviews-wrapper">
        <div className="container">
          <div className="doc-reviews">
            <div className="sidebar">
              <div className="d-flex align-items-center flex-column justify-content-center p-top">
                <div className="p-profile-img">
                  <img
                    className="img-fluid"
                    src="/images/doctor-thumb-02.jpg"
                  />
                </div>
                <h3>Richard Wilson</h3>
                <div className="d-flex align-items-center ic">
                  <span class="material-symbols-outlined">cake</span>
                  <p className="mb-0">24 Jul 1983, 38 years</p>
                </div>
                <div className="d-flex align-items-center ic">
                  <span class="material-symbols-outlined">location_on</span>
                  <p className="mb-0">Newyork, USA</p>
                </div>
              </div>
              <div className="d-flex align-items-center p-3 p-down active">
                <span class="material-symbols-outlined">
                  dashboard_customize
                </span>
                <h3 className="mb-0">Dashboard</h3>
              </div>
              <div className="d-flex align-items-center p-3 p-down ">
                <span class="material-symbols-outlined">bookmark</span>
                <h3 className="mb-0">Appointments</h3>
              </div>
              <div className="d-flex align-items-center p-3 p-down">
                <span class="material-symbols-outlined">monitor_heart</span>
                <h3 className="mb-0">My Patients</h3>
              </div>
              <div className="d-flex align-items-center p-3 p-down">
                <span class="material-symbols-outlined">manage_accounts</span>
                <h3 className="mb-0">Schedule Timings</h3>
              </div>
              <div className="d-flex align-items-center p-3 p-down">
                <span class="material-symbols-outlined">lock</span>
                <h3 className="mb-0">Available Timings</h3>
              </div>
              <div className="d-flex align-items-center p-3 p-down">
                <span class="material-symbols-outlined">lock</span>
                <h3 className="mb-0">Profile Settings</h3>
              </div>
              <div className="d-flex align-items-center p-3 p-down">
                <span class="material-symbols-outlined">lock</span>
                <h3 className="mb-0">Change Password</h3>
              </div>
              <div className="d-flex align-items-center p-3 p-down">
                <span class="material-symbols-outlined">logout</span>
                <h3 className="mb-0">Logout</h3>
              </div>
            </div>
            <div className="main ">
              <div className="doc-revews-main">
                <div className="px-4">
                  <div className="d-flex justify-content-between rev p-3">
                    {" "}
                    <div className="d-flex gap-3">
                      <div className="patient4-img">
                        <img className="img-fluid" src="/images/patient.jpg" />
                      </div>
                      <div>
                        <h3>Richard Wilson</h3>
                        <p>Reviewed 2 Days ago</p>
                        <div className="d-flex align-items-center like">
                          <span class="material-symbols-outlined">
                            thumb_up
                          </span>
                          <p className="mb-0">I recommend the doctor</p>
                        </div>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation. Curabitur non nulla sit amet
                          nisl tempus
                        </p>
                      </div>
                    </div>
                    <div className="star">
                      <ReactStars
                        count={5}
                        size={20}
                        value={4.5}
                        edit={false}
                        activeColor="#ffd700"
                      />
                    </div>
                  </div>
                 
               
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorReviews;
