import React, { useState, useEffect, useRef } from "react";
import "./DoctorProfile.css";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { getDoctor } from "../../Redux/Actions/DoctorActions";
import { bookmarkDoctor, getPatient } from "../../Redux/Actions/PatientActions";
import { Link } from 'react-router-dom';

const DoctorProfile = () => {
  
  const id = window.location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const singleDoctors = useSelector((state) => state.singleDoctors);
  const { doctor } = singleDoctors;
  console.log(doctor);
  useEffect(() => {
    dispatch(getDoctor(id));
  }, [dispatch, id]);



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

  const [activeTab, setActiveTab] = useState("overview");
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


    React.useEffect(() => {
      dispatch(getPatient());
    }, [dispatch]);

  const [like, setLike] = React.useState();
  const [isLiked, setIsLiked] = React.useState(false);

React.useEffect(() => {
  setIsLiked(
    patient?.bookmarks?.some((bookmark) => bookmark._id === doctor?._id)
  );
}, [doctor?._id, patient?.bookmarks]);

  const handleBookmark = (id) => {
    dispatch(bookmarkDoctor(id))
     setIsLiked(!isLiked);
  }
  return (
    <>
      <div className="strip-wrapper py-2">
        <div className="container">
          <div className="doctor-strip">
            <h2>Doctor Profile</h2>
            <p>Home / Doctor Profile</p>
          </div>
        </div>
      </div>
      <div className="doctor-profile-wrapper py-5">
        <div className="container">
          <div className="d-flex  flex-md-row flex-column gap-3 justify-content-between doc">
            <div className="d-flex gap-3">
              <div className="doctor-thumb-img">
                <img className="img-fluid" src={doctor?.profileImage} />
              </div>
              <div>
                <h3>
                  Dr. {doctor?.firstName} {doctor?.lastName}
                </h3>
                <p>BDS, MDS - Oral & Maxillofacial Surger</p>
                <div className="d-flex align-items-center">
                  <span class="material-symbols-outlined span1">dentistry</span>
                  <h5 className="mb-0">{doctor?.field}</h5>
                </div>
                <ReactStars
                  count={5}
                  size={16}
                  value={4.5}
                  edit={false}
                  activeColor="#ffd700"
                />
                <div className="d-flex align-items-center">
                  <span class="material-symbols-outlined span1">
                    location_on
                  </span>
                  <h5 className="mb-0">{doctor?.location}</h5>
                </div>
                <div className="d-flex align-items-center gap-2 mt-3">
                  <div className="feature-img">
                    <img src="/images/feature-01.jpg" className="img-fluid" />
                  </div>
                  <div className="feature-img">
                    <img src="/images/feature-02.jpg" className="img-fluid" />
                  </div>
                  <div className="feature-img">
                    <img src="/images/feature-03.jpg" className="img-fluid" />
                  </div>
                  <div className="feature-img">
                    <img src="/images/feature-04.jpg" className="img-fluid" />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="d-flex gap-2 align-items-center ic">
                <span class="material-symbols-outlined">thumb_up</span>
                <h5 className="mb-0">99%</h5>
              </div>
              <div className="d-flex gap-2 align-items-center mt-2 ic">
                <span class="material-symbols-outlined">chat_bubble</span>
                <h5 className="mb-0">35 Feedback</h5>
              </div>
              <div className="d-flex gap-2 align-items-center mt-2 ic">
                <span class="material-symbols-outlined">location_on</span>
                <h5 className="mb-0"> Newyork, USA</h5>
              </div>
              <div className="d-flex gap-2 align-items-center mt-2 ic">
                <span class="material-symbols-outlined">payments</span>
                <h5 className="mb-0">$100 per hour</h5>
              </div>
              <div className="d-flex gap-3 mt-4">
                {isLiked ? (
                  <div
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                    }}
                    className="act"
                    onClick={() => handleBookmark(doctor?._id)}
                  >
                    <span class="material-symbols-outlined">bookmark</span>
                  </div>
                ) : (
                  <div
                    className="act"
                    onClick={() => handleBookmark(doctor?._id)}
                  >
                    <span class="material-symbols-outlined">bookmark</span>
                  </div>
                )}

                <div className="act">
                  <span class="material-symbols-outlined">chat_bubble</span>
                </div>
                <div className="act">
                  <span class="material-symbols-outlined">call</span>
                </div>
                <div className="act">
                  <span class="material-symbols-outlined">videocam</span>
                </div>
              </div>
              <Link to={`/login?redirect=/booking/${doctor?._id}`}>
                <button className="book-appointment">Book Appointment</button>
              </Link>
            </div>
          </div>
          <div className="tabs-main">
            <div className="tabs" ref={tabsRef}>
              <button
                className={activeTab === "overview" ? "active" : ""}
                onClick={(e) => handleTabClick("overview", e)}
                onMouseEnter={handleTabHover}
                onMouseLeave={handleTabLeave}
              >
                Overview
              </button>
              <button
                className={activeTab === "location" ? "active" : ""}
                onClick={(e) => handleTabClick("location", e)}
                onMouseEnter={handleTabHover}
                onMouseLeave={handleTabLeave}
              >
                Locations
              </button>
              <button
                className={activeTab === "reviews" ? "active" : ""}
                onClick={(e) => handleTabClick("reviews", e)}
                onMouseEnter={handleTabHover}
                onMouseLeave={handleTabLeave}
              >
                Reviews
              </button>
              <button
                className={activeTab === "businesshours" ? "active" : ""}
                onClick={(e) => handleTabClick("businesshours", e)}
                onMouseEnter={handleTabHover}
                onMouseLeave={handleTabLeave}
              >
                Business Hours
              </button>
              <div className="line" style={lineStyle}></div>
              <div className="line2" style={lineStyle2}></div>
            </div>
            <div className="content">
              {activeTab === "overview" && (
                <div className="overview">
                  <h3>About Me</h3>
                  <p>{doctor?.aboutMe}</p>
                  <div className="education">
                    <h2>Education</h2>
                    {doctor?.education?.map((item, index) => (
                      <div key={index} className="education-item mt-4">
                        <div className="">
                          <div className="d-flex ">
                            <div className="bullet">•</div>
                            <div className="z">
                              <h4>{item.college}</h4>

                              <h5>{item.degree}</h5>

                              <h5 className="mb-0">{item.year}</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="education">
                    <h2>Work & Experience</h2>
                    {doctor?.experience?.map((item, index) => (
                      <div key={index} className="education-item mt-4">
                        <div className="">
                          <div className="d-flex">
                            <div className="bullet">•</div>
                            <div className="z">
                              <h4>{item.organization}</h4>
                              <h5>{item.designation}</h5>
                              <h5 className="mb-0">
                                {new Date(item.from).getFullYear()} -{" "}
                                {new Date(item.to).getFullYear()}
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="education">
                    <h2>Awards</h2>
                    {doctor?.awards?.map((item, index) => (
                      <div key={index} className="education-item mt-4">
                        <div className="">
                          <div className="d-flex">
                            <div className="bullet">•</div>
                            <div className="Z">
                              <h4>{item.name}</h4>

                              <h5>{item.details}</h5>

                              <h5 className="mb-0">{item.year}</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 sp">
                    <h2>Services</h2>
                    <div className="services-main">
                      {doctor?.services?.map((item, index) => (
                        <div className="serve">
                          <span class="material-symbols-outlined">
                            line_end_diamond
                          </span>
                          <p>{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 sp">
                    <h2>Specializations</h2>
                    <div className="services-main">
                      {doctor?.services?.map((item) => (
                        <div className="serve">
                          <span class="material-symbols-outlined">
                            line_end_diamond
                          </span>
                          <p>{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            
              {activeTab === "businesshours" && (
                <div className="schedule">
                  <div className="today d-flex align-items-center justify-content-between py-3">
                    <div>
                      <h3 className="mb-2 t">Today</h3>
                      <h4 className="mb-0">14th July 2024</h4>
                    </div>
                    <div>
                      <h3 className="mb-0 open-now">Open now</h3>
                      <h4 className="mb-0">7:00AM - 9:00PM</h4>
                    </div>
                  </div>
                  {doctor?.businessHours.map((item, index) => (
                    <div className="d-flex justify-content-between mt-3">
                      <h3 className="mb-0">{item?.day}</h3>
                      <h4 className="mb-0">
                        {item?.startTime} - {item?.endTime}
                      </h4>
                      {item?.startTime === null && item?.endTime === null && (
                        <h5 className="mb-0 closed">Closed</h5>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "location" && (
                <div>
                  <div className="d-flex justify-content-between gap-3 bbb">
                    <div className="d-flex gap-3">
                      <div>
                        <h3>{doctor?.clinicInfo.name}</h3>
                        <p className="mb-0">{doctor?.clinicInfo.title}</p>

                        <ReactStars
                          count={5}
                          size={16}
                          value={doctor.clinicInfo.ratings}
                          edit={false}
                          activeColor="#ffd700"
                        />
                        <div className="d-flex align-items-center">
                          <span class="material-symbols-outlined span1">
                            location_on
                          </span>
                          <h5 className="mb-0">
                            {doctor.clinicInfo.address?.city},{" "}
                            {doctor.clinicInfo.address?.country}
                          </h5>
                        </div>
                        <div className="d-flex align-items-center gap-2 mt-3">
                          <div className="feature-img">
                            <img
                              src="/images/feature-01.jpg"
                              className="img-fluid"
                            />
                          </div>
                          <div className="feature-img">
                            <img
                              src="/images/feature-02.jpg"
                              className="img-fluid"
                            />
                          </div>
                          <div className="feature-img">
                            <img
                              src="/images/feature-03.jpg"
                              className="img-fluid"
                            />
                          </div>
                          <div className="feature-img">
                            <img
                              src="/images/feature-04.jpg"
                              className="img-fluid"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="y">
                      <div>
                        <h4>Mon - Sat</h4>
                        <p>10:00AM - 2:00PM</p>
                        <p>4:00PM - 9:00PM</p>
                      </div>
                      <div className="mt-2">
                        <h4>Mon - Sat</h4>
                        <p>10:00AM - 2:00PM</p>
                        <p>4:00PM - 9:00PM</p>
                      </div>
                    </div>
                    <h4 className="doc-price">${doctor.clinicInfo.price}</h4>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorProfile;
