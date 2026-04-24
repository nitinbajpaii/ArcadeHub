const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// @route   GET /api/test/db
// @desc    Test database connection status
router.get('/db', async (req, res) => {
  try {
    const dbStatus = mongoose.connection.readyState;
    const statusMap = {
      0: 'Disconnected',
      1: 'Connected',
      2: 'Connecting',
      3: 'Disconnecting',
    };

    res.json({
      status: 'Success',
      message: 'Database connection test',
      connection: statusMap[dbStatus] || 'Unknown',
      dbName: mongoose.connection.name
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      message: error.message
    });
  }
});

module.exports = router;
