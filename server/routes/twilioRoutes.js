// twilioRoutes.js
const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const Voicemail = require('../models/voicemail.model.js');

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
        maxLength: 60, // Maximum length of the voicemail in
        transcribe: false
      })
      break;
    default:
      twiml.say('Sorry, I did not understand that.');
      break;
  }

  res.type('text/xml');
  res.send(twiml.toString());
});

//handle voicemail recording
// This route is called by Twilio when a voicemail is recorded
router.post('/voicemail', async (req, res) => {
  const {From, To, RecordingUrl, TranscriptionText} = req.body;
  try{
    const newVoicemail = new Voicemail({
      from: From,
      to: To,
      recordingUrl: RecordingUrl,
      transcriptionText: TranscriptionText
    
    });
    await newVoicemail.save();
    res.send('<Response><Say voice="alice"> Voicemail recorded successfully.</Say></Response>');
  }catch (error) {
    console.error('Error saving voicemail:', error);
    res.status(500).send('Error processing voicemail');
  }
});

module.exports = router;
