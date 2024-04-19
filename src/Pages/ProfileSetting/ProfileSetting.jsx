import React, { useState, useEffect } from "react";
import "./ProfileSetting.css";
import PatientSidebar from "../../Components/PatientSidebar/PatientSidebar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getPatient } from "../../Redux/Actions/PatientActions";
import Sidebar from "../../Components/Sidebar/Sidebar";
const ProfileSetting = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [uploadStatus, setUploadStatus] = useState(false);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    dob: "",
    bloodGroup: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    profileImage: "",
    password: "",
  });

  const patientProfile = useSelector((state) => state.patientProfile);
  const { patient } = patientProfile;

  const userInfoString = localStorage.getItem("patientInfo"); // Retrieve string from local storage
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null; // Parse string to object
  console.log("TOKENNN", userInfo?.token);
  useEffect(() => {
    dispatch(getPatient());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const previewURL = URL.createObjectURL(selectedFile);
      setPreviewURL(previewURL);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let imageURL = ""; // Initialize the imageURL variable

      if (file) {
        // Only upload the image if 'file' is not null
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "uvttt2is"); // Set this to your Cloudinary preset

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dycwd2827/upload",
          formData
        );

        imageURL = response.data.secure_url;
      }

      // Update the doctorData state with image URLs
      const newPost = {
        ...formData,
        profileImage: imageURL ? imageURL : "",
      };

      // Now call the updateProfile function with the updated doctorData
      updateProfile(newPost);
      console.log("THIS IS THE NEW POST", newPost);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Error updating profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };
const [updateLoading, setUpdateLoading] = useState(false);
const [errorr, setErrorr] = useState(null);
 const updateProfile = async (newPost) => {
   try {
     setUpdateLoading(true); // Set loading to true when profile update request starts
     const config = {
       headers: {
         Authorization: `Bearer ${userInfo?.token}`,
         "Content-Type": "application/json", // Adjust content type if necessary
       },
     };
     const response = await axios.put("/api/patient/update", newPost, config);
     console.log("Profile updated:", response.data);
     
     // Handle success, redirect or show a success message
   } catch (error) {
     console.error("Error updating profile:", error);
     setError("Error updating profile. Please try again.");
   } finally {
     setUpdateLoading(false); // Set loading to false when profile update request completes
   }
 };

  useEffect(() => {
    setFormData({
      lastName: patient.lastName || "",
      firstName: patient.firstName || "",
      email: patient.email || "",
      dob: patient.dob || "",
      bloodGroup: patient.bloodGroup || "",
      phone: patient.phone || "",
      address: patient.address || "",
      city: patient.city || "",
      state: patient.state || "",
      country: patient.country || "",
      profileImage: patient.profileImage || "",
      password: "", // Clear the password field for security reasons
    });
  }, []);
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
      setSidebarVisible(!sidebarVisible);
    };
  return (
    <div>
      <div className="strip-wrapper py-2">
        <Sidebar
          item="profile-setting"
          sidebarVisible={sidebarVisible}
          setSidebarVisible={setSidebarVisible}
        />
        <div className="container">
          <div className="doctor-strip">
            <h2>Profile Settings</h2>
            <p>Home / Profile Setting</p>
          </div>
        </div>
      </div>
      <div profile-setting-wrapper>
        <div className="container">
          <div className="profile-setting">
            <PatientSidebar item="profile-setting" />
            <div className="main px-4">
              <span
                class="material-symbols-outlined open-button d-md-none d-block mb-3"
                onClick={toggleSidebar}
              >
                menu_open
              </span>
              <div className="profile-main py-2">
                <div className="d-flex">
                  <div className="p-setting-img">
                    <img
                      src={previewURL ? previewURL : patient?.profileImage}
                      className="img-fluid"
                      // src="/images/doctor-thumb-01.jpg"
                    />
                    {/* <img alt="Preview" className="img-fluid" /> */}
                  </div>
                  <div className="upload">
                    <input
                      type="file"
                      // style={{ display: "none" }}
                      id="file"
                      accept=".png, .jpg, .jpeg"
                      onChange={handleFileChange}
                    />

                    <p>Allowed JPG, PNG or GIF. Max size of 2mb</p>
                  </div>
                </div>
                <div className="form-container mt-4 p-4">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name:</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name:</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="dob">Date of Birth:</label>
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="bloodGroup">Blood Group:</label>
                      <input
                        type="text"
                        id="bloodGroup"
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                        placeholder="Enter your blood group"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email:</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number:</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="address">Address:</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your address"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="city">City:</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Enter your city"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="state">State:</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="Enter your state"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="zipCode">Zip Code:</label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        placeholder="Enter your zip code"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="country">Country:</label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="Enter your country"
                      />
                    </div>
                  </div>
                </div>
                <button
                  className="save-changes mt-3"
                  onClick={submitHandler}
                  disabled={updateLoading} // Disable button when updateLoading is true
                >
                  {updateLoading ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetting;
