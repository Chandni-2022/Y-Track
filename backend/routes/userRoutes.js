const express = require('express');
const registerUser = require('../controllers/signUpController');
const authUser = require('../controllers/loginController');
const { sendOtp, verifyOtp, resetPassword } = require('../controllers/otpController'); 

// const { createProject, inviteMembers } = require('../controllers/projectController'); // Adjust the path based on your structure
const router = express.Router();

router.post("/signup", registerUser.registerUser);
router.post("/login", authUser);
router.post("/send-otp", sendOtp); 
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
// router.post('/projects', createProject);           // Route for project creation
// router.post('/projects/:projectId/invite', inviteMembers);  // Route for inviting members


module.exports = router;
