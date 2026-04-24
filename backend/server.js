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

// 1. CORS - Must be very first
const frontendUrl = process.env.FRONTEND_URL ? process.env.FRONTEND_URL.replace(/\/$/, "") : 'https://arcade-hub-two.vercel.app';

app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [frontendUrl, 'https://arcade-hub-two.vercel.app', 'http://localhost:3000'];
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log(`🚫 CORS Blocked Origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 2. Parse JSON
app.use(express.json());

// 3. Detailed Request Logging (Now after JSON so we can see body)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log(`Origin Header: ${req.get('origin') || 'No Origin'}`);
  if (req.method === 'POST' || req.method === 'PUT') {
    console.log('Request Body:', JSON.stringify(req.body, null, 2));
  }
  next();
});

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
