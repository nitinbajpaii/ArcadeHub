const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const gameRoutes = require('./routes/games');
const feedbackRoutes = require('./routes/feedback');
const testRoutes = require('./routes/test');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // Allow Vercel frontend or all for dev
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Routes
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is running and MongoDB connection attempted!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/test', testRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🎮 ArcadeHub Server running on port ${PORT}`);
});
