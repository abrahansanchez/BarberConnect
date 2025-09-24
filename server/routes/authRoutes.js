require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const db = require('../config/db'); // 
const generateToken = require('../utils/generateToken');
const sendEmail = require('../utils/sendEmail');

// ✅ Register Route
router.post('/register', async (req, res) => {
  const { name, phone, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const existing = await db`SELECT * FROM barbers WHERE email = ${email}`;
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Barber already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insert = await db`
      INSERT INTO barbers (name, email, password, phone_number)
      VALUES (${name}, ${email}, ${hashedPassword}, ${phone})
      RETURNING id, name, email, phone_number, created_at
    `;

    const newBarber = insert[0];

    res.status(201).json({
      _id: newBarber.id,
      name: newBarber.name,
      email: newBarber.email,
      phone: newBarber.phone_number,
      created_at: newBarber.created_at,
      token: generateToken(newBarber.id),
    });
  } catch (error) {
    console.error('Error registering barber:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db`SELECT * FROM barbers WHERE email = ${email}`;
    if (result.length === 0) {
      return res.status(401).json({ error: 'Barber not found' });
    }

    const barber = result[0];
    const isMatch = await bcrypt.compare(password, barber.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    res.status(200).json({
      _id: barber.id,
      name: barber.name,
      email: barber.email,
      calendlyLink: barber.calendly_url || null,
      token: generateToken(barber.id),
    });
  } catch (error) {
    console.error('Error logging in barber:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Get All Barbers
router.get('/barbers', async (req, res) => {
  try {
    const result = await db`
      SELECT id, name, email, phone_number, calendly_url, created_at FROM barbers
    `;
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching barbers:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Forgot Password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const result = await db`SELECT * FROM barbers WHERE email = ${email}`;
    if (result.length === 0) {
      return res.status(404).json({ message: 'Barber not found' });
    }

    const barber = result[0];
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expires = Date.now() + 3600000;

    await db`
      UPDATE barbers 
      SET reset_password_token = ${resetToken}, 
          reset_password_expires = to_timestamp(${expires} / 1000.0) 
      WHERE id = ${barber.id}
    `;

    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
    const html = `
      <p>Hello ${barber.name},</p>
      <p>You requested a password reset for your BarberConnect account.</p>
      <p>Click the link below to reset your password. This link will expire in 1 hour:</p>
      <a href="${resetLink}" style="color: blue;">Reset My Password</a>
      <p>If you did not request this, please ignore this email.</p>
    `;

    await sendEmail(barber.email, 'Reset Your BarberConnect Password', html);
    res.status(200).json({ message: 'Reset link sent to email.' });
  } catch (err) {
    console.error('Error sending reset email:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Reset Password
router.post('/reset-password', async (req, res) => {
  const { resetToken, newPassword } = req.body;

  if (!resetToken || !newPassword) {
    return res.status(400).json({ message: 'Token and new password are required.' });
  }

  try {
    const result = await db`
      SELECT * FROM barbers 
      WHERE reset_password_token = ${resetToken} 
        AND reset_password_expires > NOW()
    `;

    if (result.length === 0) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db`
      UPDATE barbers
      SET password = ${hashedPassword},
          reset_password_token = NULL,
          reset_password_expires = NULL
      WHERE id = ${result[0].id}
    `;

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    console.error('Error resetting password:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
