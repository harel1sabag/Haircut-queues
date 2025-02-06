const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// קבלת כל התורים
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('barber');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// יצירת תור חדש
router.post('/', async (req, res) => {
  const booking = new Booking({
    date: req.body.date,
    barber: req.body.barber,
    customerName: req.body.customerName,
    phoneNumber: req.body.phoneNumber
  });

  try {
    const newBooking = await booking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// מחיקת תור
router.delete('/:id', async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 