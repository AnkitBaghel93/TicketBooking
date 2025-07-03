const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/userController'); // Or move to userController

// GET /api/users
router.get('/', getAllUsers);


module.exports = router;
