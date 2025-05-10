import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/SearchResults.css';
import FlightCard from '../components/FlightCard';
import TrainCard from '../components/TrainCard';
import BusCard from '../components/BusCard';

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

  const generateMockResults = (params) => {
    if (params.type === 'flight') {
      return [
        {
          id: 1,
          airline: 'Air India',
          flightNumber: 'AI101',
          departureTime: '08:00',
          arrivalTime: '10:30',
          duration: '2h 30m',
          price: 5000,
          seatsAvailable: 24,
          class: params.classType
        },
        {
          id: 2,
          airline: 'IndiGo',
          flightNumber: '6E205',
          departureTime: '12:15',
          arrivalTime: '14:45',
          duration: '2h 30m',
          price: 4500,
          seatsAvailable: 12,
          class: params.classType
        }
      ];
    } else if (params.type === 'train') {
      return [
        {
          id: 1,
          name: 'Rajdhani Express',
          number: '12301',
          departureTime: '16:30',
          arrivalTime: '06:00',
          duration: '13h 30m',
          price: 1500,
          seatsAvailable: 120
        },
        {
          id: 2,
          name: 'Shatabdi Express',
          number: '12002',
          departureTime: '06:00',
          arrivalTime: '12:30',
          duration: '6h 30m',
          price: 1800,
          seatsAvailable: 85
        }
      ];
    } else {
      return [
        {
          id: 1,
          operator: 'Volvo Travels',
          busNumber: 'VOL123',
          departureTime: '22:00',
          arrivalTime: '06:00',
          duration: '8h',
          price: 1200,
          seatsAvailable: 15,
          type: params.busType
        },
        {
          id: 2,
          operator: 'SRS Travels',
          busNumber: 'SRS456',
          departureTime: '20:30',
          arrivalTime: '04:30',
          duration: '8h',
          price: 1000,
          seatsAvailable: 22,
          type: params.busType
        }
      ];
    }
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