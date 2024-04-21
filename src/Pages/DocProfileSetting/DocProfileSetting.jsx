import React, { useState, useEffect } from "react";
import "./DocProfileSetting.css";
import ExperienceForm from "../../Components/ExperienceForm/ExperienceForm";
import EducationForm from "../../Components/EducationForm/EducationForm";
import AwardsForm from "../../Components/AwardsForm/AwardsForm";
import DoctorSidebar from "../../Components/DoctorSidebar/DoctorSidebar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getDoctorDetails } from "../../Redux/Actions/DoctorActions";
import SidebarDoctor from "../../Components/SidebarDoctor/SidebarDoctor";
//

const DocProfileSetting = () => {

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Replace with your environment variable name
  });

  const [doctorData, setDoctorData] = useState({
    aboutMe: "",
    education: [{ degree: "", year: 0, college: "" }],
    experience: [
      { organization: "", from: new Date(), to: new Date(), designation: "" },
    ],
    awards: [{ name: "", year: 0, details: "" }],
    specializations: [],
    services: [],
    clinicInfo: {
      name: "",
      title: "",
      ratings: 0,

      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",

      clinicImages: [],
      timings: {
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
        sunday: "",
      },
      price: 0,
    },
    pricing: 0,
    reviews: [{ rating: 0, comment: "", userId: "" }],
    businessHours: [{ day: "", startTime: "", endTime: "" }],
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    dateOfBirth: new Date(),
    profileImage: "",
    rating: "",
    field: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData({
      ...doctorData,
      [name]: value,
    });
  };
  const handleClinicInfoChange = (e) => {
    const { name, value } = e.target;
    setDoctorData({
      ...doctorData,
      clinicInfo: {
        ...doctorData.clinicInfo,
        [name]: value,
      },
    });
  };

  const [images, setImages] = useState([]);

  const [isPriceSelected, setIsPriceSelected] = useState(false);
  const [price, setPrice] = useState("");

  const userInfoString = localStorage.getItem("doctorInfo"); // Retrieve string from local storage
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null; // Parse string to object

  const handleRadioChange = (event) => {
    setIsPriceSelected(event.target.value === "price");
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
    setDoctorData({
      ...doctorData,
      pricing: price,
    });
  };

  const dispatch = useDispatch();

  // Function to handle dropping images
  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImages((prevImages) => [...prevImages, event.target.result]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  // Function to handle adding images through file input
  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImages((prevImages) => [...prevImages, event.target.result]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  // Function to handle deleting an image
  const handleDeleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const [specialization, setSpecialization] = useState("");
  const [specializationsList, setSpecializationsList] = useState([]);

  const handleInputChange = (event) => {
    setSpecialization(event.target.value);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter" && specialization.trim() !== "") {
      const updatedSpecializationsList = [
        ...specializationsList,
        specialization.trim(),
      ];
      setSpecializationsList(updatedSpecializationsList);
      setDoctorData({
        ...doctorData,
        specializations: updatedSpecializationsList,
      });
      setSpecialization("");
    }
  };

  const handleDeleteSpecialization = (index) => {
    const updatedSpecializationsList = [...specializationsList];
    updatedSpecializationsList.splice(index, 1);
    setSpecializationsList(updatedSpecializationsList);
    setDoctorData({
      ...doctorData,
      specializations: updatedSpecializationsList, // Use updatedSpecializationsList here
    });
  };

  const [service, setService] = useState("");
  const [serviceList, setServiceList] = useState([]);

  const handleInputChange1 = (event) => {
    setService(event.target.value);
  };

  const handleInputKeyPress1 = (event) => {
    if (event.key === "Enter" && service.trim() !== "") {
      const updatedServiceList = [...serviceList, service.trim()];
      setServiceList(updatedServiceList);
      setDoctorData({
        ...doctorData,
        services: updatedServiceList,
      });
      setService("");
    }
  };

  const handleDeleteService = (index) => {
    const updatedServiceList = [...serviceList];
    updatedServiceList.splice(index, 1);
    setServiceList(updatedServiceList);
    setDoctorData({
      ...doctorData,
      services: updatedServiceList,
    });
  };

  const [file, setFile] = React.useState(null);
  const [text, setText] = React.useState("");
  const [uploadStatus, setUploadStatus] = React.useState(false);
  const [previewURL, setPreviewURL] = React.useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const previewURL = URL.createObjectURL(selectedFile);
      setPreviewURL(previewURL);
    }
  };
  const closeImg = () => {
    setPreviewURL("");
    setFile(null);
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setUploadStatus(true);
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

      let uploadedImages = []; // Initialize the imageURL variable

      if (images.length > 0) {
        // Only upload the image if 'file' is not null
        const uploadPromises = images.map((image) => {
          const formData = new FormData();
          formData.append("file", image);
          formData.append("upload_preset", "uvttt2is"); // Replace with your Cloudinary upload preset
          return axios.post(
            "https://api.cloudinary.com/v1_1/dycwd2827/upload",
            formData
          );
        });

        const responses = await Promise.all(uploadPromises);

        // Extract secure URLs of uploaded images
        uploadedImages = responses.map((response) => response.data.secure_url);
      }

      // Update the doctorData state with image URLs
      setDoctorData({
        ...doctorData,
        profileImage: imageURL,
        clinicInfo: {
          ...doctorData.clinicInfo,
          clinicImages: uploadedImages,
        },
      });
      const newPost = {
        doctorData,
        clinicImages: uploadedImages,
        imageURL: imageURL ? imageURL : "",
      };

      // Now call the updateProfile function with the updated doctorData
      updateProfile(newPost);
      console.log("THIS IS THE NEW POST", newPost);
    } catch (error) {
      console.error("Error uploading image: ", error);
      setUploadStatus("Upload Failed");
    }
  };
  const [loadingg, setLoadingg] = useState(false); // Initialize loading stateg
  const updateProfile = (newPost) => {
    console.log("DOCTORRRRRR", newPost);
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
        "Content-Type": "application/json", // Adjust content type if necessary
      },
    };

    // Set loading to true before making the request
    setLoadingg(true);

    api
      .post("/api/doctor/update", newPost, config)
      .then((response) => {
        console.log("DOCTOR UPDATED successfully:", response.data);
        setUploadStatus(false);
        setText("");
        setPreviewURL("");
        dispatch(getDoctorDetails());
      })
      .catch((error) => {
        console.error("Error creating post: ", error);
        setUploadStatus(false);
      })
      .finally(() => {
        // Set loading to false after the request completes (whether it succeeds or fails)
        setLoadingg(false);
      });
  };

  const doctorDetail = useSelector((state) => state.doctorDetail);
  const { doctor, loading, error } = doctorDetail;
  console.log(doctor);
  useEffect(() => {
    if (doctor) {
      setDoctorData({
        ...doctorData,
        aboutMe: doctor?.aboutMe || "",
        education: doctor?.education || [{ degree: "", year: 0, college: "" }],
        experience: doctor?.experience || [
          {
            organization: "",
            from: new Date(),
            to: new Date(),
            designation: "",
          },
        ],
        awards: doctor?.awards || [{ name: "", year: 0, details: "" }],
        specializations: doctor?.specializations || [],
        services: doctor?.services || [],
        clinicInfo: {
          ...doctorData.clinicInfo,
          name: doctor?.clinicInfo?.name || "",
          title: doctor?.clinicInfo?.title || "",
          ratings: doctor?.clinicInfo?.ratings || 0,
          addressLine1: doctor?.clinicInfo?.addressLine1 || "",
          addressLine2: doctor?.clinicInfo?.addressLine2 || "",
          city: doctor?.clinicInfo?.city || "",
          state: doctor?.clinicInfo?.state || "",
          country: doctor?.clinicInfo?.country || "",
          zipCode: doctor?.clinicInfo?.zipCode || "",
          clinicImages: doctor?.clinicInfo?.clinicImages || [],
          timings: {
            ...doctorData.clinicInfo.timings,
            ...doctor?.clinicInfo?.timings,
          },
          price: doctor?.clinicInfo?.price || 0,
        },
        pricing: doctor?.pricing || 0,
        reviews: doctor?.reviews || [{ rating: 0, comment: "", userId: "" }],
        businessHours: doctor?.businessHours || [
          { day: "", startTime: "", endTime: "" },
        ],
        username: doctor?.username || "",
        firstName: doctor?.firstName || "",
        lastName: doctor?.lastName || "",
        email: doctor?.email || "",
        phone: doctor?.phone || "",
        gender: doctor?.gender || "",
        dateOfBirth: doctor?.dateOfBirth || new Date(),
        profileImage: doctor?.profileImage || "",
        rating: doctor?.rating || "",
        field: doctor?.field || "",
        location: doctor?.location || "",
      });
    }
  }, [doctor]);
  React.useEffect(() => {
    dispatch(getDoctorDetails());
  }, [dispatch]);

      const [sidebarVisible, setSidebarVisible] = useState(false);

      const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
      };
  return (
    <div>
      <div className="strip-wrapper py-2">
        <SidebarDoctor
          item="doc-profile-setting"
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
            <DoctorSidebar item="doc-profile-setting" />
            <div className="main px-4">
              <span
                class="material-symbols-outlined open-button d-md-none d-block mb-3"
                onClick={toggleSidebar}
              >
                menu_open
              </span>
              <div className="profile-main py-2">
                <div className="d-flex gap-2">
                  <div className="p-setting-img">
                    <img
                      src={previewURL ? previewURL : doctor?.profileImage}
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
                <div className="form-container mt-4 p-3 w-100">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={doctorData.username}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={doctorData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={doctorData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={doctorData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number:</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={doctorData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="gender">Gender</label>
                      <input
                        type="text"
                        id="gender"
                        name="gender"
                        value={doctorData.gender}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="dob">Date of Birth:</label>
                      <input
                        type="date"
                        id="dob"
                        name="dateOfBirth"
                        value={doctorData.dateOfBirth}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-container mt-4 p-3">
                  <h3>About Me</h3>
                  <p>Biography</p>
                  <textarea
                    id="desc"
                    name="aboutMe"
                    value={doctorData.aboutMe}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="form-container mt-4 p-3">
                  <h4>Clinic Info</h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="clinicName">Clinic Name</label>
                      <input
                        type="text"
                        id="clinicName"
                        name="name"
                        value={doctorData.clinicInfo.name}
                        onChange={handleClinicInfoChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="clinicAddress">Clinic Address</label>
                      <input
                        type="text"
                        id="clinicAddress"
                        name="addressLine1"
                        value={doctorData.clinicInfo.addressLine1}
                        onChange={handleClinicInfoChange}
                      />
                    </div>
                  </div>
                  <div className="image-uploader">
                    <h3>Clinic Images</h3>
                    <textarea
                      className="textarea"
                      placeholder="Drag & drop or click here to upload images"
                      onDrop={handleDrop}
                      onDragOver={(e) => e.preventDefault()}
                      onClick={(e) =>
                        e.target.value === "" &&
                        document.getElementById("fileInput").click()
                      }
                    ></textarea>
                    <input
                      id="fileInput"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleFileInputChange}
                      multiple
                    />
                    <div className="image-preview">
                      {images.map((imageUrl, index) => (
                        <div key={index} className="image-container">
                          <img
                            src={imageUrl}
                            alt={`Image ${index}`}
                            className="img-fluid prev-img"
                          />
                          <span
                            className="material-symbols-outlined delete-button"
                            onClick={() => handleDeleteImage(index)}
                          >
                            delete
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="form-container mt-4 p-3">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="ad1">Address line 1</label>
                      <input
                        type="text"
                        id="ad1"
                        name="addressLine1"
                        value={doctorData.clinicInfo.addressLine1}
                        onChange={handleClinicInfoChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="ad2">Address line 2</label>
                      <input
                        type="text"
                        id="ad2"
                        name="addressLine2"
                        value={doctorData.clinicInfo.addressLine2}
                        onChange={handleClinicInfoChange}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={doctorData.clinicInfo.city}
                        onChange={handleClinicInfoChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="state">State / Province</label>
                      <input
                        type="text"
                        id="state"
                        name="address.state"
                        value={doctorData.clinicInfo.state}
                        onChange={handleClinicInfoChange}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="country">Country</label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={doctorData.clinicInfo.country}
                        onChange={handleClinicInfoChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="postal">Postal Code</label>
                      <input
                        type="text"
                        id="postal"
                        name="postal"
                        value={doctorData.clinicInfo.postal}
                        onChange={handleClinicInfoChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-container mt-4 p-3">
                  <h3>Pricing</h3>
                  <div className="pricing-form-container">
                    <div className="pricing-option">
                      <input
                        type="radio"
                        id="free"
                        name="pricing"
                        value="free"
                        checked={!isPriceSelected}
                        onChange={handleRadioChange}
                      />
                      <label htmlFor="free">Free</label>
                    </div>
                    <div className="pricing-option">
                      <input
                        type="radio"
                        id="price"
                        name="pricingOption"
                        value="price"
                        checked={isPriceSelected}
                        onChange={handleRadioChange}
                      />
                      <label htmlFor="price">Custom Price</label>
                    </div>
                    {isPriceSelected && (
                      <div className="pricing-input">
                        <input
                          type="text"
                          id="priceInput"
                          placeholder="Enter the price"
                          value={price}
                          onChange={handlePriceChange}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-container mt-4 p-3">
                  <div className="specialization-input-container">
                    <h3>Specializations</h3>
                    <input
                      type="text"
                      value={specialization}
                      onChange={handleInputChange}
                      onKeyPress={handleInputKeyPress}
                      placeholder="Enter specialization and press Enter"
                    />
                    <div className="specializations-list">
                      {doctorData?.specializations?.map((item, index) => (
                        <div className="specialization" key={index}>
                          {item}

                          <span
                            className="material-symbols-outlined delete-icon"
                            onClick={() => handleDeleteSpecialization(index)}
                          >
                            close
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="pp">
                      Note : Type & Press enter to add new specialization
                    </p>
                  </div>

                  <div className="specialization-input-container">
                    <h3>Services</h3>
                    <input
                      type="text"
                      value={service}
                      onChange={handleInputChange1}
                      onKeyPress={handleInputKeyPress1}
                      placeholder="Enter service and press Enter"
                    />
                    <div className="specializations-list">
                      {doctorData?.services?.map((item, index) => (
                        <div className="specialization" key={index}>
                          {item}

                          <span
                            className="material-symbols-outlined delete-icon"
                            onClick={() => handleDeleteService(index)}
                          >
                            close
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="pp">
                      Note : Type & Press enter to add new services
                    </p>
                  </div>
                </div>
                <div className="form-container mt-4 p-3">
                  <EducationForm
                    doctorData={doctorData}
                    setDoctorData={setDoctorData}
                  />
                </div>
                <div className="form-container mt-4 p-3">
                  <ExperienceForm
                    doctorData={doctorData}
                    setDoctorData={setDoctorData}
                  />
                </div>
                <div className="form-container mt-4 p-3">
                  <AwardsForm
                    doctorData={doctorData}
                    setDoctorData={setDoctorData}
                  />
                </div>
                <button className="save-changes mt-3" onClick={submitHandler}>
                  {loadingg ? "Updating" : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocProfileSetting;
