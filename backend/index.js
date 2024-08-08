const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const propertyRoutes = require('./routes/properties');

dotenv.config();

const connectDB = require('./config/db');
connectDB();

const app = express();

// Use CORS middleware
app.use(cors({
  origin: "https://client-dp-nine.vercel.app", // Replace with frontend URL
}));

app.use(express.json());
app.use('/api/properties', propertyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
