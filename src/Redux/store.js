import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  doctorListReducer,
  doctorLoginReducer,
  getDoctorDetailsReducer,
  getDoctorReducer,
  getDoctorsReducer,
} from "./Reducers/DoctorReducers";
import {
  bookmarkDoctorReducer,
  getPatientProfileReducer,
  patientLoginReducer,
  patientRegisterReducer,
} from "./Reducers/PatientReducer";

const reducer = combineReducers({
  allDoctors: getDoctorsReducer,
  singleDoctors: getDoctorReducer,
  doctorDetail: getDoctorDetailsReducer,
  doctorList: doctorListReducer,
  patientProfile: getPatientProfileReducer,
  doctorBookmark: bookmarkDoctorReducer,
  patientLogin: patientLoginReducer,
  doctorLogin: doctorLoginReducer,
  patientRegister: patientRegisterReducer,
});
const patientInfoFromLocalStorage = localStorage.getItem("patientInfo")
  ? JSON.parse(localStorage.getItem("patientInfo"))
  : null;
  const doctorInfoFromLocalStorage = localStorage.getItem("doctorInfo")
    ? JSON.parse(localStorage.getItem("doctorInfo"))
    : null;

//   const childInfoFromLocalStorage = localStorage.getItem("childInfo")
//   ? JSON.parse(localStorage.getItem("childInfo"))
//   : null;

//   const staffInfoFromLocalStorage = localStorage.getItem("staffInfo")
//     ? JSON.parse(localStorage.getItem("staffInfo"))
//     : null;

const innitialState = {
  patientLogin: {
    patientInfo: patientInfoFromLocalStorage,
  },

  doctorLogin: {
    doctorInfo: doctorInfoFromLocalStorage,
  },
  // childLogin: {
  //   childInfo: childInfoFromLocalStorage,
  // },
  // staffLogin: {
  //   staffInfo: staffInfoFromLocalStorage,
  // },
};
const Middleware = [thunk];
const store = createStore(
  reducer,
  innitialState,
  composeWithDevTools(applyMiddleware(...Middleware))
);

export default store;
