const express = require('express');
const controller = require('../controllers/boxController');

const router = express.Router();

// Add question to the quiz with POST and View the quiz with GET
router
.route('/')
.post(controller.ViewBox);

module.exports = router;