const mongoose = require('mongoose');

//define the schema for the appointment model

const appointmentSchema = new mongoose.Schema({
    clientName: {
        type: String, 
        required: true,
    },
    barberName: {
        type: String,
        required: true,
    },
    service: {
        type: String,
        required: true,
    },
    appointmentTime: {
        type: Date,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },

}, {timestamps:true}); // timestamps option adds createdAt and updatedAt fields

//export the appointment model
module.exports = mongoose.model('Appointment', appointmentSchema); // export the model
