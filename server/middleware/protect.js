const jwt = require('jsonwebtoken');
const barber = require('../models/Barber');

const protect = async (req, res, next) => {
  let token;

  // Token must be sent in the Authorization header as "Bearer <token>"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]; // remove "Bearer"

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach barber info to request
      req.barber = await Barber.findById(decoded.id).select('-password');
      next();
    } catch (err) {
      console.error('Token verification failed:', err);
      return res.status(401).json({ error: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ error: 'Not authorized, no token provided' });
  }
};

module.exports = protect;