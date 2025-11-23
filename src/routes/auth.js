const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const User = require('../models/User');
const rateLimiter = require('../middleware/rateLimiter');
const { recordFailedLogin, resetLoginAttempts } = require('../middleware/bruteForce');
const logger = require('../utils/logger');

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing fields' });

    const hash = await argon2.hash(password);
    const user = new User({ email, passwordHash: hash });
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    logger.error(err);
    if (err.code === 11000) return res.status(409).json({ message: 'Email already exists' });
    res.status(500).json({ message: 'Registration failed' });
  }
});

router.post('/login', rateLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      await new Promise(r => setTimeout(r, 300));
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (user.isLocked) {
      return res.status(423).json({ message: `Account locked until ${user.lockUntil}` });
    }

    const ok = await argon2.verify(user.passwordHash, password);
    if (!ok) {
      await recordFailedLogin(user._id);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    await resetLoginAttempts(user._id);
    res.json({ message: 'Login successful', token: 'TODO-JWT' });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: 'Login error' });
  }
});

module.exports = router;
