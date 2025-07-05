const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user) => {
  console.log('[generateToken] Generating token for:', user.email);
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

module.exports = generateToken;
