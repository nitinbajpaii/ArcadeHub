const express = require('express');
const authMiddleware = require('../middleware/auth');
const Score = require('../models/Score');
const User = require('../models/User');

const router = express.Router();

router.post('/save-score', authMiddleware, async (req, res) => {
  try {
    const { game, score, details } = req.body;
    const userId = req.userId;

    const newScore = new Score({
      userId,
      game,
      score,
      details
    });

    await newScore.save();

    const user = await User.findById(userId);
    if (user) {
      user.stats.totalGames++;
      if (details.won) user.stats.totalWins++;
      if (details.streak > user.stats.bestStreak) {
        user.stats.bestStreak = details.streak;
      }
      await user.save();
    }

    res.json({ success: true, score: newScore });
  } catch (error) {
    console.error('Save score error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/leaderboard', authMiddleware, async (req, res) => {
  try {
    const users = await User.find();
    const scores = await Score.find();

    const leaderboard = users.map(user => {
      const userScores = scores.filter(s => s.userId.toString() === user._id.toString());
      const totalScore = userScores.reduce((sum, s) => sum + (s.score || 0), 0);

      return {
        username: user.username,
        totalWins: user.stats.totalWins,
        totalGames: user.stats.totalGames,
        bestStreak: user.stats.bestStreak,
        totalScore
      };
    }).sort((a, b) => b.totalScore - a.totalScore);

    res.json(leaderboard);
  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/my-stats', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userScores = await Score.find({ userId }).sort({ timestamp: -1 });

    const gameStats = {
      rps: userScores.filter(s => s.game === 'rps'),
      memory: userScores.filter(s => s.game === 'memory'),
      guess: userScores.filter(s => s.game === 'guess')
    };

    res.json({
      user: {
        username: user.username,
        stats: user.stats
      },
      gameStats,
      recentGames: userScores.slice(0, 10)
    });
  } catch (error) {
    console.error('My stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
