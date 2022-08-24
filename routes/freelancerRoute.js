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

// Delete Card from the box of the Freelancer
router
.route('/deletecard')
.post(controller.DeleteCard, controller.MinCost);

// POST is to view the Cards present in this Category. PATCH is to add card to the box.
router
.route('/card/strategy-and-vision')
.post(controller.ViewStrategyAndVision)
.patch(controller.EditCardStrategyAndVision, controller.MinCost);

// POST is to view the Cards present in this Category. PATCH is to add card to the box.
router
.route('/card/ent-solution-playbook')
.post(controller.ViewEntSolutionPlaybook)
.patch(controller.EditCardEntSolutionPlaybook, controller.MinCost);

// POST is to view the Cards present in this Category. PATCH is to add card to the box.
router
.route('/card/leadership-and-socialization')
.post(controller.ViewLeadershipAndSocialization)
.patch(controller.EditCardLeadershipAndSocialization, controller.MinCost);

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