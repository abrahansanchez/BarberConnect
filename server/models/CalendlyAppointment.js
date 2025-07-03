const mongoose = require('mongoose');
// This schema is used to store appointments created through Calendly
const CalendlyAppointmentSchema = new mongoose.Schema({
    inviteeName: String,
    inviteeEmail: String,
    eventType: String,
    startTime: String,
    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('CalendlyAppointment', CalendlyAppointmentSchema);
