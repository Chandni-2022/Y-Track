
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectToDB = require('./config/db');
dotenv.config()
const app = express();
const PORT = process.env.PORT || 5500;
const userRoutes = require('./routes/userRoutes.js')


app.use(cors());
app.use(express.json());


connectToDB();

app.use('/api', userRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
