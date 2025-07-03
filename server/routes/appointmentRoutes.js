//handles Get and Post requests to the /api/appointments endpoint
const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment'); // import the appointment model
const Barber = require('../models/Barber'); // testing Barber route
//get all appointments

router.get('/test/barbers', async (req, res) => {
    try {
    const barbers = await Barber.find();
    res.json(barbers);
    } catch (err) {
        console.error('Error fetching barbers:', err);
        res.status(500).json({ error: 'Server error' });
    }
});


router.get('/', async (req, res) => {// handle GET requests to /api/appointments
    try {
        const appointments = await Appointment.find(); // find all appointments in the database
        res.json(appointments); // send the appointments as a JSON response
    } catch (error) {
        console.error('Error fething appointments:', error); // log the error
        res.status(500).send ('Server error'); // send a 500 status code if there is an error
    }
});


// handle POST requests to /api/appointments
router.post('/test/barbers', async (req,res) =>{
    console.log('Barber route hit');
    try {
        const {name, phone, email, languagePreference, availability} = req.body; // destructure the request body
        if (!name) {
            return res.status(400).json({error:'Name is required'});
        }
        const newBarber = new Barber({
            name,
            phone,
            email,
            languagePreference,
            availability
        });
        const savedBarber = await newBarber.save(); // save the barber to the database
        res.status(201).json(savedBarber); // send the saved barber as a JSON response
    } catch (error) {
        console.error('Error creating barber:', error); // log the error
        res.status(500).json({error:'Server error'}); // send a 500 status code if there is an error    
    }
});

router.post('/', async (req, res) => {
    try {
        const {clientName, barberName, service, appointmentTime, phoneNumber} = req.body; // destructure the request body

        // validate the request body
        if (!clientName || !barberName || !service || !appointmentTime || !phoneNumber) {
           return res.status(400).json({error:'All fields are required'}); // send a 400 status code if any field is missing
        }

        // create a new appointment
        const newAppointment = new Appointment({
            clientName, 
            barberName,
            service,
            appointmentTime,
            phoneNumber
        });
        // save the appointment to the database
        const savedAppointment = await newAppointment.save();
        res.status(201).json(savedAppointment); // send the saved appointment as a JSON response

        } catch (error) {
            console.error('Error creating appointment:', error); // log the error
            res.status(500).json({error:'Server error'}); // send a 500 status code if there is an error)
        }
        });
    
module.exports = router;