const express = require('express');
const router = express.Router();
const passport = require('passport');
const generateToken = require('../utilise/generateToken');

const {
  register,
  login,
  getAllUsers,
  logoutUser,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');

// Replace these with your deployed frontend and backend
const FRONTEND_URL = 'https://ticketbooking-frontend.onrender.com';

// ROUTES
router.post('/signup', register);
router.post('/signin', login);
router.post('/logout', logoutUser);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

// INITIATE FACEBOOK LOGIN
router.get('/facebook', (req, res, next) => {
  console.log('[AuthRoutes] Facebook login initiated');
  next();
}, passport.authenticate('facebook', { scope: ['email'] }));

// FACEBOOK CALLBACK
router.get(
  '/facebook/callback',
  (req, res, next) => {
    console.log('[AuthRoutes] Facebook callback hit');
    next();
  },
  passport.authenticate('facebook', {
    failureRedirect: `${FRONTEND_URL}/signin`,
    session: false,
  }),
  (req, res) => {
    console.log('[AuthRoutes] Facebook login success');

    if (!req.user) {
      console.log('[AuthRoutes] No user attached to req');
      return res.redirect(`${FRONTEND_URL}/signin?error=NoUser`);
    }

    console.log('[AuthRoutes] User:', req.user);

    const token = generateToken(req.user);
    console.log('[AuthRoutes] JWT token generated:', token);

    res.redirect(`${FRONTEND_URL}/facebook-success?token=${token}`);
  }
);

module.exports = router;
