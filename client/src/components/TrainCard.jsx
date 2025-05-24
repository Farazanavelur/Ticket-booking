import React from 'react';
import { FaTrain, FaClock, FaRupeeSign } from 'react-icons/fa';

const TrainCard = ({ train }) => {
  if (!train) {
    return <div className="train-info loading">Loading train information...</div>;
  }

  return (
    <div className="train-info">
      <h3>{train.name || 'Train not specified'}</h3>
      <p>
        <FaTrain /> Train Number: {train.number || 'Not specified'}
      </p>
      <p>
        <FaTrain /> Departure: {train.departureTime || 'N/A'}
      </p>
      <p>
        <FaTrain /> Arrival: {train.arrivalTime || 'N/A'}
      </p>
      <p className="duration">
        <FaClock /> Duration: {train.duration || 'Not specified'}
      </p>
      <p>
        <FaRupeeSign /> Price: ₹{train.price}
      </p>
      <p>Seats Available: {train.seatsAvailable}</p>
    </div>
  );
};

export default TrainCard;
