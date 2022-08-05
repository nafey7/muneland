const express = require('express');
const controller = require('../controllers/freelancerController');

const router = express.Router();

// Get List of Events & Add Event
router
.route('/signup')
.post(controller.Signup);

router
.route('/login')
.post(controller.Login);


module.exports = router;