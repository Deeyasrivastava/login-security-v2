const User = require('../models/User');
const logger = require('../utils/logger');

const MAX_ATTEMPTS = 5;
const BASE_LOCK_TIME_MS = 15 * 60 * 1000;

async function recordFailedLogin(userId) {
  const user = await User.findById(userId);
  if (!user) return;
  user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;
  user.lastFailedAt = new Date();

  if (user.failedLoginAttempts >= MAX_ATTEMPTS) {
    const extra = Math.pow(2, user.failedLoginAttempts - MAX_ATTEMPTS);
    user.lockUntil = new Date(Date.now() + BASE_LOCK_TIME_MS * extra);
    logger.warn(`User ${user.email} locked until ${user.lockUntil}`);
  }
  await user.save();
}

async function resetLoginAttempts(userId) {
  await User.findByIdAndUpdate(userId, { failedLoginAttempts: 0, lockUntil: null, lastFailedAt: null });
}

module.exports = { recordFailedLogin, resetLoginAttempts };
