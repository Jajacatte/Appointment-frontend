import React from "react";
import "./Footer.css";
import { FaFacebook, FaTwitter, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <section className="footer-wrapper py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-12">
              <h2 className="mb-4">NurseryHub</h2>
              <p>Features</p>
              <Link to={"/about"}>
                {" "}
                <p>About</p>
              </Link>
              <Link to={"/contact"}>
                {" "}
                <p>Contact</p>
              </Link>
              <p>Blog</p>
            </div>
            <div className="col-md-4 col-12">
              <h2 className="mb-4">Support</h2>
              <p>Troubleshooting</p>
              <p>Complaints</p>
              <p>Updates</p>
              <p>Manuals</p>
            </div>
            <div className="col-md-4 col-12">
              <h2 className="mb-3">Resources</h2>
              <p>FAQS</p>
              <p>Downloads</p>
              <p>Policies</p>
              <p>Guidlines</p>
            </div>
          </div>
        </div>
        <footer className="py-4">
          <div className="container">
            <div className="row">
              <div className="col-12 col-sm-4 mb-4 d-flex  flex-column ">
                <h2 className="text-white">Contact Us</h2>
                <div className="">
                  <address>
                    NurseryHub <br />
                    No 1240 Benin, Edo State
                    <br />
                    Nigeria
                  </address>
                  <p>
                    <a href="tel:+234 8103193091" className="hotline">
                      +234 8107880994
                    </a>{" "}
                  </p>
                  <p>
                    <a href="mailto:davidodimayo@gmail.com" className="hotline">
                      EfeJustice9255@gmail.com
                    </a>{" "}
                  </p>
                </div>

                <div className="social-btn">
                  <a>
                    <FaFacebook />
                  </a>
                  <a>
                    <FaTwitter />
                  </a>
                  <a>
                    <FaLinkedin />
                  </a>
                  <a>
                    <FaWhatsapp />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
        <footer className="py-4">
          <div className="container">
            <div className="row">
              <div className="col-12 pb">
                <p>
                  &copy;{new Date().getFullYear()} powered by Justice Efetobor
                  <span className="logo-x">X</span>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </>
  );
};

export default Footer;
