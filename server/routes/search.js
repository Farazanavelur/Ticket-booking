const express = require('express');
const router = express.Router();
const axios = require('axios');
const { authenticateUser } = require('../middleware/auth');

// Search flights
router.get('/flights', authenticateUser, async (req, res) => {
  try {
    const { departure, arrival, date, classType } = req.query;

    // Using AviationStack API
    const response = await axios.get('http://api.aviationstack.com/v1/flights', {
      params: {
        access_key: process.env.AVIATIONSTACK_API_KEY,
        dep_iata: departure,
        arr_iata: arrival,
        flight_date: date,
        flight_status: 'scheduled'
      }
    });

    // Filter by class if specified
    let flights = response.data.data;
    if (classType) {
      flights = flights.filter(flight => 
        flight.flight.class === classType.toLowerCase()
      );
    }

    // Format response
    const formattedFlights = flights.map(flight => ({
      id: flight.flight.number,
      airline: flight.airline.name,
      flightNumber: flight.flight.number,
      departure: {
        airport: flight.departure.airport,
        time: flight.departure.scheduled,
        terminal: flight.departure.terminal
      },
      arrival: {
        airport: flight.arrival.airport,
        time: flight.arrival.scheduled,
        terminal: flight.arrival.terminal
      },
      duration: calculateDuration(
        flight.departure.scheduled,
        flight.arrival.scheduled
      ),
      class: flight.flight.class || 'economy',
      price: calculateFlightPrice(
        flight.flight.class || 'economy',
        flight.departure.scheduled
      )
    }));

    res.json({
      success: true,
      count: formattedFlights.length,
      flights: formattedFlights
    });

  } catch (error) {
    console.error('Flight search error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error searching flights',
      error: process.env.NODE_ENV === 'development' ? error.message : null
    });
  }
});

// Search trains
router.get('/trains', authenticateUser, async (req, res) => {
  try {
    const { source, destination, date } = req.query;

    // Using RailYatri API (example)
    const response = await axios.get('https://www.railyatri.in/api/train-between-stations', {
      params: {
        from: source,
        to: destination,
        date: date
      }
    });

    // Format response
    const trains = response.data.trains.map(train => ({
      id: train.train_number,
      name: train.train_name,
      number: train.train_number,
      departure: {
        station: train.from_station_name,
        time: train.departure_time
      },
      arrival: {
        station: train.to_station_name,
        time: train.arrival_time
      },
      duration: train.duration,
      classes: train.available_classes,
      price: calculateTrainPrice(train.train_type)
    }));

    res.json({
      success: true,
      count: trains.length,
      trains
    });

  } catch (error) {
    console.error('Train search error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error searching trains',
      error: process.env.NODE_ENV === 'development' ? error.message : null
    });
  }
});

// Search buses
router.get('/buses', authenticateUser, async (req, res) => {
  try {
    const { source, destination, date, busType } = req.query;

    // Mock response since most bus APIs aren't free
    const mockBuses = [
      {
        id: 'BUS123',
        operator: 'Volvo Travels',
        busNumber: 'VOL123',
        departure: {
          station: source,
          time: '22:00'
        },
        arrival: {
          station: destination,
          time: '06:00'
        },
        duration: '8h',
        type: 'ac',
        seatsAvailable: 15,
        price: 1200
      },
      {
        id: 'BUS456',
        operator: 'SRS Travels',
        busNumber: 'SRS456',
        departure: {
          station: source,
          time: '20:30'
        },
        arrival: {
          station: destination,
          time: '04:30'
        },
        duration: '8h',
        type: 'non-ac',
        seatsAvailable: 22,
        price: 800
      }
    ];

    // Filter by bus type if specified
    const buses = busType 
      ? mockBuses.filter(bus => bus.type === busType.toLowerCase())
      : mockBuses;

    res.json({
      success: true,
      count: buses.length,
      buses
    });

  } catch (error) {
    console.error('Bus search error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error searching buses',
      error: process.env.NODE_ENV === 'development' ? error.message : null
    });
  }
});

// Helper functions
function calculateDuration(departureTime, arrivalTime) {
  const dep = new Date(departureTime);
  const arr = new Date(arrivalTime);
  const diff = (arr - dep) / (1000 * 60); // in minutes
  
  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;
  return `${hours}h ${minutes}m`;
}

function calculateFlightPrice(classType, departureTime) {
  const basePrices = {
    economy: 3000,
    business: 8000,
    first: 15000
  };
  
  const dep = new Date(departureTime);
  const isPeak = dep.getHours() >= 8 && dep.getHours() <= 20;
  const multiplier = isPeak ? 1.2 : 0.9;
  
  return Math.round(basePrices[classType.toLowerCase()] * multiplier);
}

function calculateTrainPrice(trainType) {
  const typeMap = {
    'express': 500,
    'superfast': 700,
    'rajdhani': 1500,
    'shatabdi': 1200,
    'duronto': 1000
  };
  
  return typeMap[trainType.toLowerCase()] || 600;
}

module.exports = router;