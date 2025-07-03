const express = require('express');
const router = express.Router();
const { register, login , getAllUsers  } = require('../controllers/authController');

router.post('/signup', register);
router.post('/signin', login);



module.exports = router;
