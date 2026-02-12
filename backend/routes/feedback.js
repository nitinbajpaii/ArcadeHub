const express = require('express');
const { readData, writeData } = require('../data/storage');

const router = express.Router();

router.post('/submit', (req, res) => {
  try {
    const { email, category, game, message, rating } = req.body;

    if (!category || !message) {
      return res.status(400).json({ error: 'Category and message required' });
    }

    const feedback = readData('feedback');

    const newFeedback = {
      id: Date.now().toString(),
      email: email || 'anonymous',
      category,
      game: game || 'general',
      message,
      rating: rating || 0,
      timestamp: new Date().toISOString()
    };

    feedback.push(newFeedback);
    writeData('feedback', feedback);

    res.json({ success: true, message: 'Feedback submitted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
