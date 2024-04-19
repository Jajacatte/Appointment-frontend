import React, { useState } from "react";
// import "./FAQ.css"; // Import your CSS file for styling

const FAQ = () => {
  const AccordionData = [
    {
      id: "collapseOne",
      title: "What is daycare management software?",
      content:
        "Daycare management software is a specialized tool designed to streamline and automate various administrative tasks within a daycare center. It assists in managing enrollments, schedules, staff, billing, parent communication, and more.",
    },
    {
      id: "collapseTwo",
      title: "What are the key features of daycare management software?",
      content:
        "Key features include attendance tracking, child profiles, staff management, billing and invoicing, scheduling, parent communication, immunization records, reporting, and often include additional features like meal planning, learning activities, and security features.",
    },
    {
      id: "collapseThree",
      title: "How does daycare management software benefit daycare centers?",
      content:
        "It helps improve operational efficiency by automating manual tasks, enhances communication between staff and parents, ensures accurate record-keeping, simplifies billing and payments, and provides insights for better decision-making.",
    },
    {
      id: "collapseFour",
      title:
        "Is daycare management software secure for handling sensitive data?",
      content:
        "Reputable daycare management software providers prioritize data security. They often employ encryption methods, regular backups, secure logins, and adhere to compliance standards like HIPAA and GDPR to ensure data protection.",
    },
    {
      id: "collapseFive",
      title: "Can daycare management software assist with parent engagement?",
      content:
        "Yes, it facilitates transparent communication between daycare centers and parents. Features like real-time updates on children's activities, messaging, event calendars, and photo sharing help in fostering strong parent engagement.",
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
