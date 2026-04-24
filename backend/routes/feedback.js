const express = require('express');
const Feedback = require('../models/Feedback');

const router = express.Router();

router.post('/submit', async (req, res) => {
  try {
    const { email, category, game, message, rating } = req.body;

    if (!category || !message) {
      return res.status(400).json({ error: 'Category and message required' });
    }

    const newFeedback = new Feedback({
      email: email || 'anonymous',
      category,
      game: game || 'general',
      message,
      rating: rating || 0
    });

    await newFeedback.save();

    res.json({ success: true, message: 'Feedback submitted successfully!' });
  } catch (error) {
    console.error('Feedback submit error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
