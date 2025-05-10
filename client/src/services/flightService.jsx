import axios from 'axios';

// Aviation Stack API Key
const AVIATIONSTACK_API_KEY = 'a5baca77e592d4770a62c0a68f2a5cee';

/**
 * Service for fetching real-time flight data
 */

// Create an axios instance for flight API calls with error handling
const flightAxios = axios.create({
  baseURL: 'http://api.aviationstack.com/v1',
  timeout: 15000
});

// Add response interceptor for consistent error handling
flightAxios.interceptors.response.use(
  response => response,
  error => {
    console.error('Flight API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

/**
 * Search for flights based on departure, arrival airports, and date
 * @param {string} departure - Departure airport IATA code (e.g., 'DEL')
 * @param {string} arrival - Arrival airport IATA code (e.g., 'BOM')
 * @param {string} date - Flight date in YYYY-MM-DD format
 * @returns {Promise<object>} - Flight data
 */
export const searchFlights = async (departure, arrival, date) => {
  try {
    console.log(`Searching flights from ${departure} to ${arrival} on ${date}`);
    
    const response = await flightAxios.get('/flights', {
      params: {
        access_key: 'a5baca77e592d4770a62c0a68f2a5cee'
        ,
        dep_iata: departure,
        arr_iata: arrival,
        flight_date: date
      }
    });
    
    if (response.data && response.data.data) {
      // Process and format the flight data for our application
      const formattedFlights = response.data.data.map(flight => ({
        id: `${flight.flight.iata || flight.flight.icao}`,
        airline: flight.airline.name,
        flightNumber: flight.flight.iata || flight.flight.icao,
        departure: {
          airport: `${flight.departure.airport} (${flight.departure.iata})`,
          time: new Date(flight.departure.scheduled).toLocaleTimeString(),
          terminal: flight.departure.terminal || 'N/A'
        },
        arrival: {
          airport: `${flight.arrival.airport} (${flight.arrival.iata})`,
          time: new Date(flight.arrival.scheduled).toLocaleTimeString(),
          terminal: flight.arrival.terminal || 'N/A'
        },
        duration: calculateDuration(
          flight.departure.scheduled,
          flight.arrival.scheduled
        ),
        class: 'economy', // API doesn't provide class info, default to economy
        status: flight.flight_status
      }));
      
      return { 
        success: true,
        data: formattedFlights 
      };
    } else {
      throw new Error('Invalid flight data structure from API');
    }
  } catch (error) {
    console.error('Error searching flights:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch flight data'
    };
  }
};

/**
 * Utility function to calculate flight duration
 * @param {string} departureTime - Departure time string
 * @param {string} arrivalTime - Arrival time string
 * @returns {string} - Formatted duration (e.g., "2h 15m")
 */
function calculateDuration(departureTime, arrivalTime) {
  const dep = new Date(departureTime);
  const arr = new Date(arrivalTime);
  const diffMinutes = Math.floor((arr - dep) / (1000 * 60));
  
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;
  
  return `${hours}h ${minutes}m`;
}
