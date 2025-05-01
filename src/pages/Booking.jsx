import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useParams, Link } from 'react-router-dom';
import BookingComponent from '../components/Booking/Booking';
import { BASE_URL } from '../utils/config';
import '../styles/booking.css';

const Booking = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        console.log('Fetching tour with ID:', id);
        console.log('API URL:', `${BASE_URL}/tours/${id}`);
        
        const response = await fetch(`${BASE_URL}/tours/${id}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Response data:', data);
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch tour details');
        }
        
        if (!data.data) {
          throw new Error('No tour data received');
        }
        
        setTour(data.data);
      } catch (err) {
        console.error('Error fetching tour:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTour();
    } else {
      setError('No tour ID provided');
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <Container>
        <Row>
          <Col lg="12" className="text-center">
            <h4>Loading tour details...</h4>
          </Col>
        </Row>
      </Container>
    );
  }

  if (error || !tour) {
    return (
      <Container>
        <Row>
          <Col lg="12" className="text-center">
            <h4>Error: {error || 'Tour not found'}</h4>
            <p>Tour ID: {id}</p>
            <Link to="/tours" className="btn primary__btn mt-3">
              Back to Tours
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8">
            <div className="tour_content">
              <img src={tour.photo} alt={tour.title} />
              <div className="tour_info">
                <h2>{tour.title}</h2>
                <div className="d-flex align-items-center gap-5">
                  <span>
                    <i className="ri-map-pin-line"></i> {tour.city}
                  </span>
                  <span>
                    <i className="ri-money-dollar-circle-line"></i> ₹{tour.price} /per person
                  </span>
                </div>
                <h5>Description</h5>
                <p>{tour.desc}</p>
              </div>
            </div>
          </Col>
          <Col lg="4">
            <BookingComponent tour={tour} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Booking; 