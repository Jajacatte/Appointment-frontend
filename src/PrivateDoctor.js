import React from "react";
import { Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

function PrivateDoctor({ children }) {
  const auth = window.localStorage.getItem("doctorInfo");
  return auth ? children : <Navigate to="/" />;
}
export default PrivateDoctor;
