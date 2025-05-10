import React from 'react';
import { FaPlane, FaClock, FaRupeeSign } from 'react-icons/fa';

const FlightCard = ({ flight }) => {
  // Add a check to ensure flight exists
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
        <FaPlane /> Departure: {flight.departure?.airport || 'N/A'} at {flight.departure?.time || 'N/A'}
        {flight.departure?.terminal && ` (Terminal ${flight.departure.terminal})`}
      </p>
      <p>
        <FaPlane /> Arrival: {flight.arrival?.airport || 'N/A'} at {flight.arrival?.time || 'N/A'}
        {flight.arrival?.terminal && ` (Terminal ${flight.arrival.terminal})`}
      </p>
      <p className="duration">
        <FaClock /> Duration: {flight.duration || 'N/A'}
      </p>
      <p>
        <FaRupeeSign /> Class: {flight.class || 'N/A'}
      </p>
    </div>
  );
};

export default FlightCard;