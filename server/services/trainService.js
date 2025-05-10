const axios = require('axios');
require('dotenv').config();

const getPNRStatus = async (pnrNumber) => {
  try {
    const response = await axios.get('https://irctc1.p.rapidapi.com/api/v3/getPNRStatusDetail', {
      params: { pnrNumber },
headers: {
  'x-rapidapi-host': 'irctc1.p.rapidapi.com',
  'x-rapidapi-key': process.env.RAPID_API_KEY
}
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching PNR status:', error);
    throw error;
  }
};

const searchTrains = async (source, destination, date) => {
  try {
    // Note: You'll need to check the exact API endpoint and parameters from IRCTC documentation
    const response = await axios.get('https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations', {
      params: {
        fromStationCode: source,
        toStationCode: destination,
        dateOfJourney: date
      },
      headers: {
        'x-rapidapi-host': process.env.IRCTC_API_HOST,
        'x-rapidapi-key': process.env.IRCTC_API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching trains:', error);
    throw error;
  }
};

module.exports = { getPNRStatus, searchTrains };