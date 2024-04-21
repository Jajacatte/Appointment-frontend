import React, { useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ScrollToTop from "./Components/scrollToTop";
import Layout from "./Components/Layout";
import LazyLoading from "./Components/Loading/LazyLoading";
import DoctorProfile from "./Pages/DoctorProfile/DoctorProfile";
import SearchDoctor from "./Pages/SearchDoctor/SearchDoctor";
import PatientDashboard from "./Pages/PatientDasboard/PatientDashboard";
import PatientFavorite from "./Pages/PatientFavorite/PatientFavorite";
import MedicalDetails from "./Pages/MedicalDetails/MedicalDetails";
import ProfileSetting from "./Pages/ProfileSetting/ProfileSetting";
import ChangePassword from "./Pages/ChangePassword/ChangePassword";
import DoctorDashboard from "./Pages/DoctorDashboard/DoctorDashboard";
import Appointment from "./Pages/Appointments/Appointment";
import Patient from "./Pages/Patients/Patient";
import DoctorReviews from "./Pages/DoctorReviews/DoctorReviews";
import DocProfileSetting from "./Pages/DocProfileSetting/DocProfileSetting";
import DoctorPassword from "./Pages/DoctorPassword/DoctorPassword";
import BookingPage from "./Pages/Booking/Booking";
import Login from "./Pages/Login/Login";

import Register from "./Pages/Register/Register";
import PrivateRouter from "./PrivateRouter";
import LoginDoctor from "./Pages/LoginDoctor/LoginDoctor";
import PrivateDoctor from "./PrivateDoctor";
const Home = lazy(() => import("./Pages/Home/Home"));

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  return (
    <div className="App">
      <ScrollToTop>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<LazyLoading />}>
                <Layout />
              </Suspense>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<LazyLoading />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/doc/:id"
              element={
                <Suspense fallback={<LazyLoading />}>
                  {/* <PrivateDoctor> */}
                    <DoctorProfile />
                  {/* </PrivateDoctor> */}
                </Suspense>
              }
            />
            <Route
              path="/search"
              element={
                <Suspense fallback={<LazyLoading />}>
                  <SearchDoctor />
                </Suspense>
              }
            />
            <Route
              path="/patient-dashboard"
              element={
                <Suspense fallback={<LazyLoading />}>
                  <PrivateRouter>
                    <PatientDashboard />
                  </PrivateRouter>
                </Suspense>
              }
            />
            <Route
              path="/favorite"
              element={
                <Suspense fallback={<LazyLoading />}>
                  <PrivateRouter>
                    <PatientFavorite />
                  </PrivateRouter>
                </Suspense>
              }
            />
            <Route
              path="/booking/:id"
              element={
                <Suspense fallback={<LazyLoading />}>
                  <PrivateRouter>
                    <BookingPage />
                  </PrivateRouter>
                </Suspense>
              }
            />
            <Route
              path="/med"
              element={
                <Suspense fallback={<LazyLoading />}>
                  <PrivateRouter>
                    <MedicalDetails />
                  </PrivateRouter>
                </Suspense>
              }
            />
            <Route
              path="/profile-setting"
              element={
                <Suspense fallback={<LazyLoading />}>
                  <PrivateRouter>
                    <ProfileSetting />
                  </PrivateRouter>
                </Suspense>
              }
            />
            <Route
              path="/password"
              element={
                <Suspense fallback={<LazyLoading />}>
                  <ChangePassword />
                </Suspense>
              }
            />
            <Route
              path="/doctor"
              element={
                <Suspense fallback={<LazyLoading />}>
                  <PrivateDoctor>
                    <DoctorDashboard />
                  </PrivateDoctor>
                </Suspense>
              }
            />
            <Route
              path="/appointments"
              element={
                <Suspense fallback={<LazyLoading />}>
                  <PrivateDoctor>
                    <Appointment />
                  </PrivateDoctor>
                </Suspense>
              }
            />
            <Route
              path="/patients"
              element={
                <Suspense fallback={<LazyLoading />}>
                  <Patient />
                </Suspense>
              }
            />
            <Route
              path="/docreviews"
              element={
                <Suspense fallback={<LazyLoading />}>
                  X
                  <PrivateDoctor>
                    <Appointment />
                  </PrivateDoctor>
                </Suspense>
              }
            />
            <Route
              path="/doc-profile-settings"
              element={
                <Suspense fallback={<LazyLoading />}>
                  <PrivateDoctor>
                    <DocProfileSetting />
                  </PrivateDoctor>
                </Suspense>
              }
            />
            <Route
              path="/doc-password"
              element={
                <Suspense fallback={<LazyLoading />}>
                  <PrivateDoctor>
                    <DoctorPassword />
                  </PrivateDoctor>
                </Suspense>
              }
            />
            <Route
              path="/login"
              element={
                <Suspense fallback={<LazyLoading />}>
                  <Login />
                </Suspense>
              }
            />
            <Route
              path="/loginn"
              element={
                <Suspense fallback={<LazyLoading />}>
                  <LoginDoctor />
                </Suspense>
              }
            />
            <Route
              path="/register"
              element={
                <Suspense fallback={<LazyLoading />}>
                  <Register />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </ScrollToTop>
    </div>
  );
}

export default App;
