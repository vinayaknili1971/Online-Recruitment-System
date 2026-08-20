const bcrypt = require('bcryptjs');
const pool = require('../config/db');
const { isValidEmail, isValidPassword, isNonEmptyString } = require('../utils/validators');

const SALT_ROUNDS = 10;

// POST /api/auth/register — new applicants only. Role is hardcoded to
// 'applicant' server-side; it is never accepted from the request body,
// so there is no way for a client to register themselves as an admin.
async function register(req, res) {
  try {
    const { name, email, password } = req.body || {};

    if (!isNonEmptyString(name, 150)) {
      return res.status(400).json({ success: false, message: 'Please provide your full name.' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }
    if (!isValidPassword(password)) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters.' });
    }

    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email.toLowerCase()]);
    if (existing.length > 0) {
      return res.status(409).json({ success: false, message: 'An account with that email already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const [result] = await pool.query(
      'INSERT INTO users (email, password_hash, name, role) VALUES (?, ?, ?, ?)',
      [email.toLowerCase(), passwordHash, name.trim(), 'applicant']
    );

    await pool.query(
      `INSERT INTO applicant_profiles (user_id, title, skills)
       VALUES (?, 'Job Seeker', JSON_ARRAY())`,
      [result.insertId]
    );

    req.session.regenerate((err) => {
      if (err) return res.status(500).json({ success: false, message: 'Could not create session.' });
      req.session.user = { id: result.insertId, email: email.toLowerCase(), role: 'applicant', name: name.trim() };
      res.status(201).json({ success: true, user: req.session.user });
    });
  } catch (err) {
    console.error('register error:', err.message);
    res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' });
  }
}

// POST /api/auth/login
async function login(req, res) {
  try {
    const { email, password } = req.body || {};

    if (!isValidEmail(email) || typeof password !== 'string' || password.length === 0) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const [rows] = await pool.query(
      'SELECT id, email, password_hash, name, role FROM users WHERE email = ?',
      [email.toLowerCase()]
    );

    // Always run bcrypt.compare (against a dummy hash if no user found) so
    // response timing doesn't reveal whether the email exists.
    const user = rows[0];
    const hashToCheck = user ? user.password_hash : '$2b$10$CwTycUXWue0Thq9StjUM0uJ8Q9m8j8m8j8m8j8m8j8m8j8m8j8m8j';
    const passwordMatches = await bcrypt.compare(password, hashToCheck);

    if (!user || !passwordMatches) {
      return res.status(401).json({ success: false, message: 'Incorrect email or password.' });
    }

    req.session.regenerate((err) => {
      if (err) return res.status(500).json({ success: false, message: 'Could not create session.' });
      req.session.user = { id: user.id, email: user.email, role: user.role, name: user.name };
      res.json({ success: true, user: req.session.user });
    });
  } catch (err) {
    console.error('login error:', err.message);
    res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' });
  }
}

// POST /api/auth/logout
function logout(req, res) {
  if (!req.session) return res.json({ success: true });
  req.session.destroy((err) => {
    res.clearCookie('recruit.sid');
    if (err) return res.status(500).json({ success: false, message: 'Could not log out.' });
    res.json({ success: true });
  });
}

// GET /api/auth/me — used by the frontend on every protected page load
// to confirm the session is still valid, instead of trusting anything
// stored client-side.
function me(req, res) {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ success: false, message: 'Not authenticated.' });
  }
  res.json({ success: true, user: req.session.user });
}

module.exports = { register, login, logout, me };
