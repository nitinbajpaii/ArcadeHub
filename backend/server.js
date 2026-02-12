const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const gameRoutes = require('./routes/games');
const feedbackRoutes = require('./routes/feedback');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/feedback', feedbackRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🎮 ArcadeHub Server running on port ${PORT}`);
});
