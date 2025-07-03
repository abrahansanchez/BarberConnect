//S

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true
  },
  email: String,
  preferredLanguage: {
    type: String,
    enum: ['en', 'es'],
    default: 'en'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
