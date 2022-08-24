const express = require('express');
const controller = require('../controllers/clientController');

const router = express.Router();

// CLIENT SIGNS UP ON THE WEB APPLICATION
router
.route('/signup')
.post(controller.Signup);

// CLIENT LOGIN TO THE WEB APPLICATION
router
.route('/login')
.post(controller.Login);

// OPEN PROFILE OF FREELANCER
router
.route('/viewfreelancer')
.post(controller.ViewFreelancerProfile)

//CLIENT PLACES AN ORDER (CLIENT BUYS CARD OR SPECIAL CARD)
router
.route('/placeorder')
.post(controller.PlaceOrder)

// CLIENT VIEWS THE LIST OF THE ORDERS
router
.route('/vieworder')
.post(controller.ViewOrders)

// CLIENT ACCEPTS THE SUBMISSION OF WORK BY FREELANCER
router
.route('/acceptsubmission')
.post(controller.AcceptSubmissionOrder)

// CLIENT REQUESTS ITERATION ON WORK DONE BY FREELANCER
router
.route('/requestiteration')
.post(controller.RequestIterationOrder)

module.exports = router;