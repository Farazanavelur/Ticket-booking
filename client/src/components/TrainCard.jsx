import React from 'react';
import { FaTrain, FaClock, FaRupeeSign } from 'react-icons/fa'; // Assuming similar icons

const TrainCard = ({ train }) => {
  // Add null check for the entire train object
  if (!train) {
    return <div className="train-info loading">Loading train information...</div>;
  }

  return (
    <div className="train-info">
      <h3>{train.name || 'Train not specified'}</h3>
      <p>
        <FaTrain /> Train: {train.trainNumber || 'Not specified'}
      </p>
      {/* Add null checks for nested objects */}
      {train.departure && (
        <p>
          <FaTrain /> Departure: {train.departure.station} at {train.departure.time}
          {train.departure.platform && ` (Platform ${train.departure.platform})`}
        </p>
      )}
      {train.arrival && (
        <p>
          <FaTrain /> Arrival: {train.arrival.station} at {train.arrival.time}
          {train.arrival.platform && ` (Platform ${train.arrival.platform})`}
        </p>
      )}
      <p className="duration">
        <FaClock /> Duration: {train.duration || 'Not specified'}
      </p>
      <p>
        <FaRupeeSign /> Class: {train.class || 'Not specified'}
      </p>
    </div>
  );
};

export default TrainCard;