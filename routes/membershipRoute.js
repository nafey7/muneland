const express = require('express');
const controller = require('../controllers/membershipController');

const router = express.Router();

// Add question to the quiz with POST and View the quiz with GET
router
.route('/')
.post(controller.AddMembershipPlan);

router
.route('/strategyandvision')
.get(controller.StrategyAndVision);

router
.route('/solution')
.get(controller.Solution);

router
.route('/leadership')
.get(controller.Leadership)

module.exports = router;