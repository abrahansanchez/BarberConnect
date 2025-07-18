const mongoose = require('mongoose');

// Define the schema of SMS documents
const smsSchema = new mongoose.Schema({
  from: String,
  to: String,
  body: String, //
  barberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Barber',
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true }); // Optional, adds createdAt and updatedAt

module.exports = mongoose.models.SMS || mongoose.model('SMS', smsSchema);
