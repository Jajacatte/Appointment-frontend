import React, { useState, useEffect } from "react";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollHeight = window.scrollY;
    const offset = 400; // Adjust this value to change when the button appears
    setIsVisible(scrollHeight > offset);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={`top ${isVisible ? "show" : "hide"}`}>
    
      <button
        className={`back-to-top ${isVisible ? "show" : "hide"}`}
        onClick={scrollToTop}
        title="Go to top"
      >
        ↑
      </button>
    </div>
  );
};

export default BackToTopButton;
