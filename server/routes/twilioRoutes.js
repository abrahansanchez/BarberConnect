 const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const db = require('../config/db'); // Neon DB

// 🔹 Entry voice route - plays greeting and menu
router.post('/voice', (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();

  twiml.say('Welcome to BarberConnect.', { voice: 'alice', language: 'en-US' });

  twiml.gather({
    numDigits: 1,
    action: '/api/twilio/handle-key',
    method: 'POST'
  }).say('Press 1 to book an appointment. Press 2 to cancel. Press 3 to leave a voicemail.');

  res.type('text/xml');
  res.send(twiml.toString());
});

// 🔹 Handle keypad input
router.post('/handle-key', (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();
  const digit = req.body.Digits;

  switch (digit) {
    case '1':
      twiml.say('You chose to book an appointment.');
      break;
    case '2':
      twiml.say('You chose to cancel an appointment.');
       break;
    case '3':
      twiml.say('Please leave your message after the beep.');
      twiml.record({
        action: '/api/twilio/voicemail',
        method: 'POST',
        maxLength: 60,
        transcribe: false
      });
      break;
    default:
      twiml.say('Sorry, I did not understand that.');
      break;
  }

  res.type('text/xml');
  res.send(twiml.toString());
});

// 🔹 Handle voicemail recording (POST /api/twilio/voicemail)
router.post('/voicemail', async (req, res) => {
  const { From, RecordingUrl } = req.body;

  try {
    const defaultBarberId = 1; // Or dynamically map From to a specific barber if needed

    await db`
      INSERT INTO voicemails (
        barber_id,
        caller_name,
        caller_phone,
        transcription,
        audio_url
      ) VALUES (
        ${defaultBarberId},
        NULL,
        ${From},
        NULL,
        ${RecordingUrl}
      )
    `;

    const twiml = new twilio.twiml.VoiceResponse();
    twiml.say('Voicemail recorded successfully.');

    res.type('text/xml');
    res.send(twiml.toString());
  } catch (error) {
    console.error('Error saving voicemail:', error);
    res.status(500).send('Error processing voicemail');
  }
});

module.exports = router;
