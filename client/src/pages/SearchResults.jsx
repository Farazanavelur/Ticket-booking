import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/SearchResults.css';
import FlightCard from '../components/FlightCard';
import TrainCard from '../components/TrainCard';
import BusCard from '../components/BusCard';
import flightsData from '../../flight-data.json';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = useMemo(() => location.state || {}, [location.state]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        // Simulate API call with mock data
        const mockResults = generateMockResults(searchParams);
        setResults(mockResults);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch results');
        setLoading(false);
        console.error(err);
      }
    };

    fetchResults();
  }, [searchParams]);

  const calculateDuration = (start, end) => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const diff = (endTime - startTime) / 1000 / 60; // in minutes

    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;

    return `${hours}h ${minutes}m`;
  };

  const generateMockResults = (params) => {
    const { departure, arrival, departureDate, type } = params;

    const formatDateOnly = (dateTimeStr) => dateTimeStr.split(' ')[0];

    if (type === 'flight') {
      return flightsData.flights.filter(flight =>
        flight.origin.toLowerCase() === departure.toLowerCase() &&
        flight.destination.toLowerCase() === arrival.toLowerCase() &&
        formatDateOnly(flight.departure_time) === departureDate
      ).map((flight, index) => ({
        id: index + 1,
        airline: flight.airline,
        flightNumber: flight.flight_number,
        departureTime: flight.departure_time.split(' ')[1],
        arrivalTime: flight.arrival_time.split(' ')[1],
        duration: calculateDuration(flight.departure_time, flight.arrival_time),
        price: flight.price,
        seatsAvailable: Math.floor(Math.random() * 50) + 1, // Random availability
        class: params.classType
      }));
    }

    if (type === 'train') {
      return flightsData.trains.filter(train =>
        train.origin.toLowerCase() === departure.toLowerCase() &&
        train.destination.toLowerCase() === arrival.toLowerCase() &&
        formatDateOnly(train.departure_time) === departureDate
      ).map((train, index) => ({
        id: index + 1,
        name: train.train_name,
        number: train.train_number,
        departureTime: train.departure_time.split(' ')[1],
        arrivalTime: train.arrival_time.split(' ')[1],
        duration: calculateDuration(train.departure_time, train.arrival_time),
        price: train.price,
        seatsAvailable: Math.floor(Math.random() * 200) + 50
      }));
    }

    if (type === 'bus') {
      return flightsData.buses.filter(bus =>
        bus.origin.toLowerCase() === departure.toLowerCase() &&
        bus.destination.toLowerCase() === arrival.toLowerCase() &&
        formatDateOnly(bus.departure_time) === departureDate
      ).map((bus, index) => ({
        id: index + 1,
        operator: bus.operator,
        busNumber: bus.bus_number,
        departureTime: bus.departure_time.split(' ')[1],
        arrivalTime: bus.arrival_time.split(' ')[1],
        duration: calculateDuration(bus.departure_time, bus.arrival_time),
        price: bus.price,
        seatsAvailable: Math.floor(Math.random() * 30) + 10,
        type: bus.bus_type
      }));
    }

    return [];
  };


  const handleBookNow = (item) => {
    navigate('/book', { state: { item, searchParams } });
  };

  if (loading) {
    return <div className="loading">Loading results...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="search-results-container">
      <h2>Available {searchParams.type === 'flight' ? 'Flights' : searchParams.type === 'train' ? 'Trains' : 'Buses'}</h2>
      <div className="search-params">
        <p><strong>Route:</strong> {searchParams.departure} to {searchParams.arrival}</p>
        <p><strong>Date:</strong> {searchParams.departureDate}</p>
        {searchParams.returnDate && <p><strong>Return Date:</strong> {searchParams.returnDate}</p>}
        <p><strong>Passengers:</strong> {searchParams.passengers}</p>
        {searchParams.type === 'flight' && <p><strong>Class:</strong> {searchParams.classType}</p>}
        {searchParams.type === 'bus' && <p><strong>Bus Type:</strong> {searchParams.busType}</p>}
      </div>

      <div className="results-list">
        {results.length > 0 ? (
          results.map((item) => (
            <div key={item.id} className="result-card">
              {searchParams.type === 'flight' && <FlightCard flight={item} />}
              {searchParams.type === 'train' && <TrainCard train={item} />}
              {searchParams.type === 'bus' && <BusCard bus={item} />}
              <div className="book-section">
                <div className="price">₹{item.price}</div>
                <button
                  onClick={() => handleBookNow(item)}
                  className="book-button"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">No results found for your search criteria.</div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;