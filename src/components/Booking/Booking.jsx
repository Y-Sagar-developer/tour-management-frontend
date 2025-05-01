import React, { useState, useContext, useEffect } from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { Container, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookingTicket from './BookingTicket';

const Booking = ({ tour, avgRating }) => {
  const { price, reviews, title } = tour;
  const navigate = useNavigate();
  const { user, isGuest } = useContext(AuthContext);

  const [booking, setBooking] = useState({
    userId: user?._id || '',
    userEmail: user?.email || '',
    tourName: title,
    fullname: "",
    phone: "",
    guestSize: 1,
    bookAt: "",
  });

  const [showTicket, setShowTicket] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookingId, setBookingId] = useState(null);

  // Check authentication on component mount
  useEffect(() => {
    if (!user || isGuest) {
      // Check for token in cookies before redirecting
      const token = document.cookie.split('; ').find(row => row.startsWith('access_token='))?.split('=')[1];
      if (!token) {
        toast.warning("Please login with a real account to make a booking", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate('/login', { state: { from: `/tours/${tour._id}` } });
      }
    }
  }, [user, isGuest, navigate, tour._id]);

  const handleChange = (e) => {
    setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const serviceFee = 499;
  const totalAmount = Number(price) * Number(booking.guestSize) + Number(serviceFee);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Get token from both localStorage and cookies
    const token = localStorage.getItem("token") || document.cookie.split('; ').find(row => row.startsWith('access_token='))?.split('=')[1];
    
    if (!token || !user || isGuest) {
      toast.warning("Please login with a real account to make a booking", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate('/login', { state: { from: `/tours/${tour._id}` } });
      return;
    }

    // Validate booking data
    if (!booking.fullname || !booking.phone || !booking.bookAt || !booking.guestSize) {
      toast.error("Please fill in all required fields", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    setLoading(true);

    try {
      const bookingData = {
        userId: user._id,
        userEmail: user.email,
        tourName: title,
        fullname: booking.fullname,
        phone: booking.phone,
        guestSize: booking.guestSize,
        bookAt: booking.bookAt,
        totalAmount: totalAmount,
      };

      console.log('Sending booking request with token:', token ? 'Token exists' : 'No token');
      console.log('Booking data:', bookingData);

      const response = await fetch(`${BASE_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookingData)
      });

      const result = await response.json();
      console.log('Booking response:', result);

      if (!response.ok) {
        if (response.status === 401) {
          // Try to refresh the page once to restore the session
          if (!window.sessionStorage.getItem('attempted_refresh')) {
            window.sessionStorage.setItem('attempted_refresh', 'true');
            window.location.reload();
            return;
          }
          toast.warning("Your session has expired. Please login again.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setTimeout(() => {
            navigate('/login', { state: { from: `/tours/${tour._id}` } });
          }, 2000);
        } else {
          toast.error(result.message || 'Failed to book tour', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
        setLoading(false);
        return;
      }

      setLoading(false);
      // Store all necessary booking data
      const completeBookingData = {
        ...result.data,
        tourName: title,
        totalAmount: totalAmount,
        userEmail: user.email,
        fullname: booking.fullname,
        phone: booking.phone,
        guestSize: booking.guestSize,
        bookAt: booking.bookAt
      };
      
      // Navigate to the booking success page with the booking data
      navigate('/booking-success', { 
        state: { 
          booking: completeBookingData 
        },
        replace: true 
      });
      
      toast.success("Booking successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Clear the refresh attempt flag after successful booking
      window.sessionStorage.removeItem('attempted_refresh');
    } catch (err) {
      console.error('Booking error:', err);
      toast.error("Failed to book tour. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setLoading(false);
    }
  };

  if (showTicket && bookingData) {
    return <BookingTicket booking={bookingData} />;
  }

  // If not logged in or is guest, show login message
  if (!user || isGuest) {
    return (
      <div className="booking">
        <div className="booking_message">
          <h3>Please login with a real account to make a booking</h3>
          <Button 
            className="btn primary_btn" 
            onClick={() => navigate('/login')}
          >
            Login Now
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="booking">
      <div className="booking_top d-flex align-items-center justify-content-between">
        <h3>
          ₹{price}
          <span>/per person</span>
        </h3>
        <span className="tour_rating d-flex align-items-center">
          <i class="ri-star-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>
      {/* booking form  */}

      <div className="booking_form">
        <h5>Information</h5>
        <Form className="booking_info-form" onSubmit={handleSubmit}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullname"
              required
              onChange={handleChange}
              value={booking.fullname}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="tel"
              placeholder="Phone"
              id="phone"
              required
              onChange={handleChange}
              value={booking.phone}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              placeholder=""
              id="bookAt"
              required
              onChange={handleChange}
              value={booking.bookAt}
            />
            <input
              type="number"
              placeholder="Guest"
              id="guestSize"
              required
              onChange={handleChange}
              value={booking.guestSize}
              min="1"
            />
          </FormGroup>
        
          <div className="booking_bottom">
            <ListGroup>
              <ListGroupItem className="border-0 px-0">
                <h5 className="d-flex align-items-center gap-1">
                  ₹{price} <i className="ri-close-line"></i> {booking.guestSize} person
                </h5>
                <span>₹{price * booking.guestSize}</span>
              </ListGroupItem>
              <ListGroupItem className="border-0 px-0">
                <h5>Service charge</h5>
                <span>₹{serviceFee}</span>
              </ListGroupItem>
              <ListGroupItem className="border-0 px-0 total">
                <h5>Total</h5>
                <span>₹{totalAmount}</span>
              </ListGroupItem>
            </ListGroup>
            <Button 
              className="btn primary_btn w-100 mt-4" 
              type="submit" 
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Book Now'}
            </Button>
          </div>
        </Form>
      </div>
      {/* booking end  */}
    </div>
  );
};

export default Booking;
