// server/routes/voicemailRoutes.js
const express = require('express');
const router = express.Router();
const Voicemail = require('../models/voicemail.model'); 
const protect = require('../middleware/protect');

// GET all voicemails
router.get('/', protect, async (req, res) => {
  try {
    const voicemails = await Voicemail.find().sort({ timestamp: -1 });
    res.json(voicemails);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch voicemails.' });
  }
});

// GET a specific voicemail by ID
router.get('/:barberId', async (req, res) => {
  try {
    const voicemails = await Voicemail.find({
      barberId: req.params.barberId
    }).sort({createdAt: -1});
    if(voicemails.length === 0 ){
      return res.status(404).json({ message: 'No voicemails found for this barber.'});
    }
    res.json(voicemails);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch voicemails.' });
  }
});

module.exports = router;
