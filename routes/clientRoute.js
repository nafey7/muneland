const express = require('express');
const controller = require('../controllers/clientController');
const protectController = require('../controllers/protectController');

const router = express.Router();

//protection:
// router.route('/protect').post(protectController.ProtectClient);

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
.post(protectController.ProtectClient, controller.ViewFreelancerProfile)

//CLIENT PLACES AN ORDER (CLIENT BUYS CARD OR SPECIAL CARD)
router
.route('/placeorder')
.post(protectController.ProtectClient, controller.PlaceOrder)

// CLIENT VIEWS THE LIST OF THE ORDERS
router
.route('/vieworder')
.post(protectController.ProtectClient, controller.ViewOrders)

// CLIENT ACCEPTS THE SUBMISSION OF WORK BY FREELANCER
router
.route('/acceptsubmission')
.post(protectController.ProtectClient, controller.AcceptSubmissionOrder)

// CLIENT REQUESTS ITERATION ON WORK DONE BY FREELANCER
router
.route('/requestiteration')
.post(protectController.ProtectClient, controller.RequestIterationOrder)

// SEARCH FREELANCERS WITH FILTERS
router
.route('/search')
.post(protectController.ProtectClient, controller.Search)

// SUBMIT A REVIEW TO THE FREELANCER
router
.route('/submitreview')
.post(protectController.ProtectClient, controller.SubmitReview)

module.exports = router;