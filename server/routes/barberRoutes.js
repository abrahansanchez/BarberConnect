// routes/barberRoutes.js
const express = require('express');
const router = express.Router();
const Barber = require('../models/Barber');

// GET /api/barbers?barbershopId=XYZ → returns list of barbers for that shop (or all if none)
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

// PUT /api/barbers/:id → update profile settings (including calLink, availability, etc)
router.put('/:id', async (req, res) => {
  try {
    const updatedBarber = await Barber.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          phone: req.body.phone,
          bio: req.body.bio,
          calLink: req.body.calLink, 
          availability: req.body.availability || [],
        },
      },
      { new: true }
    );

    if (!updatedBarber) {
      return res.status(404).json({ message: 'Barber not found.' });
    }

    res.json(updatedBarber);
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Failed to update barber profile.' });
  }
});

// DELETE /api/barbers/:id → remove barber
router.delete('/:id', async (req, res) => {
  try {
    await Barber.findByIdAndDelete(req.params.id);
    res.json({ message: 'Barber deleted successfully.' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Failed to delete barber.' });
  }
});

module.exports = router;
