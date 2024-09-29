const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectToDB = require('./config/db.js');
const userRoutes = require('./routes/userRoutes.js'); // Import user routes

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5500;

app.use(cors({ origin: "http://localhost:3000" })); // Allow CORS for your frontend
app.use(express.json());

connectToDB(); // Connect to your database

app.use('/api', userRoutes); // Use the user routes

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
