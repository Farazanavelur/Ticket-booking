const { searchTrains } = require('../services/trainService');

const searchTrainsController = async (req, res) => {
  try {
    const { source, destination, date } = req.query;
    const trains = await searchTrains(source, destination, date);
    res.json(trains);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { searchTrainsController };
