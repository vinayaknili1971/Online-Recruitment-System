const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const { register, login, logout, me } = require('../controllers/authController');

// Slows brute-force login/registration attempts without blocking normal use.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many attempts. Please try again later.' }
});

router.post('/register', loginLimiter, register);
router.post('/login', loginLimiter, login);
router.post('/logout', logout);
router.get('/me', me);

module.exports = router;
