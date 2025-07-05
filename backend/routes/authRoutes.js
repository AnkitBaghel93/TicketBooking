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

// ==================== FACEBOOK LOGIN ==================== //
router.get('/facebook', (req, res, next) => {
  console.log('[AuthRoutes] Facebook login initiated');
  next();
}, passport.authenticate('facebook', { scope: ['email'] }));

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
    const { username, email, role } = req.user;

    res.redirect(`${FRONTEND_URL}/facebook-success?token=${token}&username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&role=${role}`);
  }
);

// ==================== GOOGLE LOGIN ==================== //
router.get('/google', (req, res, next) => {
  console.log('[AuthRoutes] Google login initiated');
  next();
}, passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  (req, res, next) => {
    console.log('[AuthRoutes] Google callback hit');
    next();
  },
  passport.authenticate('google', {
    failureRedirect: `${FRONTEND_URL}/signin`,
    session: false,
  }),
  (req, res) => {
    console.log('[AuthRoutes] Google login success');

    if (!req.user) {
      console.log('[AuthRoutes] No user attached to req');
      return res.redirect(`${FRONTEND_URL}/signin?error=NoUser`);
    }

    console.log('[AuthRoutes] User:', req.user);

    const token = generateToken(req.user);
    const { username, email, role } = req.user;

    res.redirect(`${FRONTEND_URL}/google-success?token=${token}&username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&role=${role}`);
  }
);

module.exports = router;
