const mongoose = require('mongoose');

const transportSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['flight', 'train', 'bus'],
    required: true
  },
  operator: String,       // Airline name, train operator, bus company
  number: String,         // Flight number, train number, bus number
  departure: {
    location: String,     // Airport code, station name, city
    terminal: String,     // For flights
    time: Date
  },
  arrival: {
    location: String,
    terminal: String,     // For flights
    time: Date
  },
  duration: Number,       // In minutes
  price: Number,
  availableSeats: Number,
  class: String,          // For flights
  busType: String,        // AC, Non-AC, Sleeper
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transport', transportSchema);