// routes/signUpRoutes.js

const express = require('express');
const router = express.Router();
const { signUpController } = require('../controllers/signUpController');

// Route for sign-up POST request
router.post('/', signUpController);

module.exports = router;
