const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');
const { listJobs } = require('../controllers/jobController');

// Public within the app: any authenticated user (applicant or admin) can
// browse postings. Creating/editing/deleting jobs lives under
// /api/admin/jobs and requires requireAdmin — see adminRoutes.js.
router.get('/', requireAuth, listJobs);

module.exports = router;
