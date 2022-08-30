const express = require('express');
const controller = require('../controllers/freelancerController');
const protectController = require('../controllers/protectController');

const router = express.Router();


// Get List of Events & Add Event
router
.route('/signup')
.post(controller.Signup);

router
.route('/login')
.post(controller.Login);

// Edit Profile of the Freelancer
router
.route('/editprofile')
.patch(protectController.ProtectFreelancer, controller.EditProfile)

// FREELANCER VIEW THE CARDS PRESENT IN THE BOX (THE USED ONES)
router
.route('/viewbox')
.post(protectController.ProtectFreelancer, controller.ViewBox)


// View Cards of the Freelancer
router
.route('/viewcards')
.post(protectController.ProtectFreelancer, controller.ViewCards)

// Add Card to the box of Freelancer
router
.route('/addcard')
.patch(protectController.ProtectFreelancer, controller.AddCardToBox, controller.MinCost);

// Delete Card from the box of the Freelancer
router
.route('/deletecard')
.post(protectController.ProtectFreelancer, controller.DeleteCard, controller.MinCost);

// FREELANCER VIEWS THE LIST OF ORDERS
router
.route('/vieworder')
.post(protectController.ProtectFreelancer, controller.ViewOrders)

// FREELANCER ACCEPTS THE ORDER FROM CLIENT
router
.route('/acceptorder')
.post(protectController.ProtectFreelancer, controller.AcceptOrder)

// FREELANCER SUBMITS ORDER. Order status is changed to ready
router
.route('/submitorder')
.post(protectController.ProtectFreelancer, controller.SubmitOrder)

// FREELANCER SUBMITS THE REVIEW
router
.route('/submitreview')
.post(protectController.ProtectFreelancer, controller.SubmitReview)


module.exports = router;