const jwt = require('jsonwebtoken');

const generateToken = (barberId) => {
  return jwt.sign({ id: barberId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

module.exports = generateToken;
