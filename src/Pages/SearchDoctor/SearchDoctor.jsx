// SearchDoctor.js
import React, { useState, useEffect } from "react";
import "./SearchDoctor.css";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { listDoctors } from "./../../Redux/Actions/DoctorActions";
import Loading from "../../Components/Loading/Loading";
import LazyLoading from "../../Components/Loading/LazyLoading";
import SidebarDoctor from "../../Components/SidebarDoctor/SidebarDoctor";
import SearchSidebar from "../../Components/SearchSidebar/SearchSidebar";

const SearchDoctor = () => {
  // const api = axios.create({
  //   baseURL: process.env.REACT_APP_API_URL, // Replace with your environment variable name
  // });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sort, setSort] = React.useState("");
  const [gender, setGender] = useState("");
  const [maxPrice, setMaxPrice] = React.useState("");
  const [minPrice, setMinPrice] = React.useState("");
  const [keyword, setKeyword] = React.useState("");
  const [isFiltered, setIsFiltered] = React.useState(false);
  console.log(isFiltered);

  const [selectedSpecialties, setSelectedSpecialties] = useState([]);

  const doctorList = useSelector((state) => state.doctorList);
  const { doctors, loading, error } = doctorList;
  console.log(doctors?.doctors);

  React.useEffect(() => {
    if (
      sort ||
      gender ||
      selectedSpecialties.length > 0 ||
      maxPrice ||
      minPrice ||
      keyword
    ) {
      setIsFiltered(true);
    } else {
      setIsFiltered(false);
    }
    dispatch(
      listDoctors({
        sort,
        gender,
        maxPrice,
        minPrice,
        keyword,
        specializations: selectedSpecialties.join(","),
      })
    );
  }, [
    dispatch,
    sort,
    gender,
    maxPrice,
    minPrice,
    keyword,
    selectedSpecialties,
  ]);

  const pageHandler = (page) => {
    dispatch(
      listDoctors({
        gender,
        keyword,
        sort,
        specializations: selectedSpecialties.join(","),
        maxPrice,
        minPrice,

        page,
      })
    );
  };

  const handleRadioChange = (event) => {
    setGender(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setSelectedSpecialties([...selectedSpecialties, name]);
    } else {
      setSelectedSpecialties(
        selectedSpecialties.filter((spec) => spec !== name)
      );
    }
  };

  const handleClear = () => {
    setMaxPrice("");
    setMinPrice("");
    setGender("");
    setSort("");
    setIsFiltered(false);
    setSelectedSpecialties([]);
    dispatch(listDoctors({}));
  };
  console.log(gender);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  return (
    <>
      <div className="strip-wrapper py-2">
        <div className="container">
          <div className="doctor-strip">
            <h2>Search Doctor</h2>
            <p>Home / Search</p>
          </div>
        </div>
      </div>
      <div className="search-doctor-wrapper py-5">
        <div className="container">
          <div className="search-doctor">
            <SearchSidebar
              sidebarVisible={sidebarVisible}
              setSidebarVisible={setSidebarVisible}
            />
            <div className="sidebar d-md-block d-none">
              <div className="search-filter">
                <p className="mb-0">Search Filter</p>
              </div>
              <div className="p-4">
                <div className="input-date">
                  <input
                    type=""
                    className="form-control"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value.trim())}
                    placeholder="Search Doctor"
                  />
                </div>

                <div className="checkbox-group mt-4">
                  <h3>Gender</h3>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={gender === "Male"}
                      onChange={handleRadioChange}
                    />
                    <span className="radio-label-gap">Male</span>
                  </label>
                  <br />
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={gender === "Female"}
                      onChange={handleRadioChange}
                    />
                    <span className="radio-label-gap">Female</span>
                  </label>

                  <br />
                </div>
                <h3 className="sub-title mt-4">Price</h3>
                <div className="d-flex align-items-center gap-2">
                  <div class="form-floating mb-3">
                    <input
                      type="number"
                      min={0}
                      class="form-control"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      id="floatingInput"
                      placeholder="name@example.com"
                    />
                    <label for="floatingInput">From</label>
                  </div>
                  <div class="form-floating mb-3">
                    <input
                      type="number"
                      min={0}
                      class="form-control"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      id="floatingInput"
                      placeholder="$"
                    />
                    <label for="floatingInput">To</label>
                  </div>
                </div>
                <div className="you align-items-center mt-4 gap-10 sort">
                  <h3 className="mb-2 " style={{ width: "100px" }}>
                    Sort By
                  </h3>
                  <select
                    class="form-control form-select"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="firstName">Alphabetical, A-Z</option>
                    <option value="-firstName">Alphabetical, Z-A</option>
                    <option value="pricing">Price, low to high</option>
                    <option value="-pricing">Price, high to low</option>
                  </select>
                </div>
                <div className="checkbox-group mt-4">
                  <h3 className="mb-3">Select Specialist</h3>
                  <label>
                    <input
                      type="checkbox"
                      name="Dermatology"
                      onChange={handleCheckboxChange}
                      checked={selectedSpecialties.includes("Dermatology")}
                    />
                    Dermatology
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      name="Orthodontics"
                      onChange={handleCheckboxChange}
                      checked={selectedSpecialties.includes("Orthodontics")}
                    />
                    Orthodontics
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      name="dentist"
                      onChange={handleCheckboxChange}
                      checked={selectedSpecialties.includes("dentist")}
                    />
                    Dentist
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      name="cardiologist"
                      onChange={handleCheckboxChange}
                      checked={selectedSpecialties.includes("cardiologist")}
                    />
                    Cardiologist
                  </label>
                  <br />
                </div>
                <button
                  className="clear-filters"
                  onClick={handleClear}
                  disabled={!isFiltered}
                >
                  Clear Filters
                </button>
              </div>
            </div>
            <div className="main">
              <span
                class="material-symbols-outlined open-button d-md-none d-block mb-3"
                onClick={toggleSidebar}
              >
                menu_open
              </span>
              <>
                {loading ? (
                  <LazyLoading />
                ) : (
                  <>
                    <div>
                      {doctors?.doctors?.map((doctor) => (
                        <div
                          key={doctor?._id}
                          className="d-flex flex-md-row flex-column gap-3 justify-content-between doc mt-4"
                        >
                          <div className="d-flex gap-3">
                            <div className="doctor-thumb-imgg">
                              <img
                                className="img-fluid w-100 "
                                src={doctor.profileImage}
                                alt={doctor.name}
                              />
                            </div>
                            <div>
                              <h3>
                                {doctor?.firstName} {doctor?.lastName}
                              </h3>
                              <p>{doctor.qualification}</p>
                              <div className="d-flex gap-2 align-items-center">
                                <span className="material-symbols-outlined">
                                  dentistry
                                </span>
                                <h5 className="mb-0">{doctor?.field}</h5>
                              </div>
                              <ReactStars
                                count={5}
                                size={16}
                                value={5}
                                edit={false}
                                activeColor="#ffd700"
                              />
                              <div className="d-flex gap-2 align-items-center">
                                <span className="material-symbols-outlined">
                                  location_on
                                </span>
                                <h5 className="mb-0">
                                  {doctor?.location} - Get Directions
                                </h5>
                              </div>
                              <div className="d-flex align-items-center gap-2 mt-3">
                                {doctor?.clinicInfo?.clinicImages?.map(
                                  (image, index) => (
                                    <div key={index} className="feature-img">
                                      <img
                                        src={image}
                                        className="img-fluid"
                                        alt={`Feature ${index + 1}`}
                                      />
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="">
                            <div className="d-flex gap-2 align-items-center ic">
                              <span className="material-symbols-outlined">
                                thumb_up
                              </span>
                              <h5 className="mb-0">
                                {doctor?.thumbUpPercentage}
                              </h5>
                            </div>
                            <div className="d-flex gap-2 align-items-center mt-2 ic">
                              <span className="material-symbols-outlined">
                                chat_bubble
                              </span>
                              <h5 className="mb-0">
                                {doctor?.feedbackCount} Feedback
                              </h5>
                            </div>
                            <div className="d-flex gap-2 align-items-center mt-2 ic">
                              <span className="material-symbols-outlined">
                                location_on
                              </span>
                              <h5 className="mb-0">{doctor?.location}</h5>
                            </div>
                            <div className="d-flex gap-2 align-items-center mt-2 ic">
                              <span className="material-symbols-outlined">
                                payments
                              </span>
                              <h5 className="mb-0">
                                {doctor?.pricing} per hour
                              </h5>
                            </div>
                            <div className="d-flex flex-column">
                              <Link to={`/doc/${doctor?._id}`}>
                                <button className="view-profile mt-3">
                                  View Profile
                                </button>
                              </Link>
                              <Link
                                to={`/login?redirect=/booking/${doctor?._id}`}
                              >
                                <button className="book-appointment">
                                  Book
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="load-more">
                      {doctors?.pages > 1 && (
                        <nav aria-label="Page navigation example">
                          <ul className="pagination">
                            {[...Array(doctors?.pages).keys()].map((x) => {
                              console.log(x + 1);
                              const isActivePage = x + 1 === doctors?.page;
                              return (
                                <li className="page-item" key={x + 1}>
                                  <a
                                    className={`page-link ${
                                      x + 1 === doctors?.page
                                        ? "activePage"
                                        : ""
                                    }`}
                                    onClick={(e) => {
                                      window.scrollTo(0, 0);
                                      if (isActivePage) e.preventDefault();
                                      else
                                        pageHandler(Number(e.target.innerHTML));
                                    }}
                                  >
                                    {x + 1}
                                  </a>
                                </li>
                              );
                            })}
                          </ul>
                        </nav>
                      )}
                    </div>
                  </>
                )}
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchDoctor;
