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

// POST is to view the BOX
router
.route('/box')
.post(controller.ViewBox)

// Delete Card from the box of the Freelancer
router
.route('/deletecard')
.post(controller.DeleteCard);

// POST is to view the Cards present in this Category. PATCH is to add card to the box.
router
.route('/card/strategy-and-vision')
.post(controller.ViewStrategyAndVision)
.patch(controller.EditCardStrategyAndVision);

// POST is to view the Cards present in this Category. PATCH is to add card to the box.
router
.route('/card/ent-solution-playbook')
.post(controller.ViewEntSolutionPlaybook)
.patch(controller.EditCardEntSolutionPlaybook);

// POST is to view the Cards present in this Category. PATCH is to add card to the box.
router
.route('/card/leadership-and-socialization')
.post(controller.ViewLeadershipAndSocialization)
.patch(controller.EditCardLeadershipAndSocialization);

module.exports = router;