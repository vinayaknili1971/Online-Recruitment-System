// requireAuth: the ONLY thing that proves who a request belongs to is
// the server-side session created at login. There is no header or body
// field the client can send to "become" logged in — the session cookie
// is HTTP-only and signed, so it cannot be read or forged by frontend
// JavaScript.

function requireAuth(req, res, next) {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ success: false, message: 'Unauthorized. Please log in.' });
  }
  next();
}

module.exports = { requireAuth };
