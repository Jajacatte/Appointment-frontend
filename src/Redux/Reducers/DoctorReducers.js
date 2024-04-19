import { DOCTOR_DETAILS_FAIL, DOCTOR_DETAILS_REQUEST, DOCTOR_DETAILS_SUCCESS, DOCTOR_LOGIN_FAIL, DOCTOR_LOGIN_REQUEST, DOCTOR_LOGIN_SUCCESS, DOCTOR_USER_LOGOUT, GET_DOCTORS_FAIL, GET_DOCTORS_REQUEST, GET_DOCTOR_FAIL, GET_DOCTOR_REQUEST, GET_DOCTOR_SUCCESS, LIST_DOCTORS_FAIL, LIST_DOCTORS_REQUEST, LIST_DOCTORS_SUCCESS } from "../Constants/DoctorsConstant";
import { GET_DOCTORS_SUCCESS } from './../Constants/DoctorsConstant';


export const getDoctorsReducer = (state = { doctors: [] }, action) => {
  switch (action.type) {
    case GET_DOCTORS_REQUEST:
      return { ...state, loading: true };
    case GET_DOCTORS_SUCCESS:
      return { loading: false, doctors: action.payload };
    case GET_DOCTORS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const getDoctorReducer = (state = { doctor:{}}, action) => {
  switch (action.type) {
    case GET_DOCTOR_REQUEST:
      return { ...state, loading: true };
    case GET_DOCTOR_SUCCESS:
      return { loading: false, doctor: action.payload };
    case GET_DOCTOR_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const doctorListReducer = (state = { doctors: [] }, action) => {
  switch (action.type) {
    case LIST_DOCTORS_REQUEST:
      return { loading: true, doctors: [] };
    case LIST_DOCTORS_SUCCESS:
      return {
        loading: false,
        doctors: action.payload,
      };
    case LIST_DOCTORS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const getDoctorDetailsReducer = (state = { doctor: {} }, action) => {
  switch (action.type) {
    case DOCTOR_DETAILS_REQUEST:
      return { ...state, loading: true };
    case DOCTOR_DETAILS_SUCCESS:
      return { loading: false, doctor: action.payload };
    case DOCTOR_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};


export const doctorLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case DOCTOR_LOGIN_REQUEST:
      return { loading: true };
    case DOCTOR_LOGIN_SUCCESS:
      return { loading: false, doctorInfo: action.payload };

    case DOCTOR_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case DOCTOR_USER_LOGOUT:
      return {};
    default:
      return state;
  }
};