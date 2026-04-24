const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  email: {
    type: String,
    default: 'anonymous'
  },
  category: {
    type: String,
    required: true
  },
  game: {
    type: String,
    default: 'general'
  },
  message: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
