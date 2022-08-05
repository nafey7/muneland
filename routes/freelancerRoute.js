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

router
.route('/card/strategy-and-vision')
.patch(controller.EditCardStrategyAndVision);

router
.route('/card/ent-solution-playbook')
.patch(controller.EditCardEntSolutionPlaybook);

router
.route('/card/leadership-and-socialization')
.patch(controller.EditCardLeadershipAndSocialization);

module.exports = router;