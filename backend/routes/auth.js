const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/signup', async (req, res) => {
  console.log('📝 Signup attempt started');
  try {
    const { username, email, password } = req.body;

    // 1. Validation
    if (!username || !email || !password) {
      console.log('❌ Signup failed: Missing fields');
      return res.status(400).json({ error: 'Username, email, and password are required' });
    }

    // 2. Check if user already exists
    console.log(`🔍 Checking if user exists: ${email} or ${username}`);
    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      console.log('❌ Signup failed: User already exists');
      return res.status(400).json({ error: 'Email or Username already taken' });
    }

    // 3. Hash password
    console.log('🔐 Hashing password...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create and save user
    console.log('💾 Saving user to MongoDB...');
    user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();
    console.log('✅ User saved successfully');

    // 5. Generate Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        stats: user.stats
      }
    });
  } catch (error) {
    console.error('💥 SIGNUP CRITICAL ERROR:', error);
    res.status(500).json({ 
      error: 'Server error during signup',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

router.post('/login', async (req, res) => {
  console.log('🔑 Login attempt started');
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log('❌ Login failed: Missing fields');
      return res.status(400).json({ error: 'Email and password are required' });
    }

    console.log(`🔍 Finding user: ${email}`);
    const user = await User.findOne({ email });

    if (!user) {
      console.log('❌ Login failed: User not found');
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    console.log('🔐 Comparing passwords...');
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log('❌ Login failed: Password mismatch');
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    console.log('✅ Login successful, generating token...');
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        stats: user.stats
      }
    });
  } catch (error) {
    console.error('💥 LOGIN CRITICAL ERROR:', error);
    res.status(500).json({ 
      error: 'Server error during login',
      details: error.message 
    });
  }
});

module.exports = router;
