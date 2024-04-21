import axios from "axios";
import {
  DOCTOR_DETAILS_FAIL,
  DOCTOR_DETAILS_REQUEST,
  DOCTOR_DETAILS_SUCCESS,
  DOCTOR_LOGIN_FAIL,
  DOCTOR_LOGIN_REQUEST,
  DOCTOR_LOGIN_SUCCESS,
  DOCTOR_USER_LOGOUT,
  GET_DOCTORS_FAIL,
  GET_DOCTORS_REQUEST,
  GET_DOCTORS_SUCCESS,
  GET_DOCTOR_FAIL,
  GET_DOCTOR_REQUEST,
  GET_DOCTOR_SUCCESS,
  LIST_DOCTORS_FAIL,
  LIST_DOCTORS_REQUEST,
  LIST_DOCTORS_SUCCESS,
} from "../Constants/DoctorsConstant";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Replace with your environment variable name
});

export const loginn = (email, password) => async (dispatch) => {
  try {
    console.log("email", email, "pass", password);
    dispatch({ type: DOCTOR_LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await api.post(
      "/api/doctor/login",
      { email, password },
      config
    );
    console.log(data);

    dispatch({ type: DOCTOR_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("doctorInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: DOCTOR_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getDoctors = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_DOCTORS_REQUEST });

    const {
      doctorLogin: { doctorInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${doctorInfo.token}`,
      },
    };

    const { data } = await api.get("/api/doctor/doctors", config);
    console.log(data);
    dispatch({ type: GET_DOCTORS_SUCCESS, payload: data });

    // localStorage.setItem("doctorInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: GET_DOCTORS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getDoctor = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_DOCTOR_REQUEST });

    const {
      doctorLogin: { doctorInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        //  Authorization: `Bearer ${doctorInfo.token}`,
      },
    };

    const { data } = await api.get(`/api/doctor/doctors/${id}`, config);
    console.log(data);
    dispatch({ type: GET_DOCTOR_SUCCESS, payload: data });

    // localStorage.setItem("parentInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: GET_DOCTOR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listDoctors =
  ({ gender, sort, maxPrice, minPrice, keyword, specializations, page }) =>
  async (dispatch) => {
    let url = `/api/doctor`;

    if (gender) {
      url += `?gender=${gender}`;
    }

    if (sort) {
      url += `${gender ? "&" : "?"}sort=${sort}`;
    }

    if (minPrice && maxPrice) {
      url += `${
        gender || sort ? "&" : "?"
      }pricing[gt]=${minPrice}&pricing[lt]=${maxPrice}`;
    }
    if (keyword) {
      url += `${
        gender || sort || (minPrice && maxPrice) ? "&" : "?"
      }keyword=${keyword}`;
    }
    if (specializations) {
      url += `${
        gender || sort || keyword || (minPrice && maxPrice) ? "&" : "?"
      }specializations=${specializations}`;
    }
    if (page) {
      url += `${
        gender || sort || keyword || specializations || (minPrice && maxPrice)
          ? "&"
          : "?"
      }page=${page}`;
    }
    // if (page) {
    //   url += `${
    //     category || isBest || sort || (minPrice && maxPrice) ? "&" : "?"
    //   }page=${page}`;
    // }
    // if (keyword) {
    //   url += `${
    //     category || isBest || sort || (minPrice && maxPrice) || page ? "&" : "?"
    //   }keyword=${keyword}`;
    // }

    try {
      dispatch({ type: LIST_DOCTORS_REQUEST });
      const { data } = await api.get(url);
      dispatch({ type: LIST_DOCTORS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: LIST_DOCTORS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getDoctorDetails = () => async (dispatch, getState) => {
  try {
    dispatch({ type: DOCTOR_DETAILS_REQUEST });

    const {
      doctorLogin: { doctorInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${doctorInfo.token}`,
      },
    };

    const { data } = await api.get(`/api/doctor/doctors/profile`, config);
    console.log(data);
    dispatch({ type: DOCTOR_DETAILS_SUCCESS, payload: data });

    // localStorage.setItem("parentInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: DOCTOR_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}; 


export const logoutt = () => (dispatch) => {
  localStorage.removeItem("doctorInfo");
  dispatch({ type: DOCTOR_USER_LOGOUT});
  document.location.href = "/";
};