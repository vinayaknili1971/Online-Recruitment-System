const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

const authRoutes = require('./routes/authRoutes');
const applicantRoutes = require('./routes/applicantRoutes');
const adminRoutes = require('./routes/adminRoutes');
const jobRoutes = require('./routes/jobRoutes');

const app = express();
const isProd = process.env.NODE_ENV === 'production';

app.set('trust proxy', 1);

// ---- Security headers ----
// CSP is relaxed for inline styles used throughout the existing
// hand-written CSS/JS; everything else stays locked down.
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      'script-src': ["'self'"],
      'style-src': ["'self'", 'https://fonts.googleapis.com', "'unsafe-inline'"],
      'font-src': ["'self'", 'https://fonts.gstatic.com'],
      'img-src': ["'self'", 'data:']
    }
  }
}));

// ---- CORS ----
// The frontend is served by this same Express app, so same-origin
// requests need no special CORS allowance. CLIENT_ORIGIN is only for
// the case where the frontend is hosted separately (e.g. local dev with
// a different dev server).
const clientOrigin = process.env.CLIENT_ORIGIN;
app.use(cors({
  origin: clientOrigin || true,
  credentials: true
}));

app.use(express.json({ limit: '200kb' }));

// ---- Sessions ----
// HTTP-only, signed cookie; the session id is meaningless without the
// server-side session store behind it, so it can't be edited by
// frontend JS or by hand to change identity or role.
app.use(session({
  name: 'recruit.sid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: isProd,       // requires HTTPS in production
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 8 // 8 hours
  }
}));

// ---- API routes ----
app.get('/api/health', (req, res) => res.json({ success: true, status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/applicant', applicantRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/jobs', jobRoutes);

// ---- Frontend static files ----
const frontendRoot = path.join(__dirname, '..', 'frontend');
app.use('/shared', express.static(path.join(frontendRoot, 'shared')));
app.use('/applicant/applicant.css',
  express.static(path.join(frontendRoot, 'applicant', 'applicant.css'))
);

// Protected applicant pages
app.use('/applicant', (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.redirect('/login/index.html');
  }
  next();
}, express.static(path.join(frontendRoot, 'applicant')));

// Defense in depth for the admin module: hiding the "/admin" link in the
// UI is NOT what makes this secure (every admin API call is already
// independently protected by requireAuth + requireAdmin above, and that
// is the real boundary). This guard additionally stops the admin HTML
// shell itself from being served to a browser that has no valid admin
// session, so a logged-out or non-admin visitor is redirected to login
// before the page (and its script tag) ever loads.
app.use('/admin', (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.redirect('/login/index.html');
  }
  if (req.session.user.role !== 'admin') {
    return res.redirect('/login/index.html');
  }
  next();
}, express.static(path.join(frontendRoot, 'admin')));

app.use('/applicant', (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.redirect('/login/index.html');
  }
  next();
}, express.static(path.join(frontendRoot, 'applicant')));

app.use('/login', express.static(path.join(frontendRoot, 'login')));
app.get('/', (req, res) => res.redirect('/login/index.html'));

// ---- 404 for unmatched API routes ----
app.use('/api', (req, res) => res.status(404).json({ success: false, message: 'Not found.' }));

// ---- Central error handler ----
// Never leak stack traces, SQL errors, or file paths to the client.
app.use((err, req, res, next) => {
  console.error(err.stack || err.message);
  res.status(500).json({ success: false, message: 'Internal server error.' });
});

module.exports = app;
