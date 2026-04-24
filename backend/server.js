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

// Request logging middleware - MUST BE FIRST to catch everything
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log(`Origin: ${req.get('origin') || 'No Origin'}`);
  if (req.method === 'POST') {
    console.log('Body:', JSON.stringify(req.body, null, 2));
  }
  next();
});

// Middleware
const frontendUrl = process.env.FRONTEND_URL ? process.env.FRONTEND_URL.replace(/\/$/, "") : 'https://arcade-hub-two.vercel.app';

app.use(cors({
  origin: [
    frontendUrl,
    'https://arcade-hub-two.vercel.app',
    'http://localhost:3000'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('🎮 ArcadeHub API Running');
});

app.get('/api/test', (req, res) => {
  console.log('✅ Test route hit');
  res.json({ 
    status: 'API working',
    message: 'Backend is running!',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/test', testRoutes);

// Catch-all for undefined routes
app.use((req, res) => {
  console.log(`⚠️ Unmatched Route: ${req.method} ${req.url}`);
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🎮 ArcadeHub Server running on port ${PORT}`);
});
