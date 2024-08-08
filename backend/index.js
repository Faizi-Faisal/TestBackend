const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const propertyRoutes = require('./routes/properties');
const Property = require('./models/Property');

dotenv.config();

const connectDB = require('./config/db');
connectDB();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "https://client-dp-nine.vercel.app/", // Replace with frontend URL
    methods: ["GET", "POST"]
  }
});

// Use CORS middleware
app.use(cors({
  origin: "https://client-dp-nine.vercel.app/", // Replace with frontend URL
}));

app.use(express.json());
app.use('/api/properties', propertyRoutes);


io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('getProperties', async ({ page, limit }) => {
    const skip = (page - 1) * limit;
    try {
      const properties = await Property.find().skip(skip).limit(limit).lean();
      const total = await Property.countDocuments();
      socket.emit('propertiesData', { properties, total });
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
