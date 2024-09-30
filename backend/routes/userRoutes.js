const express = require('express');
const registerUser = require('../controllers/signUpController');
const authUser = require('../controllers/loginController');
const { sendOtp, verifyOtp, resetPassword } = require('../controllers/otpController'); 
const router = express.Router();

router.post("/signup", registerUser.registerUser);
router.post("/login", authUser);
router.post("/send-otp", sendOtp); 
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

module.exports = router;
