import React from "react";
import ServiceCard from "./ServiceCard";
import { Col } from "reactstrap";
import weatherImg from "../assets/images/weather.png";
import guideImg from "../assets/images/guide.png";
import customizationImg from "../assets/images/customization.png";

const services = [
  {
    id: "01",
    imgUrl: guideImg,
    title: "Expert Tour Guides",
    desc: "Our knowledgeable guides bring destinations to life with their local expertise and passion for sharing cultural insights.",
  },
  {
    id: "02",
    imgUrl: customizationImg,
    title: "Comfortable Transportation",
    desc: "Travel in comfort with our modern, well-maintained vehicles and professional drivers ensuring safe journeys.",
  },
  {
    id: "03",
    imgUrl: weatherImg,
    title: "Handpicked Accommodations",
    desc: "Stay in carefully selected hotels and lodgings that combine comfort, location, and authentic local charm.",
  },
];

const ServiceList = () => {
  return (
    <>
      {services.map((item, index) => (
        <Col lg="3" md="6" sm="12" className="mb-4" key={index}>
          <ServiceCard item={item} />
        </Col>
      ))}
    </>
  );
};

export default ServiceList;
