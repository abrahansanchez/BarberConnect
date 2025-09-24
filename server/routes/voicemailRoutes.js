 const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Neon config
const protect = require('../middleware/protect');

// 🔹 POST /api/voicemails - Save a new voicemail
router.post('/', async (req, res) => {
  try {
    const { barberId, callerName, callerPhone, transcription, audioUrl } = req.body;

    if (!barberId || !callerPhone || !audioUrl) {
      return res.status(400).json({ error: 'barberId, callerPhone, and audioUrl are required' });
    }

    const result = await db`
      INSERT INTO voicemails (barber_id, caller_name, caller_phone, transcription, audio_url)
      VALUES (${barberId}, ${callerName}, ${callerPhone}, ${transcription}, ${audioUrl})
      RETURNING *;
    `;

    res.status(201).json(result[0]);
  } catch (err) {
    console.error('Error saving voicemail:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// 🔹 GET /api/voicemails - Get all voicemails (protected)
router.get('/', protect, async (req, res) => {
  try {
    const result = await db`
      SELECT * FROM voicemails
      ORDER BY received_at DESC;
    `;
    res.json(result);
  } catch (err) {
    console.error('Failed to fetch voicemails:', err);
    res.status(500).json({ message: 'Failed to fetch voicemails.' });
  }
});

// 🔹 GET /api/voicemails/:barberId - Get voicemails for a specific barber
router.get('/:barberId', async (req, res) => {
  const { barberId } = req.params;

  try {
    const result = await db`
      SELECT * FROM voicemails
      WHERE barber_id = ${barberId}
      ORDER BY received_at DESC;
    `;

    if (result.length === 0) {
      return res.status(404).json({ message: 'No voicemails found for this barber.' });
    }

    res.json(result);
  } catch (err) {
    console.error('Failed to fetch voicemails:', err);
    res.status(500).json({ message: 'Failed to fetch voicemails.' });
  }
});

module.exports = router;
