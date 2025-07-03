const express = require('express');
const router = express.Router();
const {twiml:{MessagingResponse}} = require('twilio');
const SMS = require('../models/sms.model');

//this route is triggered when twilio sends a message 
router.post('/sms', async (req, res) => {
    const {From, To, Body} = req.body;

    try {
        //create a new sms record in the database
        const sms = new SMS({
            from: From,
            to: To,
            body: Body
        });
        await sms.save();

        //send a response back to twilio
        const response = new MessagingResponse();
        response.message('Thank you for your message! We will get back to you shortly.');

        res.set('Content-Type, text/xml');
        res.status(200).send(response.toString());
    } catch (error) {
        console.error('Failed to save SMS:', error);
        res.status(500).send('Failed to process SMS');
    }
});

module.exports = router;

