import React, { useState, useEffect, useRef } from "react";
import "./Patient.css";
import DoctorSidebar from "../../Components/DoctorSidebar/DoctorSidebar";
import SidebarDoctor from "../../Components/SidebarDoctor/SidebarDoctor";

const Patient = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  return (
    <div>
      <div className="strip-wrapper py-2">
        <SidebarDoctor
          item="patient"
          sidebarVisible={sidebarVisible}
          setSidebarVisible={setSidebarVisible}
        />
        <div className="container">
          <div className="doctor-strip">
            <h2>My Patients</h2>
            <p>Home / My Patients</p>
          </div>
        </div>
      </div>
      <div className="patient-wrapper">
        <div className="container">
          <div className="patient">
            <DoctorSidebar item="patient" />
            <div className="main">
              <span
                class="material-symbols-outlined open-button d-md-none d-block mb-3"
                onClick={toggleSidebar}
              >
                menu_open
              </span>
              <div className="patient-main px-4">
                <div className="row">
                  <div className="col-lg-4 col-12">
                    <div className="x p-3">
                      <div className="d-flex align-items-center justify-content-center flex-column">
                        <div className="p-img1">
                          <img
                            className="img-fluid"
                            src="/images/patient.jpg"
                          />
                        </div>
                        <h3 className="mt-2">Richard Wilson</h3>
                        <span>Patient ID : P0016</span>
                        <div className="d-flex align-items-center mt-1 mb-2">
                          <span class="material-icons span1">location_on</span>
                          <p className="mb-0">Alabama, USA</p>
                        </div>
                      </div>
                      <div>
                        <div className="d-flex align-items-center justify-content-between">
                          <h5>Phone</h5>
                          <p className="mb-0">+1 952 001 8563</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <h5>Age</h5>
                          <p className="mb-0">38 Years, Male</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <h5>Blood Group</h5>
                          <p className="mb-0">AB+</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-12">
                    <div className="x p-3">
                      <div className="d-flex align-items-center justify-content-center flex-column">
                        <div className="p-img1">
                          <img
                            className="img-fluid"
                            src="/images/patient4.jpg"
                          />
                        </div>
                        <h3 className="mt-2">Richard Wilson</h3>
                        <span>Patient ID : P0016</span>
                        <div className="d-flex align-items-center mt-1 mb-2">
                          <span class="material-icons span1">location_on</span>
                          <p className="mb-0">Alabama, USA</p>
                        </div>
                      </div>
                      <div>
                        <div className="d-flex align-items-center justify-content-between">
                          <h5>Phone</h5>
                          <p className="mb-0">+1 952 001 8563</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <h5>Age</h5>
                          <p className="mb-0">38 Years, Male</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <h5>Blood Group</h5>
                          <p className="mb-0">AB+</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-12">
                    <div className="x p-3">
                      <div className="d-flex align-items-center justify-content-center flex-column">
                        <div className="p-img1">
                          <img
                            className="img-fluid"
                            src="/images/patient3.jpg"
                          />
                        </div>
                        <h3 className="mt-2">Richard Wilson</h3>
                        <span>Patient ID : P0016</span>
                        <div className="d-flex align-items-center mt-1 mb-2">
                          <span class="material-icons span1">location_on</span>
                          <p className="mb-0">Alabama, USA</p>
                        </div>
                      </div>
                      <div>
                        <div className="d-flex align-items-center justify-content-between">
                          <h5>Phone</h5>
                          <p className="mb-0">+1 952 001 8563</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <h5>Age</h5>
                          <p className="mb-0">38 Years, Male</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <h5>Blood Group</h5>
                          <p className="mb-0">AB+</p>
                        </div>
                      </div>
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

export default Patient;
