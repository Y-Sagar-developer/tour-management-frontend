import React from "react";
import "./newsletter.css";
import { Container, Row, Col } from "reactstrap";
import maleTourist from "../assets/images/male-tourist.png";

const Newsletter = () => {
  return (
    <section className="newsletter">
      <Container>
        <Row>
          <Col lg="6">
            <div className="newsletter_content">
              <h2>Subscribe to Our Newsletter</h2>
              <div className="newsletter_input">
                <input type="email" placeholder="Enter your emal" />
                <button className="btn newsletter_btn">Subscribe</button>
              </div>
              <p>
                Stay updated with our latest tour offerings, travel tips, and exclusive deals. Join our community of travel enthusiasts and be the first to know about new destinations and special promotions.
              </p>
            </div>
          </Col>
          <Col lg="6">
          <div className="newsletter_img">
            <img src={maleTourist} alt="" />
            </div>
            </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter;
