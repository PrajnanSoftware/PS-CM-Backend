const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const cors = require('cors');
const { Server } = require('socket.io');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Default root route
app.get('/', (req, res) => {
  res.send('Welcome to PS Career Dashboard Backend API!'); // You can customize this message
});

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/profile', profileRoutes);

// WebSocket for notifications and chat
const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});

// Set up Socket.IO with the Express server
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// WebSocket connections
io.on('connection', (socket) => {
  console.log('User connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('notification', (data) => {
    io.emit('notification', data);
  });

  socket.on('chat', (data) => {
    io.emit('chat', data);
  });
});

// Export the app as a function for Vercel
module.exports = (req, res) => {
  app(req, res);  // Pass the request and response to the Express app
};
