// routes/barberRoutes.js
const express = require('express');
const router = express.Router();
const Barber = require('../models/Barber');

// GET /api/barbers?barbershopId=XYZ → returns list of barbers for that shop
router.get('/', async (req, res) => {
  const { barbershopId } = req.query;

  try {
    let barbers;
    if (barbershopId) {
      barbers = await Barber.find({ barbershopId });
    } else {
      barbers = await Barber.find();
    }

    res.json(barbers);
  } catch (err) {
    console.error('Failed to fetch barbers:', err);
    res.status(500).json({ error: 'Server error fetching barbers' });
  }
});

module.exports = router;
