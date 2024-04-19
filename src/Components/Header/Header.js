import React, { useState, useRef } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Header = () => {
  const listContainer = useRef(null);
  const gsContainer = useRef(null);
  const bsContainer = useRef(null);
  const list = useRef(null);
  const listNav = useRef(null);
  const btn = useRef(null);
  const sections = [
    { id: "home", label: "Home", to: "/", dropdown: null },
    {
      id: "doctors",
      label: "Doctors",
      dropdown: [
        { label: "Doctor Profile", to: "/doctor" },
        { label: "Profile Setting", to: "/doc-profile-settings" },
        { label: "Appointments", to: "/appointments" },
        { label: "Doctor Login", to: "/login" },
      ],
    },
    {
      id: "Patients",
      label: "Patients",
      dropdown: [
        { label: "Patient Profile", to: "/patient-dashboard" },
        { label: "Search Doctor", to: "/search" },
        { label: "Profile Setting", to: "/profile-setting" },
        { label: "Patient Login", to: "/login" },
      ],
    },
 
 
  ];

  const showNavbar = () => {
    const listCont = listContainer.current;
    const gsCont = gsContainer.current;
    const bsCont = bsContainer.current;

    const listt = list.current;
    const btnn = btn.current;
    const listContHeight = listCont.getBoundingClientRect().height;
    const gsContHeight = gsCont.getBoundingClientRect().height;
    const bsHeight = bsCont.getBoundingClientRect().height;

    const listHeight = listt.getBoundingClientRect().height;
    console.log(listContHeight, listHeight);
    if (listContHeight === 0) {
      listCont.style.height = `${listHeight}px`;
      gsCont.style.height = `${bsHeight}px`;
    } else {
      listCont.style.height = 0;
      gsCont.style.height = 0;
    }

    btnn.classList.toggle("active");
  };

  const location = useLocation();

  // Check if the current location pathname is the enrollment page
  const isEnrollmentPage = location.pathname === "/enrol";

  const [openDropdown, setOpenDropdown] = useState(null);
  // const listContainer = useRef(null);

  const handleDropdownToggle = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  // Function to check if the link matches the current page
  const [activePage, setActivePage] = useState("");

  // Set activePage state based on current location
  React.useEffect(() => {
    setActivePage(location.pathname);
  }, [location]);

  return (
    <>
      <div className="header-wrapper">
        <div className="container">
          <nav className="d-flex justify-content-between align-items-center py-3">
            <div className="nav-bar">
              <Link to={"/"} className="logo-img d-flex align-items-center">
                <img className="img-fluid logo-imgv" src="/images/logo.png" />
              </Link>
              <button className="btn mb-0" onClick={showNavbar} ref={btn}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
              </button>
            </div>
            <div className="list-container mb-0" ref={listContainer}>
              <ul className="list d-flex px-0" ref={list}>
                {sections.map((section) => (
                  <li
                    className="dropdown"
                    key={section.id}
                    onMouseLeave={handleMouseLeave}
                  >
                    {section.dropdown !== null ? (
                      <Link
                        to={section.to}
                        onMouseOver={() => handleDropdownToggle(section.id)}
                        className={`link-with-arrow${
                          section.to === activePage ? " active" : ""
                        } d-none d-md-flex`}
                        // Apply the class conditionally based on activePage
                      >
                        {section.label}
                        {openDropdown === section.id ? (
                          <span className="material-symbols-outlined">
                            arrow_drop_down
                          </span>
                        ) : (
                          <span className="material-symbols-outlined">
                            arrow_drop_up
                          </span>
                        )}
                      </Link>
                    ) : (
                      <Link
                        to={section.to}
                        className={`link-with-arrow${
                          section.to === activePage ? " active" : ""
                        }`}
                        // Apply the class conditionally based on activePage
                      >
                        {section.label}
                      </Link>
                    )}
                    {openDropdown === section.id && section.dropdown && (
                      <div className="dropdown-content ">
                        {section.dropdown.map((item, index) => (
                          <Link
                            to={item.to}
                            key={index}
                            className={`link-with-arroww${
                              item.to === activePage ? " active" : ""
                            }`}
                            // Apply the class conditionally based on activePage
                          >
                            <p className="mb-0 arrow-item">{item.label}</p>
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
                <div className="port d-md-none ">
                  <Link to={"/doctor"} className="">
                    <p>Doctor Dashboard</p>
                  </Link>
                  <Link to={"/patient-dashboard"}>
                    <p>Patient Dasbord</p>
                  </Link>
                  <Link to={"/loginn"}>
                    <p>Login Doctor</p>
                  </Link>
                  <Link to={"/login"}>
                    <p>Login Patient</p>
                  </Link>
                </div>
              </ul>
            </div>
            <div className="gs-container" ref={gsContainer}>
              <Link to={"/search"}>
                {" "}
                <button
                  className="get-started"
                  ref={bsContainer}
                  disabled={isEnrollmentPage}
                >
                  SEARCH DOCTOR
                </button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
