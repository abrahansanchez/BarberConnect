// server/routes/analyticsRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET /api/analytics/:barberId
router.get('/:barberId', async (req, res) => {
  try {
    const { barberId } = req.params;

    // Count totals
    const appointments = await db`SELECT service FROM appointments WHERE barber_id = ${barberId}`;
    const voicemails = await db`SELECT id FROM voicemails WHERE barber_id = ${barberId}`;
    const sms = await db`SELECT id FROM sms_logs WHERE barber_id = ${barberId}`;

    // Find top service
    const serviceCount = {};
    appointments.forEach(a => {
      if (a.service) {
        serviceCount[a.service] = (serviceCount[a.service] || 0) + 1;
      }
    });

    const topService = Object.entries(serviceCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    res.json({
      totalAppointments: appointments.length,
      totalVoicemails: voicemails.length,
      totalSMS: sms.length,
      topService,
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
