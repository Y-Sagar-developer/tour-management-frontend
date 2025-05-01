import React, { useState, useEffect } from "react";
import CommonSection from "../shared/CommonSection";
import "../styles/tour.css";
import TourCard from "./../shared/TourCard";
import SearchBar from "./../shared/SearchBar";
import Newsletter from "./../shared/Newsletter";
import { Container, Row, Col } from "reactstrap";
import { BASE_URL } from "../utils/config";
import { tours as tourData } from "../assets/data/tours"; // Import the named export

const Tours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTours = () => {
      try {
        // Calculate pagination
        const start = page * 8;
        const end = start + 8;
        
        // Slice the tours array for current page
        setTours(tourData.slice(start, end));
        
        // Calculate total pages
        const pages = Math.ceil(tourData.length / 8);
        setPageCount(pages);

        console.log('Total tours:', tourData.length);
        console.log('Current page tours:', tourData.slice(start, end).length);
      } catch (err) {
        console.error('Error loading tours:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTours();
    window.scrollTo(0, 0);
  }, [page]);

  if (loading) {
    return (
      <div className="text-center pt-5">
        <h4>Loading tours...</h4>
      </div>
    );
  }

  return (
    <>
      <CommonSection title={"All Tours"} />
      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          <Row>
            {tours.length === 0 ? (
              <Col lg="12" className="text-center">
                <h4>No tours found</h4>
              </Col>
            ) : (
              tours.map((tour) => (
                <Col lg="3" md="6" sm="6" className="mb-4" key={tour.id}>
                  <TourCard tour={tour} />
                </Col>
              ))
            )}
            <Col lg="12">
              <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                {[...Array(pageCount).keys()].map((number) => (
                  <span
                    key={number}
                    onClick={() => setPage(number)}
                    className={page === number ? "active_page" : ""}
                  >
                    {number + 1}
                  </span>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default Tours;
