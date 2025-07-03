// routes/calendlyRoutes.js
const express = require('express');
const router = express.Router();
const CalendlyAppointment = require('../models/CalendlyAppointment');
const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

router.post('/webhook', async (req, res) => {
  try {
    const eventType = req.body.event;
    const payload = req.body.payload;

    console.log(` Calendly Webhook Event Received: ${eventType}`);
    console.log('Full Payload:', JSON.stringify(req.body, null, 2));

    if (eventType === 'invitee.created') {
      //  Extract fields
      const inviteeName = payload.name;
      const inviteeEmail = payload.email;
      const startTime = payload.scheduled_event.start_time;

      console.log(`New appointment created: ${inviteeName} (${inviteeEmail}) at ${startTime}`);

      //  Save to DB
      const newAppointment = new CalendlyAppointment({
        inviteeName,
        inviteeEmail,
        eventType,
        startTime,
      });

      await newAppointment.save();

      // Send SMS (use a real number if you're capturing it; replace with test # for now)
      const recipientPhone = '8132207636'; //test number
      const message = `Hi ${inviteeName}, your appointment is confirmed for ${startTime}. Thanks for booking with BarberConnect!`;

      try {
        await client.messages.create({
          body: message,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: recipientPhone,
        });

        console.log(`📲 SMS confirmation sent to ${recipientPhone}`);
      } catch (smsError) {
        console.error('Failed to send SMS confirmation:', smsError.message);
      }
    } else {
      console.warn(' Unhandled event type or missing fields.');
    }

    res.status(200).send('Webhook received successfully');
  } catch (error) {
    console.error(' Error processing Calendly webhook:', error);
    res.status(500).send('Error processing webhook');
  }
});

module.exports = router;
