import { BOOKMARK_DOCTOR_FAIL, BOOKMARK_DOCTOR_REQUEST, BOOKMARK_DOCTOR_RESET, BOOKMARK_DOCTOR_SUCCESS, PATIENT_DETAILS_FAIL, PATIENT_DETAILS_REQUEST, PATIENT_DETAILS_SUCCESS, PATIENT_LOGIN_FAIL, PATIENT_LOGIN_REQUEST, PATIENT_LOGIN_SUCCESS, PATIENT_REGISTER_FAIL, PATIENT_REGISTER_REQUEST, PATIENT_REGISTER_SUCCESS, PATIENT_USER_LOGOUT } from "../Constants/PatientConstant";


export const getPatientProfileReducer = (state = { patient: {} }, action) => {
  switch (action.type) {
    case PATIENT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PATIENT_DETAILS_SUCCESS:
      return { loading: false, patient: action.payload };
    case PATIENT_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const bookmarkDoctorReducer = (state = {  }, action) => {
  switch (action.type) {
    case BOOKMARK_DOCTOR_REQUEST:
      return { ...state, loading: true };
    case BOOKMARK_DOCTOR_SUCCESS:
      return { loading: false, success: true, status: action.payload };
    case BOOKMARK_DOCTOR_FAIL:
      return { loading: false, success: false, error: action.payload };
    case BOOKMARK_DOCTOR_RESET:
      return { loading: false, success: false, error: action.payload };

    default:
      return state;
  }
};


export const patientLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case PATIENT_LOGIN_REQUEST:
      return { loading: true };
    case PATIENT_LOGIN_SUCCESS:
      return { loading: false, patientInfo: action.payload };

    case PATIENT_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case PATIENT_USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const patientRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case PATIENT_REGISTER_REQUEST:
      return { loading: true };
    case PATIENT_REGISTER_SUCCESS:
      return { loading: false, patientInfo: action.payload };
    case PATIENT_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};