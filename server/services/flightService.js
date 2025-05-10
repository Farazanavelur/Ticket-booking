const axios = require('axios');
require('dotenv').config();

const searchFlights = async (departure, arrival, date) => {
  try {
    const response = await axios.get('http://api.aviationstack.com/v1/flights', {
      params: {
        access_key: process.env.AVIATIONSTACK_API_KEY,
        dep_iata: departure,
        arr_iata: arrival,
        flight_date: date
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching flights:', error);
    throw error;
  }
};

module.exports = { searchFlights };