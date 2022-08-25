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

// Edit Profile of the Freelancer
router
.route('/editprofile')
.patch(controller.EditProfile)

// FREELANCER VIEW THE CARDS PRESENT IN THE BOX (THE USED ONES)
router
.route('/viewbox')
.post(controller.ViewBox)


// View Cards of the Freelancer
router
.route('/viewcards')
.post(controller.ViewCards)

// Add Card to the box of Freelancer
router
.route('/addcard')
.patch(controller.AddCardToBox, controller.MinCost);

// Delete Card from the box of the Freelancer
router
.route('/deletecard')
.post(controller.DeleteCard, controller.MinCost);

// POST is to view the Cards present in this Category.
router
.route('/card/strategy-and-vision')
.post(controller.ViewStrategyAndVision)

// POST is to view the Cards present in this Category.
router
.route('/card/ent-solution-playbook')
.post(controller.ViewEntSolutionPlaybook)

// POST is to view the Cards present in this Category.
router
.route('/card/leadership-and-socialization')
.post(controller.ViewLeadershipAndSocialization)

// FREELANCER VIEWS THE LIST OF ORDERS
router
.route('/vieworder')
.post(controller.ViewOrders)

// FREELANCER ACCEPTS THE ORDER FROM CLIENT
router
.route('/acceptorder')
.post(controller.AcceptOrder)

// FREELANCER SUBMITS ORDER. Order status is changed to ready
router
.route('/submitorder')
.post(controller.SubmitOrder)


module.exports = router;