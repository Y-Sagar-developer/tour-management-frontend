import React from "react";
import { Container, Row, Col } from "reactstrap";
import TourCard from "../shared/TourCard";
import { useLocation } from "react-router-dom";
import CommonSection from "../shared/CommonSection";
import Newsletter from "./../shared/Newsletter";

const SearchResultList = () => {
  const location = useLocation();
  const searchResults = location.state || [];

  return (
    <>
      <CommonSection title={"Tour Search Result"} />
      <section>
        <Container>
          <Row>
            {searchResults.length === 0 ? (
              <Col lg="12" className="text-center">
                <h4>No tours found</h4>
              </Col>
            ) : (
              searchResults.map((tour) => (
                <Col lg="3" md="6" sm="6" className="mb-4" key={tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))
            )}
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default SearchResultList;