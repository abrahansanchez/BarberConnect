const mongoose = require('mongoose');

const voicemailSchema = new mongoose.Schema({
    from: String, // Phone number of the caller
    to: String, //twilio number
    recordingUrl: String, // URL of the recorded voicemail
    transcriptionText: String, // Transcription of the voicemail
    timestamp: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Voicemail', voicemailSchema);