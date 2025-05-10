import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Ticket.css';

const Ticket = () => {
  const location = useLocation();
  const { bookingDetails, paymentDetails } = location.state || {};

  if (!bookingDetails || !paymentDetails) {
    return <div className="ticket-error">No ticket information found</div>;
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="ticket-container">
      <div className="ticket-header">
        <h2>Booking Confirmed!</h2>
        <p>Your ticket has been successfully booked. Thank you for choosing us!</p>
      </div>

      <div className="ticket-card">
        <div className="ticket-header-section">
          <h3>E-Ticket</h3>
          <div className="ticket-status">Confirmed</div>
        </div>

        <div className="ticket-details">
          {bookingDetails.searchParams.type === 'flight' && (
            <>
              <div className="detail-row">
                <span>Flight:</span>
                <span>{bookingDetails.item.airline} ({bookingDetails.item.flightNumber})</span>
              </div>
              <div className="detail-row">
                <span>Class:</span>
                <span>{bookingDetails.searchParams.classType}</span>
              </div>
            </>
          )}
          {bookingDetails.searchParams.type === 'train' && (
            <div className="detail-row">
              <span>Train:</span>
              <span>{bookingDetails.item.name} ({bookingDetails.item.number})</span>
            </div>
          )}
          {bookingDetails.searchParams.type === 'bus' && (
            <div className="detail-row">
              <span>Bus:</span>
              <span>{bookingDetails.item.operator} ({bookingDetails.item.busNumber})</span>
            </div>
          )}
          <div className="detail-row">
            <span>From:</span>
            <span>{bookingDetails.searchParams.departure}</span>
          </div>
          <div className="detail-row">
            <span>To:</span>
            <span>{bookingDetails.searchParams.arrival}</span>
          </div>
          <div className="detail-row">
            <span>Departure:</span>
            <span>{formatDate(bookingDetails.searchParams.departureDate)} at {bookingDetails.item.departureTime}</span>
          </div>
          {bookingDetails.searchParams.returnDate && (
            <div className="detail-row">
              <span>Return:</span>
              <span>{formatDate(bookingDetails.searchParams.returnDate)}</span>
            </div>
          )}
        </div>

        <div className="passenger-details">
          <h4>Passenger Details</h4>
          {bookingDetails.passengers.map((passenger, index) => (
            <div key={index} className="passenger-row">
              <span>Passenger {index + 1}:</span>
              <span>{passenger.name} ({passenger.gender}, {passenger.age} years)</span>
            </div>
          ))}
        </div>

        <div className="payment-details">
          <h4>Payment Details</h4>
          <div className="detail-row">
            <span>Amount Paid:</span>
            <span>₹{paymentDetails.amount}</span>
          </div>
          <div className="detail-row">
            <span>Payment Method:</span>
            <span>{paymentDetails.method}</span>
          </div>
          <div className="detail-row">
            <span>Transaction ID:</span>
            <span>{paymentDetails.transactionId}</span>
          </div>
          <div className="detail-row">
            <span>Status:</span>
            <span className="payment-status">{paymentDetails.status}</span>
          </div>
        </div>

        <div className="ticket-footer">
          <p>Thank you for booking with us! Have a safe journey.</p>
          <button 
            className="download-button"
            onClick={() => window.print()}
          >
            Download Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ticket;