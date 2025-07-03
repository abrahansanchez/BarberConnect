require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Barber = require('../models/Barber');

//generate JWT token
const generateToken = require('../utils/generateToken');


// @desc Register a new barber
// @route POST /api/auth/barber
router.post('/register', async (req, res) => {
    if (!req.body) {
  return res.status(400).json({ error: 'Missing request body' });
}
    const { name, phone, email, password, languagePreference} = req.body;
    try {
        const existingBarber = await Barber.findOne({email});
        if (existingBarber) {
            return res.status(400).json({error: 'Barber already exists'});
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
        res.status(500).json({error:'Server error'});
    }
    });
    //get all barbers 
    // @route GET /api/auth/barbers
    router.get('/barbers', async (req, res) => {
        try {
            const barbers = await Barber.find();
            res.status(200).json(barbers);

        } catch (error) {
            console.error('Error fetching barbers:', error);
            res.status(500).json({error:'Server error'});
        }
    });

    router.post('/login', async (req, res) => {
        const { email, password } = req.body;

        try {
            //check if the barber exists
            const barber = await Barber.findOne({email});
            if (!barber) {
                return res.status(401).json({error: 'Barber not found'});
            }
            //check if the password is correct
           const isMatch = await barber.matchPassword(password);
            if (!isMatch) {
                return res.status(401).json({error: 'Invalid password'});
            }
            //generate a token
            const token = generateToken(barber._id);
            //return the barber data and the token
            res.status(200).json({
                _id: barber._id,
                name: barber.name,
                email: barber.email,
                token,
            });
        } catch (error) {
            console.error('Error logging in barber:', error);
            res.status(500).json({error:'Server error'});
        }
    }
    );

    module.exports = router;