const pool = require('../config/db');
const { toAppId, parseNumericId } = require('../utils/idFormat');
const { ALLOWED_STATUSES } = require('../utils/validators');

function rowToApplication(row) {
  return {
    id: toAppId(row.id),
    applicantEmail: row.applicantEmail,
    applicantName: row.applicantName,
    applicantPhone: row.applicantPhone,
    jobId: `job-${row.job_id}`,
    jobTitle: row.jobTitle,
    company: row.company,
    appliedDate: row.applied_date,
    lastUpdated: row.last_updated,
    status: row.status,
    resumeName: row.resume_name,
    coverLetter: row.cover_letter
  };
}

// GET /api/admin/applications — every applicant's applications (admin only)
async function getAllApplications(req, res) {
  try {
    const [rows] = await pool.query(
      `SELECT a.*, u.email AS applicantEmail, u.name AS applicantName, p.phone AS applicantPhone,
              j.title AS jobTitle, j.company AS company
       FROM applications a
       JOIN users u ON u.id = a.applicant_user_id
       LEFT JOIN applicant_profiles p ON p.user_id = u.id
       JOIN jobs j ON j.id = a.job_id
       ORDER BY a.applied_date DESC`
    );
    res.json({ success: true, applications: rows.map(rowToApplication) });
  } catch (err) {
    console.error('getAllApplications error:', err.message);
    res.status(500).json({ success: false, message: 'Could not load applications.' });
  }
}

// PUT /api/admin/applications/:id — update workflow status (admin only)
async function updateApplicationStatus(req, res) {
  try {
    const appId = parseNumericId(req.params.id);
    if (!appId) return res.status(400).json({ success: false, message: 'Invalid application id.' });

    const { status } = req.body || {};
    if (!ALLOWED_STATUSES.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value.' });
    }

    const today = new Date().toISOString().split('T')[0];
    const [result] = await pool.query(
      'UPDATE applications SET status = ?, last_updated = ? WHERE id = ?',
      [status, today, appId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Application not found.' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('updateApplicationStatus error:', err.message);
    res.status(500).json({ success: false, message: 'Could not update application status.' });
  }
}

// GET /api/admin/candidates — candidate directory (admin only)
async function getCandidateDirectory(req, res) {
  try {
    const [rows] = await pool.query(
      `SELECT u.name, u.email, p.phone, p.edu_degree, p.edu_school, p.skills,
              (SELECT a.resume_name FROM applications a WHERE a.applicant_user_id = u.id ORDER BY a.applied_date DESC LIMIT 1) AS resume
       FROM users u
       LEFT JOIN applicant_profiles p ON p.user_id = u.id
       WHERE u.role = 'applicant'
       ORDER BY u.name ASC`
    );
    const candidates = rows.map(row => ({
      name: row.name,
      email: row.email,
      phone: row.phone || '',
      education: row.edu_degree ? `${row.edu_degree}${row.edu_school ? ' - ' + row.edu_school : ''}` : 'Not provided',
      skills: row.skills || [],
      resume: row.resume || ''
    }));
    res.json({ success: true, candidates });
  } catch (err) {
    console.error('getCandidateDirectory error:', err.message);
    res.status(500).json({ success: false, message: 'Could not load candidate directory.' });
  }
}

module.exports = { getAllApplications, updateApplicationStatus, getCandidateDirectory };
