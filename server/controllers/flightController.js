const { searchFlights } = require('../services/flightService');

const searchFlightsController = async (req, res) => {
  try {
    const { departure, arrival, date } = req.query;
    const flights = await searchFlights(departure, arrival, date);
    res.json(flights);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { searchFlightsController };