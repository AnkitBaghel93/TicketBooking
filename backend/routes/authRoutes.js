const express = require('express');
const router = express.Router();
const { register, login , getAllUsers , logoutUser , forgotPassword,  resetPassword} = require('../controllers/authController');

router.post('/signup', register);
router.post('/signin', login);
router.post('/logout', logoutUser);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

module.exports = router;



