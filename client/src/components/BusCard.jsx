import React from 'react';
import { FaBus, FaClock, FaRupeeSign } from 'react-icons/fa';

const BusCard = ({ bus }) => {
  if (!bus) {
    return <div className="bus-info loading">Loading bus information...</div>;
  }

  return (
    <div className="bus-info">
      <h3>{bus.operator || 'Operator not specified'}</h3>
      <p>
        <FaBus /> Bus Number: {bus.busNumber || 'Not specified'}
      </p>
      <p>
        <FaBus /> Departure: {bus.departureTime || 'Not available'}
      </p>
      <p>
        <FaBus /> Arrival: {bus.arrivalTime || 'Not available'}
      </p>
      <p>
        <FaClock /> Duration: {bus.duration || 'Not specified'}
      </p>
      <p>
        <FaBus /> Type: {bus.type || 'Not specified'}
      </p>
      <p>
        <FaRupeeSign /> Price: ₹{bus.price}
      </p>
      <p>Seats Available: {bus.seatsAvailable}</p>
    </div>
  );
};

export default BusCard;
