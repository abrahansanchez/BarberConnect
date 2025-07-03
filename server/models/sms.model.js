const mongoose = require('mongoose');

//define the schema of SMS docs in MongoDB
const smsSchema = new mongoose.Schema({
    from: String,
    to: String, 
    message: String,
    timeStamp: {
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model('SMS', smsSchema);
