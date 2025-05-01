import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import TourCard from "../../shared/TourCard";
import { tours } from "../../assets/data/tours";

const FeaturedTourList = () => {
  const featuredTours = tours.filter((tour) => tour.featured === true).slice(0, 8);

  return (
    <>
      {featuredTours.map((tour) => (
        <Col lg="3" md="6" sm="6" className="mb-4" key={tour.id}>
          <TourCard tour={tour} />
        </Col>
      ))}
    </>
  );
};

export default FeaturedTourList;
