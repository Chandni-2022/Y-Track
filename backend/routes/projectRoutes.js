const express = require('express');
const router = express.Router();
const { createProject } = require('../controllers/projectController.js'); // Adjust the path if necessary

// Route for creating a new project
router.post('/create-project', createProject);



module.exports = router;
