// client/src/api/flights.js
export const fetchFlights = async (departure, arrival, date) => {
    const response = await fetch(
      `http://your-server-domain/api/flights?departure=${departure}&arrival=${arrival}&date=${date}`
    );
    return await response.json();
  };