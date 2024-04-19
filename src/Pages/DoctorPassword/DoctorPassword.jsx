import React from 'react'
import "./DoctorPassword.css";
import DoctorSidebar from '../../Components/DoctorSidebar/DoctorSidebar';
const DoctorPassword = () => {
  return (
    <>
      <div className="strip-wrapper py-2">
        <div className="container">
          <div className="doctor-strip">
            <h2>Change Password</h2>
            <p>Home / Change Password</p>
          </div>
        </div>
      </div>
      <div className="change-password-wrapper">
        <div className="container">
          <div className="change-password">
          <DoctorSidebar item="doc-password"/>
            <div className="main px-3">
              <div className="password py-4 px-4">
                <div className="password-form-container">
                  <div className="password-form-group">
                    <label htmlFor="oldPassword">Old Password</label>
                    <input
                      type="password"
                      id="oldPassword"
                      placeholder="Enter your old password"
                    />
                  </div>
                  <div className="password-form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      placeholder="Enter your new password"
                    />
                  </div>
                  <div className="password-form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      placeholder="Confirm your new password"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DoctorPassword
