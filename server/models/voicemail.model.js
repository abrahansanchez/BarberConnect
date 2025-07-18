const mongoose = require('mongoose');

const VoicemailSchema = new mongoose.Schema({
  barberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Barber',
    required: true
  },
  callerPhone: {
    type: String,
    required: true
  },
  audioUrl: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true }); // Optional

module.exports = mongoose.models.Voicemail || mongoose.model('Voicemail', VoicemailSchema);
