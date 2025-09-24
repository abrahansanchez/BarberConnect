const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Neon config

// 🔹 POST /api/appointments - Create a new appointment
router.post('/', async (req, res) => {
  try {
    const {
      clientName,
      barberName,
      barberId,
      service,
      appointmentTime,
      phoneNumber
    } = req.body;

    // Optional: Debug incoming data
    console.log('Creating appointment with:', req.body);

    // Validate all required fields
    if (
      !clientName ||
      !barberName ||
      !barberId || // ✅ Newly added
      !service ||
      !appointmentTime ||
      !phoneNumber
    ) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const result = await db`
      INSERT INTO appointments (
        client_name,
        barber_name,
        barber_id,
        service,
        appointment_time,
        phone_number
      )
      VALUES (
        ${clientName},
        ${barberName},
        ${barberId},
        ${service},
        ${appointmentTime},
        ${phoneNumber}
      )
      RETURNING *;
    `;

    res.status(201).json(result[0]);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// 🔹 GET /api/appointments - Get all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await db`
      SELECT * FROM appointments ORDER BY appointment_time ASC
    `;
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// 🔹 GET /api/appointments/:barberId - Get appointments by barberId
router.get('/:barberId', async (req, res) => {
  try {
    const { barberId } = req.params;
    const appointments = await db`
      SELECT * FROM appointments
      WHERE barber_id = ${barberId}
      ORDER BY appointment_time ASC
    `;
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments for barber:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
