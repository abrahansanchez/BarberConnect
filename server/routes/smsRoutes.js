const express = require('express');
const router = express.Router();
const { twiml: { MessagingResponse } } = require('twilio');
const db = require('../config/db'); // Neon DB

// 🔹 POST /api/sms - Manual save (optional use for outbound/bulk logs)
router.post('/', async (req, res) => {
  try {
    const { barberId, direction, phoneNumber, message, status } = req.body;

    if (!barberId || !direction || !phoneNumber || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const result = await db`
      INSERT INTO sms_logs (barber_id, direction, phone_number, message, status)
      VALUES (${barberId}, ${direction}, ${phoneNumber}, ${message}, ${status || 'sent'})
      RETURNING *;
    `;

    res.status(201).json(result[0]);
  } catch (error) {
    console.error('Failed to save SMS log:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// 🔹 POST /api/sms/sms - Webhook from Twilio
router.post('/sms', async (req, res) => {
  const { From, To, Body } = req.body;

  try {
    // 💡 Optional: Match From or To to a barber
    const defaultBarberId = 1; // fallback if you don’t match dynamically

    await db`
      INSERT INTO sms_logs (barber_id, direction, phone_number, message, status)
      VALUES (${defaultBarberId}, 'inbound', ${From}, ${Body}, 'received')
    `;

    const response = new MessagingResponse();
    response.message('Thanks for your message! We will reply shortly.');

    res.set('Content-Type', 'text/xml');
    res.status(200).send(response.toString());
  } catch (error) {
    console.error('Error saving Twilio SMS:', error);
    res.status(500).send('Failed to save SMS');
  }
});

// 🔹 GET /api/sms/:barberId - Get SMS by barber
router.get('/:barberId', async (req, res) => {
  try {
    const { barberId } = req.params;
    const result = await db`
      SELECT * FROM sms_logs
      WHERE barber_id = ${barberId}
      ORDER BY sent_at DESC
    `;
    if (result.length === 0) {
      return res.status(404).json({ message: 'No SMS logs found for this barber.' });
    }
    res.json(result);
  } catch (error) {
    console.error('Error fetching SMS logs:', error);
    res.status(500).json({ message: 'Failed to fetch SMS logs.' });
  }
});

    module.exports = router;
