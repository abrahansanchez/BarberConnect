const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const barberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: String,
  email: String,
  languagePreference: {
    type: String,
    enum: ['English', 'Spanish'],
    default: 'English',
  },
  password: {
    type: String,
    required: true,
  },

  availability: [
    {
      day: String,
      startTime: String,
      endTime: String,
    },
  ],

  // Optional Barbershop reference 
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Barbershop',
  //   required: true
  // },

  calLink: {
    type: String,
    default: '',
  },

  resetPasswordToken: String,
  resetPasswordExpires: Date,
}, {
  timestamps: true
});

// Hash the password before saving the barber document
barberSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

// Match the password with the hashed password
barberSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Barber', barberSchema);
