import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">About Us</h5>
            <p>
              We are dedicated to providing the best travel experiences and making your journey memorable.
            </p>
            <div className="social-links">
              <a href="#" className="me-2">
                <i className="ri-facebook-fill"></i>
              </a>
              <a href="#" className="me-2">
                <i className="ri-github-fill"></i>
              </a>
              <a href="#" className="me-2">
                <i className="ri-youtube-fill"></i>
              </a>
              <a href="#" className="me-2">
                <i className="ri-linkedin-fill"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/tours">Tours</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6">
            <h5 className="text-uppercase">Contact Us</h5>
            <ul className="list-unstyled">
              <li>
                <i className="ri-map-pin-line me-2"></i>
                123 Travel Street, Adventure City
              </li>
              <li>
                <i className="ri-mail-line me-2"></i>
                info@traveladventure.com
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} Travel Adventure. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 