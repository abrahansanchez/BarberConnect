// server/routes/voicemailRoutes.js
const express = require('express');
const router = express.Router();
const Voicemail = require('../models/voicemail.model');

// GET all voicemails
router.get('/', async (req, res) => {
  try {
    const voicemails = await Voicemail.find().sort({ timestamp: -1 });
    res.json(voicemails);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch voicemails.' });
  }
});

module.exports = router;
