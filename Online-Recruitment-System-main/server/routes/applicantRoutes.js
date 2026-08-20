const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');
const { requireApplicant } = require('../middleware/roleMiddleware');
const { getProfile, updateProfile, getApplications, createApplication } = require('../controllers/applicantController');

// Every route here is scoped to req.session.user.id inside the
// controller — there is no :id in these URLs, so there is nothing for
// an applicant to tamper with to reach another applicant's data.
router.use(requireAuth, requireApplicant);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.get('/applications', getApplications);
router.post('/applications', createApplication);

module.exports = router;
