import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../styles/about.css';

const About = () => {
  return (
    <section className="about__section">
      <Container>
        <Row>
          <Col lg="12">
            <div className="about__content">
              <h2 className="about__title">About Our Tour Management Service</h2>
              <p className="about__desc">
                Welcome to our premier tour management platform, where we make travel dreams come true. 
                We specialize in creating unforgettable experiences by connecting travelers with the most 
                amazing destinations across the globe.
              </p>
            </div>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col lg="4" md="4">
            <div className="about__item">
              <div className="about__icon">
                <i className="ri-map-pin-line"></i>
              </div>
              <h4>Diverse Destinations</h4>
              <p>
                Explore handpicked locations across the world, from serene beaches to bustling cities 
                and everything in between.
              </p>
            </div>
          </Col>
          <Col lg="4" md="4">
            <div className="about__item">
              <div className="about__icon">
                <i className="ri-star-line"></i>
              </div>
              <h4>Quality Service</h4>
              <p>
                Our experienced guides and carefully curated tours ensure you get the best travel 
                experience possible.
              </p>
            </div>
          </Col>
          <Col lg="4" md="4">
            <div className="about__item">
              <div className="about__icon">
                <i className="ri-customer-service-line"></i>
              </div>
              <h4>24/7 Support</h4>
              <p>
                Our dedicated support team is always ready to assist you before, during, and after 
                your journey.
              </p>
            </div>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col lg="6">
            <div className="about__experience">
              <h3>Our Experience</h3>
              <p>
                With years of experience in the tourism industry, we've helped thousands of travelers 
                create lasting memories. Our commitment to excellence and customer satisfaction has made 
                us a trusted name in tour management.
              </p>
              <div className="counter__wrapper d-flex align-items-center gap-5">
                <div className="counter__box">
                  <span>12k+</span>
                  <h6>Successful Trips</h6>
                </div>
                <div className="counter__box">
                  <span>2k+</span>
                  <h6>Regular Clients</h6>
                </div>
                <div className="counter__box">
                  <span>15</span>
                  <h6>Years Experience</h6>
                </div>
              </div>
            </div>
          </Col>
          <Col lg="6">
            <div className="about__img">
              <img src="/images/about.jpg" alt="About Us" className="w-100 rounded-3" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About; 