const router = require('express').Router();

router.get('/search', async (req, res) => {
  try {
    const { departure, arrival, date } = req.query;
    console.log('Query Params:', { departure, arrival, date });

    res.setHeader('Access-Control-Allow-Origin', '*');

    const url = `https://google-flights2.p.rapidapi.com/api/v1/searchFlights?departure=${departure}&arrival=${arrival}&date=${date}`;

    // Dynamic import of fetch
    const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'fd3c4fe28fmsha06678c7bbb4b38p1759d0jsn5c5a36d9ce3d',
        'x-rapidapi-host': 'google-flights2.p.rapidapi.com'
      }
    });

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error('Backend error:', error);
    res.status(500).json({ error: 'Failed to fetch flight data' });
  }
});

module.exports = router;
