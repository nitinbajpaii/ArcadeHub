const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  game: {
    type: String,
    required: true,
    enum: ['rps', 'memory', 'guess']
  },
  score: {
    type: Number,
    required: true
  },
  details: {
    won: Boolean,
    streak: Number,
    moves: Number,
    time: Number
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Score', scoreSchema);
