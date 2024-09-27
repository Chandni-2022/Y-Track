const express = require('express');
const registerUser = require('../controllers/signUpController');
const authUser = require('../controllers/loginController');
const router = express.Router()

router.post("/signup", registerUser);
router.post("/login", authUser);
module.exports = router;