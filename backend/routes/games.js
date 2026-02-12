const express = require('express');
const authMiddleware = require('../middleware/auth');
const { readData, writeData } = require('../data/storage');

const router = express.Router();

router.post('/save-score', authMiddleware, (req, res) => {
  try {
    const { game, score, details } = req.body;
    const userId = req.userId;

    const scores = readData('scores');
    const users = readData('users');

    const newScore = {
      id: Date.now().toString(),
      userId,
      game,
      score,
      details,
      timestamp: new Date().toISOString()
    };

    scores.push(newScore);
    writeData('scores', scores);

    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      users[userIndex].stats.totalGames++;
      if (details.won) users[userIndex].stats.totalWins++;
      if (details.streak > users[userIndex].stats.bestStreak) {
        users[userIndex].stats.bestStreak = details.streak;
      }
      writeData('users', users);
    }

    res.json({ success: true, score: newScore });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/leaderboard', authMiddleware, (req, res) => {
  try {
    const users = readData('users');
    const scores = readData('scores');

    const leaderboard = users.map(user => {
      const userScores = scores.filter(s => s.userId === user.id);
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
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/my-stats', authMiddleware, (req, res) => {
  try {
    const userId = req.userId;
    const users = readData('users');
    const scores = readData('scores');

    const user = users.find(u => u.id === userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userScores = scores.filter(s => s.userId === userId);

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
      recentGames: userScores.slice(-10).reverse()
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
