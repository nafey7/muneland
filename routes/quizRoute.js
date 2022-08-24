const express = require('express');
const controller = require('../controllers/quizController');

const router = express.Router();

// Add question to the quiz with POST and View the quiz with GET
router
.route('/')
.post(controller.AddQuestion)
.get(controller.ViewQuestions);

module.exports = router;