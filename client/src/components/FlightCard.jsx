import React from 'react';
import { FaPlane, FaClock, FaRupeeSign } from 'react-icons/fa';

const FlightCard = ({ flight }) => {
  if (!flight) {
    return <div className="flight-info">Loading flight information...</div>;
  }

  return (
    <div className="flight-info">
      <h3>{flight.airline}</h3>
      <p>
        <FaPlane /> Flight: {flight.flightNumber}
      </p>
      <p>
        <FaClock /> Departure: {flight.departureTime}
      </p>
      <p>
        <FaClock /> Arrival: {flight.arrivalTime}
      </p>
      <p>
        <FaClock /> Duration: {flight.duration}
      </p>
      <p>
        <FaRupeeSign /> Price: ₹{flight.price}
      </p>
      <p>Class: {flight.class}</p>
      <p>Seats Available: {flight.seatsAvailable}</p>
    </div>
  );
};

export default FlightCard;
