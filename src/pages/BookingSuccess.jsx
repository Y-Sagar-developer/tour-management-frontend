import React, { useRef } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link, useLocation } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import '../styles/booking-success.css';

const BookingSuccess = () => {
  const location = useLocation();
  const ticketRef = useRef(null);
  
  const booking = location.state?.booking || {
    _id: '6812293d0532a0f30c011c17',
    tourName: 'Snowy Mountains, Thailand',
    fullname: 'sagar',
    guestSize: 6,
    phone: '7677676',
    bookAt: '2024-03-22',
    totalAmount: 6400,
    userEmail: 'siva@gmail.com'
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Create QR code data
  const qrData = JSON.stringify({
    bookingId: booking._id,
    tourName: booking.tourName,
    guestName: booking.fullname,
    date: booking.bookAt
  });

  const handlePrint = () => {
    window.print();
  };

  const downloadTicket = async () => {
    try {
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;

      const ticket = ticketRef.current;
      const canvas = await html2canvas(ticket, {
        scale: 2,
        logging: false,
        useCORS: true
      });
      
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);
      
      const fileName = `ticket-${booking._id}-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to download ticket. Please try again.');
    }
  };

  return (
    <section className="booking-page">
      <Container>
        <div className="page-header">
          <h1>Your Booking Ticket</h1>
        </div>
        
        <Row className="justify-content-center">
          <Col lg="10">
            <div className="ticket-container" ref={ticketRef}>
              <div className="ticket-header">
                <div className="bus-info">
                  <i className="ri-map-pin-line bus-icon"></i>
                  <span className="bus-name">TRAVEL WORLD</span>
                  <span className="bus-number">#{booking._id.slice(-8)}</span>
                </div>
                <div className="ticket-type">
                  Tour Ticket
                </div>
              </div>

              <div className="ticket-body">
                <div className="ticket-main">
                  <div className="ticket-row">
                    <div className="ticket-field">
                      <label>Tour Package</label>
                      <span>{booking.tourName}</span>
                    </div>
                    <div className="ticket-field price-field">
                      <label>Total Amount</label>
                      <span className="price">₹{booking.totalAmount}</span>
                      <span className="payment-status">Paid</span>
                    </div>
                  </div>

                  <div className="ticket-row">
                    <div className="ticket-field">
                      <label>Guest Name</label>
                      <span>{booking.fullname}</span>
                    </div>
                    <div className="ticket-field">
                      <label>Travel Date</label>
                      <span>{formatDate(booking.bookAt)}</span>
                    </div>
                  </div>

                  <div className="ticket-row">
                    <div className="ticket-field">
                      <label>Contact</label>
                      <span>{booking.phone}</span>
                    </div>
                    <div className="ticket-field">
                      <label>Email</label>
                      <span>{booking.userEmail}</span>
                    </div>
                  </div>

                  <div className="ticket-row">
                    <div className="ticket-field">
                      <label>Number of Guests</label>
                      <span>{booking.guestSize} persons</span>
                    </div>
                    <div className="ticket-field">
                      <label>Booking ID</label>
                      <span>{booking._id}</span>
                    </div>
                  </div>
                </div>

                <div className="ticket-qr">
                  <QRCodeSVG
                    value={qrData}
                    size={80}
                    level="H"
                    includeMargin={true}
                    className="qr-code"
                  />
                  <div className="ticket-note">
                    Scan QR code to verify ticket
                  </div>
                </div>
              </div>

              <div className="ticket-footer">
                <div className="contact-info">
                  <i className="ri-customer-service-2-line"></i>
                  Need help? Contact support
                </div>
              </div>
            </div>

            <div className="action-buttons">
              <button className="btn home-btn" onClick={handlePrint}>
                <i className="ri-printer-line"></i> Print Ticket
              </button>
              <button className="btn tours-btn" onClick={downloadTicket}>
                <i className="ri-download-line"></i> Download PDF
              </button>
              <Link to="/home" className="btn home-btn">
                <i className="ri-home-line"></i> Back to Home
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BookingSuccess; 