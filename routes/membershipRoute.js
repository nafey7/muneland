const express = require('express');
const controller = require('../controllers/membershipController');
const protectController = require('../controllers/protectController');

const router = express.Router();

router
.route('/')
.post(controller.AddMembershipPlan);

// VIEW STRATEGY AND VISION PLAN
router
.route('/strategyandvision')
.post(protectController.ProtectClient, controller.StrategyAndVision, controller.CheckoutSession);

// VIEW SOLUTION PLAN
router
.route('/solution')
.post(protectController.ProtectClient, controller.Solution, controller.CheckoutSession);

// VIEW LEADERSHIP PLAN
router
.route('/leadership')
.post(protectController.ProtectClient, controller.Leadership, controller.CheckoutSession);

// WEBHOOK FOR STRIPE
router
.route('/stripe-webhook')
.post(controller.StripeWebhook)

// LOGIN CALL
router
.route('/logincall')
.post(protectController.ProtectClient, controller.MembershipLogin);

module.exports = router;