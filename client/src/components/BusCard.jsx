import React from 'react';
import { FaBus, FaClock, FaRupeeSign } from 'react-icons/fa';

const BusCard = ({ bus }) => {
  // Add null check for the entire bus object
  if (!bus) {
    return <div className="bus-info loading">Loading bus information...</div>;
  }

  return (
    <div className="bus-info">
      <h3>{bus.name || 'Bus not specified'}</h3>
      {bus.number && (
        <p>
          <FaBus /> Number: {bus.number}
        </p>
      )}
      
      {/* Check if departure exists before accessing its properties */}
      {bus.departure ? (
        <p>
          <FaBus /> Departure: {bus.departure.station} at {bus.departure.time}
        </p>
      ) : (
        <p><FaBus /> Departure: Not available</p>
      )}
      
      {/* Check if arrival exists before accessing its properties */}
      {bus.arrival ? (
        <p>
          <FaBus /> Arrival: {bus.arrival.station} at {bus.arrival.time}
        </p>
      ) : (
        <p><FaBus /> Arrival: Not available</p>
      )}
      
      <p className="duration">
        <FaClock /> Duration: {bus.duration || 'Not specified'}
      </p>
      
      {/* Check if type exists */}
      {bus.type && (
        <p>
          <FaBus /> Type: {bus.type}
        </p>
      )}
      
      {/* Check if price exists */}
      {bus.price && (
        <p>
          <FaRupeeSign /> Price: {bus.price}
        </p>
      )}
    </div>
  );
};

export default BusCard;