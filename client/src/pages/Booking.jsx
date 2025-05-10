import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Booking.css';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { item, searchParams } = location.state || {};
  const [passengers, setPassengers] = useState(
    Array(parseInt(searchParams?.passengers || 1)).fill({
      name: '',
      age: '',
      gender: 'male'
    })
  );
  const [contactEmail, setContactEmail] = useState(currentUser?.email || '');
  const [contactPhone, setContactPhone] = useState(currentUser?.phone || '');
  const [error, setError] = useState('');

  if (!item || !searchParams) {
    navigate('/');
    return null;
  }

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value
    };
    setPassengers(updatedPassengers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    for (let i = 0; i < passengers.length; i++) {
      if (!passengers[i].name || !passengers[i].age) {
        setError(`Please fill all details for passenger ${i + 1}`);
        return;
      }
    }

    if (!contactEmail || !contactPhone) {
      setError('Please fill all contact details');
      return;
    }

    // Proceed to payment
    const bookingDetails = {
      item,
      searchParams,
      passengers,
      contactInfo: {
        email: contactEmail,
        phone: contactPhone
      },
      totalAmount: item.price * passengers.length
    };

    navigate('/payment', { state: bookingDetails });
  };

  return (
    <div className="booking-container">
      <h2>Complete Your Booking</h2>
      
      <div className="booking-summary">
        <h3>Journey Details</h3>
        {searchParams.type === 'flight' && (
          <div>
            <p><strong>Flight:</strong> {item.airline} ({item.flightNumber})</p>
            <p><strong>Route:</strong> {searchParams.departure} to {searchParams.arrival}</p>
            <p><strong>Departure:</strong> {searchParams.departureDate} at {item.departureTime}</p>
            <p><strong>Arrival:</strong> {item.arrivalTime}</p>
            <p><strong>Duration:</strong> {item.duration}</p>
            <p><strong>Class:</strong> {searchParams.classType}</p>
          </div>
        )}
        {searchParams.type === 'train' && (
          <div>
            <p><strong>Train:</strong> {item.name} ({item.number})</p>
            <p><strong>Route:</strong> {searchParams.departure} to {searchParams.arrival}</p>
            <p><strong>Departure:</strong> {searchParams.departureDate} at {item.departureTime}</p>
            <p><strong>Arrival:</strong> {item.arrivalTime}</p>
            <p><strong>Duration:</strong> {item.duration}</p>
          </div>
        )}
        {searchParams.type === 'bus' && (
          <div>
            <p><strong>Bus:</strong> {item.operator} ({item.busNumber})</p>
            <p><strong>Route:</strong> {searchParams.departure} to {searchParams.arrival}</p>
            <p><strong>Departure:</strong> {searchParams.departureDate} at {item.departureTime}</p>
            <p><strong>Arrival:</strong> {item.arrivalTime}</p>
            <p><strong>Duration:</strong> {item.duration}</p>
            <p><strong>Bus Type:</strong> {item.type}</p>
          </div>
        )}
        <p><strong>Total Amount:</strong> ₹{item.price * passengers.length}</p>
      </div>

      <form onSubmit={handleSubmit} className="booking-form">
        <div className="passenger-details">
          <h3>Passenger Details</h3>
          {passengers.map((passenger, index) => (
            <div key={index} className="passenger-form">
              <h4>Passenger {index + 1}</h4>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={passenger.name}
                  onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Age</label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={passenger.age}
                    onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select
                    value={passenger.gender}
                    onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="contact-details">
          <h3>Contact Information</h3>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              required
            />
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="proceed-button">
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default Booking;