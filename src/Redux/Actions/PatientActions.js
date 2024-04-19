import axios from "axios";
import {
  BOOKMARK_DOCTOR_REQUEST,
  BOOKMARK_DOCTOR_RESET,
  BOOKMARK_DOCTOR_SUCCESS,
  PATIENT_DETAILS_FAIL,
  PATIENT_DETAILS_REQUEST,
  PATIENT_LOGIN_FAIL,
  PATIENT_LOGIN_REQUEST,
  PATIENT_LOGIN_SUCCESS,
  PATIENT_REGISTER_FAIL,
  PATIENT_REGISTER_REQUEST,
  PATIENT_REGISTER_SUCCESS,
  PATIENT_USER_LOGOUT,
} from "../Constants/PatientConstant";
import { PATIENT_DETAILS_SUCCESS } from "../Constants/PatientConstant";
import { BOOKMARK_DOCTOR_FAIL } from "./../Constants/PatientConstant";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Replace with your environment variable name
});

export const register =
  (firstName, lastName, email, password) => async (dispatch) => {
    // console.log("name", name, "email", email, "password", password);
    try {
      dispatch({ type: PATIENT_REGISTER_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await api.post(
        "/api/patient/register",
        { firstName, lastName, email, password },
        config
      );
      console.log(data);
      dispatch({ type: PATIENT_REGISTER_SUCCESS, payload: data });
      dispatch({ type: PATIENT_LOGIN_SUCCESS, payload: data });
      localStorage.setItem("patientInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: PATIENT_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const login = (email, password) => async (dispatch) => {
  try {
    console.log("email", email, "pass", password);
    dispatch({ type: PATIENT_LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/patient/login",
      { email, password },
      config
    );
    console.log(data);

    dispatch({ type: PATIENT_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("patientInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: PATIENT_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getPatient = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PATIENT_DETAILS_REQUEST });

    const {
      patientLogin: { patientInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${patientInfo.token}`,
      },
    };

    const { data } = await api.get("/api/patient/profile", config);
    console.log(data);
    dispatch({ type: PATIENT_DETAILS_SUCCESS, payload: data });

    // localStorage.setItem("patientInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: PATIENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const bookmarkDoctor = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: BOOKMARK_DOCTOR_REQUEST });
    const {
      patientLogin: { patientInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${patientInfo.token}`,
      },
    };
console.log("INFOOO", patientInfo.token)
    const { data } = await api.post(`/api/patient/bookmark/${id}`, {}, config);
    dispatch({ type: BOOKMARK_DOCTOR_SUCCESS, payload: data });
    dispatch({ type: BOOKMARK_DOCTOR_RESET });
  } catch (error) {
    dispatch({
      type: BOOKMARK_DOCTOR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("patientInfo");
  dispatch({ type: PATIENT_USER_LOGOUT });
  document.location.href = "/";
};
