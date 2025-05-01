import React, { useState, useRef, useContext, useEffect } from "react";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams, Link } from "react-router-dom";
import tourData from "../assets/data/tours";
import calculateAvgRating from "../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import Newsletter from "../shared/Newsletter";
import { AuthContext } from "../context/AuthContext";
import "../styles/tour-details.css";
import { BASE_URL } from "../utils/config";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const { user } = useContext(AuthContext);
  
  // Debug logging
  console.log('Tour ID from URL:', id);
  console.log('Available tours:', tourData);

  useEffect(() => {
    setLoading(true);
    // Fetch from backend
    fetch(`${BASE_URL}/tours/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Tour data received:', data);
        
        // Ensure reviews are properly formatted and filter out anonymous reviews
        const formattedReviews = data.data?.reviews?.filter(review => review.username && review.username !== 'Anonymous')
          .map(review => ({
            _id: review._id,
            username: review.username,
            reviewText: review.reviewText || '',
            rating: review.rating || 0,
            createdAt: review.createdAt ? new Date(review.createdAt) : new Date(),
            productId: review.productId
          })) || [];

        console.log('Formatted reviews:', formattedReviews);
        
        setTour({
          ...data.data,
          reviews: formattedReviews
        });
        setReviews(formattedReviews);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching tour:', err);
        setLoading(false);
      });
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    if (!user) {
      toast.warning("Please login to submit a review");
      return;
    }

    if (!tourRating) {
      toast.warning("Please select a rating");
      return;
    }

    if (!reviewText.trim()) {
      toast.warning("Please enter your review");
      return;
    }

    // Get the correct tour ID (either _id from MongoDB or id from local data)
    const tourId = tour?._id || tour?.id;
    if (!tourId) {
      console.error('Tour ID is missing:', tour);
      toast.error("Tour ID not found");
      return;
    }

    console.log('Submitting review for tour:', {
      tourId: tourId,
      tourTitle: tour.title,
      username: user.username,
      rating: tourRating,
      reviewText: reviewText
    });

    try {
      const response = await fetch(`${BASE_URL}/reviews/${tourId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          username: user.username,
          reviewText: reviewText,
          rating: tourRating,
          tourTitle: tour.title
        })
      });

      const data = await response.json();
      console.log('Review submission response:', data);

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Please login again to submit a review");
          return;
        }
        throw new Error(data.message || 'Failed to submit review');
      }

      // Update local state with new review
      const newReview = {
        _id: data.data._id,
        username: user.username,
        reviewText: reviewText,
        rating: tourRating,
        createdAt: new Date(),
        productId: tourId
      };

      console.log('New review object:', newReview);

      setReviews(prevReviews => [...prevReviews, newReview]);
      
      // Update the tour object with new reviews
      setTour(prevTour => ({
        ...prevTour,
        reviews: [...prevTour.reviews, newReview]
      }));

      // Clear the form
      reviewMsgRef.current.value = "";
      setTourRating(null);
      toast.success("Review submitted successfully!");
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error(error.message || "Failed to submit review");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!tour) {
    return (
      <Container>
        <Row>
          <Col lg="12" className="text-center">
            <h4 className="mb-4">Tour not found</h4>
            <p className="text-muted">ID: {id || 'undefined'}</p>
            <Link to="/tours" className="btn primary_btn">
              Back to Tours
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }

  const { photo, title, desc, price, city, distance, maxGroupSize } = tour;
  const { totalRating, avgRating } = calculateAvgRating(reviews);

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <div className="tour_content">
                <img src={photo} alt="" />

                <div className="tour_info">
                  <h2>{title}</h2>

                  <div className="d-flex align-items-center gap-5">
                    <span className="tour_rating d-flex align-items-center gap-1">
                      <i
                        className="ri-star-fill"
                        style={{ color: "var(--secondary-color)" }}
                      ></i>
                      {avgRating === 0 ? null : avgRating}
                      {totalRating === 0 ? (
                        "Not rated"
                      ) : (
                        <span>({reviews?.length})</span>
                      )}
                    </span>

                    <span>
                      <i className="ri-map-pin-user-fill"></i> {city}
                    </span>
                    <span>
                      <i className="ri-money-dollar-circle-line"></i> ₹{price} /per
                      person
                    </span>
                  </div>

                  <h5>Description</h5>
                  <p>{desc}</p>
                </div>

                {/* ============ tour reviews section ============ */}
                <div className="tour_reviews mt-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4>Reviews ({reviews?.length} reviews)</h4>
                  </div>

                  <Form onSubmit={submitHandler}>
                    <div className="rating_group d-flex align-items-center gap-3 mb-4">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <span 
                          key={rating} 
                          onClick={() => setTourRating(rating)}
                          style={{ cursor: 'pointer' }}
                        >
                          {rating}{' '}
                          <i 
                            className={`ri-star-${tourRating >= rating ? 'fill' : 'line'}`}
                            style={{ 
                              color: tourRating >= rating ? "var(--secondary-color)" : "var(--text-color)",
                              fontSize: '1.2rem'
                            }}
                          ></i>
                        </span>
                      ))}
                    </div>

                    <div className="review_input">
                      <input
                        type="text"
                        ref={reviewMsgRef}
                        placeholder="share your thoughts"
                        required
                      />
                      <button
                        className="btn primary_btn text-white"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </Form>

                  <ListGroup className="user_reviews">
                    {reviews?.map((review, index) => (
                      <div className="review_item" key={review._id || index}>
                        <img src={avatar} alt="" />
                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>{review.username || 'Anonymous'}</h5>
                              <p>
                                {review.createdAt instanceof Date ? 
                                  review.createdAt.toLocaleDateString(
                                    "en-US",
                                    { 
                                      day: "numeric", 
                                      month: "long", 
                                      year: "numeric"
                                    }
                                  ) : new Date(review.createdAt).toLocaleDateString(
                                    "en-US",
                                    { 
                                      day: "numeric", 
                                      month: "long", 
                                      year: "numeric"
                                    }
                                  )}
                              </p>
                            </div>
                            <span className="d-flex align-items-center gap-1">
                              <span>{review.rating}</span> <i className="ri-star-s-fill"></i>
                            </span>
                          </div>
                          <h6>{review.reviewText}</h6>
                        </div>
                      </div>
                    ))}
                  </ListGroup>
                </div>
                {/* ============ tour reviews section end ============ */}
              </div>
            </Col>

            <Col lg="4">
              <Booking tour={tour} avgRating={avgRating} />
            </Col>
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default TourDetails;
