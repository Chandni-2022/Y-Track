const express = require('express');
const registerUser = require('../controllers/signUpController');
const router = express.Router()

router.post("/signup", registerUser);
router.post("/login", );
module.exports = router;