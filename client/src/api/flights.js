// client/src/api/flights.js
export const fetchFlights = async (departure, arrival, date) => {
    const response = await fetch(
      `http://localhost:5000/api/flights/search?departure=${departure}&arrival=${arrival}&date=${date}`
    );
    return await response.json();
  };