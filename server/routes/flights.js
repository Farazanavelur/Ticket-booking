// server/routes/flights.js
const axios = require('axios');
const router = require('express').Router();

router.get('/search', async (req, res) => {
  try {
    const { departure, arrival, date } = req.query;
    const response = await axios.get(
      `http://api.aviationstack.com/v1/flights?access_key=${process.env.AVIATIONSTACK_KEY}
      &dep_iata=${departure}&arr_iata=${arrival}&flight_date=${date}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch flights' });
  }
});

module.exports = router;