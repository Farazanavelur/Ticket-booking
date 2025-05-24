import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Home.css';
import travelImage from '../assets/travel-bg.jpg';

const Home = () => {
  const [searchType, setSearchType] = useState('flight');
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [classType, setClassType] = useState('economy');
  const [busType, setBusType] = useState('ac');
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const searchParams = {
      type: searchType,
      departure,
      arrival,
      departureDate,
      returnDate,
      passengers,
      classType,
      busType
    };
    navigate('/search', { state: searchParams });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="home-container">
      <div className="hero-section" style={{ backgroundImage: `url(${travelImage})` }}>
        <div className="hero-content">
          <h1>Book Your Journey With Ease</h1>
          <p>Find and book flights, trains, and buses in just a few clicks</p>
        </div>
      </div>

      <div className="search-container">
        <div className="search-tabs">
          <button
            className={searchType === 'flight' ? 'active' : ''}
            onClick={() => setSearchType('flight')}
          >
            Flights
          </button>
          <button
            className={searchType === 'train' ? 'active' : ''}
            onClick={() => setSearchType('train')}
          >
            Trains
          </button>
          <button
            className={searchType === 'bus' ? 'active' : ''}
            onClick={() => setSearchType('bus')}
          >
            Buses
          </button>
        </div>

        <form onSubmit={handleSearch} className="search-form">
          <div className="form-group">
            <label>From</label>
            <input
              type="text"
              placeholder="Departure city"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>To</label>
            <input
              type="text"
              placeholder="Arrival city"
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Departure Date</label>
            <input
              type="date"
              value={departureDate}
              min={today}
              onChange={(e) => setDepartureDate(e.target.value)}
              required
            />
          </div>

          {searchType === 'flight' && (
            <div className="form-group">
              <label>Return Date (Optional)</label>
              <input
                type="date"
                value={returnDate}
                min={departureDate || today}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <label>Passengers</label>
            <select value={passengers} onChange={(e) => setPassengers(e.target.value)}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          {searchType === 'flight' && (
            <div className="form-group">
              <label>Class</label>
              <select value={classType} onChange={(e) => setClassType(e.target.value)}>
                <option value="economy">Economy</option>
                <option value="business">Business</option>
                <option value="first">First Class</option>
              </select>
            </div>
          )}

          {searchType === 'bus' && (
            <div className="form-group">
              <label>Bus Type</label>
              <select value={busType} onChange={(e) => setBusType(e.target.value)}>
                <option value="ac">AC</option>
                <option value="non-ac">Non-AC</option>
                <option value="sleeper">Sleeper</option>
              </select>
            </div>
          )}

          <button type="submit" className="search-button">Search</button>
        </form>
      </div>

      <div className="welcome-section">
        <h2>Welcome back, {currentUser?.firstName || 'Traveler'}!</h2>
        <p>Ready for your next adventure? Search for your preferred mode of transportation above.</p>
      </div>

      <div className="features-section">
        <h2>Why Book With Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✈️</div>
            <h3>Wide Selection</h3>
            <p>Choose from thousands of flights, trains, and buses</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Best Prices</h3>
            <p>We guarantee the best prices for your travels</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Booking</h3>
            <p>Your information and payments are always secure</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Easy Management</h3>
            <p>Manage all your bookings in one place</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;