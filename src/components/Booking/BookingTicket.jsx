import React from 'react';
import './booking-ticket.css';

const BookingTicket = ({ booking }) => {
  if (!booking) {
    return <div>Loading booking details...</div>;
  }

  const {
    _id,
    tourName,
    fullname,
    guestSize,
    phone,
    bookAt,
    totalAmount,
    userEmail
  } = booking;

  // Format date without external library
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="booking-ticket">
      <div className="ticket-header">
        <h2>Booking Confirmation</h2>
        <p className="booking-id">Booking ID: {_id}</p>
      </div>

      <div className="ticket-content">
        <div className="ticket-section">
          <h3>Tour Details</h3>
          <p><strong>Tour Name:</strong> {tourName}</p>
          <p><strong>Date:</strong> {formatDate(bookAt)}</p>
          <p><strong>Total Amount:</strong> ₹{totalAmount}</p>
        </div>

        <div className="ticket-section">
          <h3>Guest Information</h3>
          <p><strong>Name:</strong> {fullname}</p>
          <p><strong>Email:</strong> {userEmail}</p>
          <p><strong>Phone:</strong> {phone}</p>
          <p><strong>Number of Guests:</strong> {guestSize}</p>
        </div>

        <div className="ticket-footer">
          <p>Thank you for booking with us!</p>
          <p>Please keep this confirmation for your records.</p>
        </div>
      </div>
    </div>
  );
};

export default BookingTicket; 