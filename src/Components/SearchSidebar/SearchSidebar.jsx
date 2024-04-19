
import React, { useState, useEffect } from "react";
import "./SearchSidebar.css";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { listDoctors } from "./../../Redux/Actions/DoctorActions";
import Loading from "../../Components/Loading/Loading";
import LazyLoading from "../../Components/Loading/LazyLoading";

// import { getPatient } from "../../Redux/Actions/PatientActions";
const SearchSidebar = ({ item, sidebarVisible, setSidebarVisible }) => {
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
 }, [dispatch, sort, gender, maxPrice, minPrice, keyword, selectedSpecialties]);

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
    
  const closeSidebar = () => {
    setSidebarVisible(false);
    console.log("hy");
  };

  return (
    <>
      <div className={sidebarVisible ? "sidebar-main open " : "sidebar-main"}>
        <div className="sidebar-cont">
          <span class="material-symbols-outlined close" onClick={closeSidebar}>
            close
          </span>

          <div className="sidebar">
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
        </div>
      </div>
    </>
  );
};

export default SearchSidebar;
