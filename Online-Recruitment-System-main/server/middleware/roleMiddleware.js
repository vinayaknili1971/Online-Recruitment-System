// Role checks always read req.session.user.role — the role recorded in
// the database at login time — and NEVER req.body.role or any other
// client-supplied value. requireAuth must run before these so
// req.session.user is guaranteed to exist.

function requireAdmin(req, res, next) {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ success: false, message: 'Unauthorized. Please log in.' });
  }
  if (req.session.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Forbidden. Admin access required.' });
  }
  next();
}

function requireApplicant(req, res, next) {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ success: false, message: 'Unauthorized. Please log in.' });
  }
  if (req.session.user.role !== 'applicant') {
    return res.status(403).json({ success: false, message: 'Forbidden. Applicant access required.' });
  }
  next();
}

module.exports = { requireAdmin, requireApplicant };
