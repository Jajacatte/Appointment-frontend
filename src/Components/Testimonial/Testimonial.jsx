import React from "react";
import "./Testimonial.css";
import { easeInOut, motion } from "framer-motion";
import {
  FaArrowLeft,
  FaArrowRight,
  FaQuoteRight,
  FaStreetView,
} from "react-icons/fa";
const Testimonial = () => {
  const items = [
    {
      // First item
      imageSrc: "/images/client-01.jpg",
      name: "John Doe",
      role: "UI/UX Designer",
      description: `Exceptional attention to detail and exceptional customer service.
       `,
      iconColor: "rgb(141, 54, 54)",
    },
    {
      // Second item
      imageSrc: "/images/client-02.jpg",
      name: "Peter Drey",
      role: "Product Designer",
      description: `Working with David has been a game-changer for our business. 
`,
      iconColor: "rgb(141, 54, 54)",
    },
    {
      // Third item
      imageSrc: "/images/client-03.jpg",
      name: "Flora Shaw",
      role: "Software Engineer",
      description: `An absolute pleasure to collaborate with. `,
      iconColor: "rgb(141, 54, 54)",
    },
    {
      // Third item
      imageSrc: "/images/client-04.jpg",
      name: "John Wikkins",
      role: "Software Engineer",
      description: `An absolute pleasure to collaborate with. `,
      iconColor: "rgb(141, 54, 54)",
    },
  ];
  const [index, setIndex] = React.useState(0);
  const next = () => {
    setIndex(index + 1);
    console.log(index);
    if (index == items.length - 1) {
      setIndex(0);
    }
  };
  const back = () => {
    setIndex(index - 1);
    if (index == 0) {
      setIndex(items.length - 1);
    }
  };
  React.useEffect(() => {
    const lastIndex = items.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, items]);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex(index + 1);
    }, 6000);

    return () => clearInterval(interval);
  });
  return (
    <>
      <section className="testimonial-wrapper py-3" id="testimonial">
        <div className="container">
          <div className="row">
            <div className="col-12 mb-3">
              <h4 className="head-text mt-10" style={{ color: "red" }}>
                TESTIMONIALS
              </h4>
              <h2 className="parent-text">What our Client Says</h2>
            </div>
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.9, ease: easeInOut }}
              className="d-flex xx justify-content-center align-items-center"
            >
              <div className="w-100 test-container p-3">
                <div className="text-arrow-right" onClick={() => next()}>
                  <FaArrowRight />
                </div>
                <div className="test-arrow-left" onClick={() => back()}>
                  <FaArrowLeft />
                </div>
                {items.map((item, idx) => {
                  let position = "last-slide";
                  if (idx === index) {
                    position = "active-slide";
                  }
                  if (
                    idx === index - 1 ||
                    (index == 0 && idx === items.length - 1)
                  ) {
                    position = "next-slide";
                  }

                  return (
                    <div className={`test-item  ${position}`}>
                      {/* <div className="test-item-image-cont"> */}
                      <img
                        className={`image-fluid test-item-image-cont`}
                        src={item.imageSrc}
                      />
                      <h4
                        style={{
                          // color: "var(--color-dark)",
                          textTransform: "uppercase",
                        }}
                        className="mt-2 bold"
                      >
                        {item.name}
                      </h4>
                      <h6
                        className="bold"
                        style={{
                          // color: "var(--color-dark)",
                          textTransform: "uppercase",
                        }}
                      >
                        {item.role}
                      </h6>
                      {/* </div> */}
                      <div className="w-50 test-desc">
                        <h5
                          className="text-center mb-4 mt-2"
                          style={{
                            // color: "var(--color-dark)",
                            lineHeight: "1.4rem",
                            // textTransform: "uppercase",
                          }}
                        >
                          {item.description}
                        </h5>
                      </div>
                      <div
                        style={{
                          color: "var(--color-primary)",
                          fontSize: "57px",
                          display: "block",
                        }}
                      >
                        <FaQuoteRight />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonial;
