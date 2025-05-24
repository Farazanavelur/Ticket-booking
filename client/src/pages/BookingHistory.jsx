import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BookingHistory.css';

const BookingHistory = () => {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('bookingHistory')) || [];
    setHistory(stored);
  }, []);

  return (
    <div className="booking-history-container">
      <h2>Your Booking History</h2>

      {history.length === 0 ? (
        <div className="empty-history">
          <p>No bookings found.</p>
          <button onClick={() => navigate('/')}>Book Now</button>
        </div>
      ) : (
        <div className="history-list">
          {history.map((item, index) => {
            const type = item.bookingDetails.searchParams.type;
            const details = item.bookingDetails.item;
            const passengers = item.bookingDetails.passengers.length;

            return (
              <div className="history-card" key={index}>
                <h3>{type.toUpperCase()} Booking</h3>

                <div className="card-content">
                  {type === 'flight' && (
                    <>
                      <p><strong>Flight:</strong> {details.airline} ({details.flightNumber})</p>
                      <p><strong>Class:</strong> {item.bookingDetails.searchParams.classType}</p>
                    </>
                  )}
                  {type === 'train' && (
                    <p><strong>Train:</strong> {details.name} ({details.number})</p>
                  )}
                  {type === 'bus' && (
                    <p><strong>Bus:</strong> {details.operator} ({details.busNumber})</p>
                  )}
                  <p><strong>Passengers:</strong> {passengers}</p>
                  <p><strong>Amount:</strong> ₹{item.paymentDetails.amount}</p>
                  <p><strong>Paid Via:</strong> {item.paymentDetails.method}</p>
                  <p><strong>Transaction ID:</strong> {item.paymentDetails.transactionId}</p>
                  <p><strong>Date:</strong> {new Date(item.paymentDetails.timestamp).toLocaleString()}</p>
                  <p className={`status ${item.paymentDetails.status}`}>Status: {item.paymentDetails.status}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
