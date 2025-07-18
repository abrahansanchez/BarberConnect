require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const Barber = require('../models/Barber.js');
const generateToken = require('../utils/generateToken.js');
const sendEmail = require('../utils/sendEmail.js');

// @desc Register a new barber
// @route POST /api/auth/register
router.post('/register', async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: 'Missing request body' });
  }

  const { name, phone, email, password, languagePreference } = req.body;

  try {
    const existingBarber = await Barber.findOne({ email });
    if (existingBarber) {
      return res.status(400).json({ error: 'Barber already exists' });
    }

    const newBarber = new Barber({
      name,
      phone,
      email,
      password,
      languagePreference,
    });

    await newBarber.save();

    res.status(201).json({
      _id: newBarber._id,
      name: newBarber.name,
      email: newBarber.email,
      token: generateToken(newBarber._id),
    });
  } catch (error) {
    console.error('Error registering barber:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @desc Get all barbers
// @route GET /api/auth/barbers
router.get('/barbers', async (req, res) => {
  try {
    const barbers = await Barber.find();
    res.status(200).json(barbers);
  } catch (error) {
    console.error('Error fetching barbers:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @desc Login barber
// @route POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const barber = await Barber.findOne({ email });
    if (!barber) {
      return res.status(401).json({ error: 'Barber not found' });
    }

    const isMatch = await barber.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = generateToken(barber._id);

    res.status(200).json({
      _id: barber._id,
      name: barber.name,
      email: barber.email,
      token,
      calendlyLink: barber.calendlyLink || null,
    });
  } catch (error) {
    console.error('Error logging in barber:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


// @desc Send reset token to barber's email
// @route POST /api/auth/forgot-password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const barber = await Barber.findOne({ email });
    if (!barber) {
      return res.status(404).json({ message: 'Barber not found' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    barber.resetPasswordToken = resetToken;
    barber.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour
    await barber.save();

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


// @desc Reset password
// @route POST /api/auth/reset-password
router.post('/reset-password', async (req, res) => {
  const { resetToken, newPassword } = req.body;

  try {
    const barber = await Barber.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!barber) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Assign plain password and let the Mongoose pre-save hook hash it
    barber.password = newPassword;
    barber.markModified('password');
    barber.resetPasswordToken = undefined;
    barber.resetPasswordExpires = undefined;

    await barber.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    console.error('Error resetting password:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
