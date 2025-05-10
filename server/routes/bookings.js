const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { authenticateUser } = require('../middleware/auth');

// Create a new booking
router.post('/', authenticateUser, async (req, res) => {
  try {
    const { transportType, bookingDetails, paymentDetails } = req.body;
    
    const booking = new Booking({
      user: req.user.id,
      transportType,
      bookingDetails,
      paymentStatus: paymentDetails ? 'completed' : 'pending',
      paymentDetails: paymentDetails || null
    });

    await booking.save();

    // Update user's bookings array
    await User.findByIdAndUpdate(req.user.id, {
      $push: { bookings: booking._id }
    });

    res.status(201).json({
      success: true,
      booking,
      message: 'Booking created successfully'
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false,
      message: 'Server error creating booking' 
    });
  }
});

// Get all bookings for a user
router.get('/user', authenticateUser, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate('user', 'username email');

    res.json({
      success: true,
      count: bookings.length,
      bookings
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false,
      message: 'Server error fetching bookings' 
    });
  }
});

// Get single booking
router.get('/:id', authenticateUser, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.id
    }).populate('user', 'username email firstName lastName');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      booking
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false,
      message: 'Server error fetching booking' 
    });
  }
});

// Cancel a booking
router.put('/:id/cancel', authenticateUser, async (req, res) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
        paymentStatus: { $ne: 'refunded' }
      },
      { $set: { paymentStatus: 'cancelled' } },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found or already cancelled'
      });
    }

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      booking
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false,
      message: 'Server error cancelling booking' 
    });
  }
});

module.exports = router;