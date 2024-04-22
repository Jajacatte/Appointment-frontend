import React, { useState } from "react";
// import "./FAQ.css"; // Import your CSS file for styling

const FAQ = () => {
const AccordionData = [
  {
    id: "collapseOne",
    title: "What is appointment scheduling software for doctors and patients?",
    content:
      "Appointment scheduling software for doctors and patients is a specialized tool designed to facilitate the booking of medical appointments and manage schedules efficiently. It allows patients to book appointments online, view available time slots, and provides doctors with tools to manage their availability and patient appointments.",
  },
  {
    id: "collapseTwo",
    title:
      "What are the key features of appointment scheduling software for doctors and patients?",
    content:
      "Key features include online booking capabilities for patients, real-time availability updates, appointment reminders, patient intake forms, calendar integration with EMR systems, waitlist management, telemedicine integration, and secure messaging for communication between doctors and patients.",
  },
  {
    id: "collapseThree",
    title:
      "How does appointment scheduling software benefit doctors and patients?",
    content:
      "It streamlines the appointment booking process, reduces no-shows with automated reminders, improves patient satisfaction by offering convenient online booking options, optimizes doctor's schedules for better efficiency, enhances communication between doctors and patients, and ensures accurate record-keeping for medical appointments.",
  },
  {
    id: "collapseFour",
    title:
      "Is appointment scheduling software secure for handling sensitive patient information?",
    content:
      "Reputable appointment scheduling software providers prioritize data security. They implement robust encryption methods, maintain secure server infrastructure, conduct regular security audits, and comply with healthcare privacy regulations like HIPAA to safeguard patient confidentiality and protect sensitive medical information.",
  },
  {
    id: "collapseFive",
    title: "Can appointment scheduling software improve patient care?",
    content:
      "Yes, it can improve patient care by reducing wait times, ensuring timely appointments, enabling remote consultations through telemedicine features, providing easy access to medical records and appointment history, and facilitating seamless communication between doctors and patients for better coordination of care.",
  },
];


  const [openIndex, setOpenIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  return (
    <div className="accordion-container w-100 mt-4 mt-lg-0">
      <h4>CHOOSE YOUR OWN APPOINTMENT</h4>
      <h1>Guide To Appointment</h1>
      {AccordionData.map((item, index) => (
        <div
          key={item.id}
          onClick={() => handleAccordionClick(index)}
          className={`accordion-item ${openIndex === index ? "open" : ""}`}
        >
          <div className="accordion-header">
            <div className="accordion-title">{item.title}</div>
            <div className="accordion-arrow">
              <span class="material-symbols-outlined mb-0">expand_more</span>
            </div>
          </div>
          <div className="accordion-content">{item.content}</div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
