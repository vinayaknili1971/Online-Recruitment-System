const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/roleMiddleware');
const { createJob, updateJob, deleteJob } = require('../controllers/jobController');
const { getAllApplications, updateApplicationStatus, getCandidateDirectory } = require('../controllers/adminController');

// requireAuth THEN requireAdmin on every route in this file. This is the
// server-side gate described in the security requirements: even a user
// who knows these URLs and is logged in as an applicant gets a 403, and
// an unauthenticated caller gets a 401 — regardless of what the
// frontend does or doesn't show them.
router.use(requireAuth, requireAdmin);

router.post('/jobs', createJob);
router.put('/jobs/:id', updateJob);
router.delete('/jobs/:id', deleteJob);

router.get('/applications', getAllApplications);
router.put('/applications/:id', updateApplicationStatus);

router.get('/candidates', getCandidateDirectory);

module.exports = router;
