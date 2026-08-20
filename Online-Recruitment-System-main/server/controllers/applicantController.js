const pool = require('../config/db');
const { toAppId, parseNumericId } = require('../utils/idFormat');
const { isNonEmptyString, isValidPhone, isStringArray } = require('../utils/validators');

// Every query below filters by req.session.user.id — the authenticated
// user's own id from the server-side session — never an id taken from
// the URL or request body. That's what makes it impossible for an
// applicant to read or edit another applicant's data by editing a
// request.

function rowToProfile(row, email, name) {
  return {
    name: name,
    email: email,
    phone: row.phone || '',
    title: row.title || 'Job Seeker',
    bio: row.bio || '',
    education: { degree: row.edu_degree || '', school: row.edu_school || '', year: row.edu_year || '' },
    skills: row.skills || [],
    experience: {
      role: row.exp_role || '',
      company: row.exp_company || '',
      duration: row.exp_duration || '',
      description: row.exp_description || ''
    }
  };
}

// GET /api/applicant/profile
async function getProfile(req, res) {
  try {
    const userId = req.session.user.id;
    const [rows] = await pool.query(
      `SELECT p.*, u.email, u.name FROM applicant_profiles p
       JOIN users u ON u.id = p.user_id WHERE p.user_id = ?`,
      [userId]
    );
    if (rows.length === 0) {
      return res.json({ success: true, profile: rowToProfile({}, req.session.user.email, req.session.user.name) });
    }
    res.json({ success: true, profile: rowToProfile(rows[0], rows[0].email, rows[0].name) });
  } catch (err) {
    console.error('getProfile error:', err.message);
    res.status(500).json({ success: false, message: 'Could not load profile.' });
  }
}

// PUT /api/applicant/profile
async function updateProfile(req, res) {
  try {
    const userId = req.session.user.id;
    const body = req.body || {};
    const education = body.education || {};
    const experience = body.experience || {};

    if (!isNonEmptyString(body.name, 150)) {
      return res.status(400).json({ success: false, message: 'Name is required.' });
    }
    if (!isValidPhone(body.phone)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid phone number.' });
    }
    if (body.skills !== undefined && !isStringArray(body.skills)) {
      return res.status(400).json({ success: false, message: 'Skills must be a list of short text values.' });
    }

    // Note: email is intentionally NOT updated here — it's the login
    // identifier tied to the users table and changing it would need its
    // own re-verification flow, out of scope for this pass.
    await pool.query(
      `UPDATE users SET name = ? WHERE id = ?`,
      [body.name.trim(), userId]
    );

    await pool.query(
      `INSERT INTO applicant_profiles
         (user_id, phone, title, bio, edu_degree, edu_school, edu_year, skills, exp_role, exp_company, exp_duration, exp_description)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         phone = VALUES(phone), title = VALUES(title), bio = VALUES(bio),
         edu_degree = VALUES(edu_degree), edu_school = VALUES(edu_school), edu_year = VALUES(edu_year),
         skills = VALUES(skills), exp_role = VALUES(exp_role), exp_company = VALUES(exp_company),
         exp_duration = VALUES(exp_duration), exp_description = VALUES(exp_description)`,
      [
        userId,
        (body.phone || '').trim(),
        (body.title || 'Job Seeker').trim(),
        (body.bio || '').trim(),
        (education.degree || '').trim(),
        (education.school || '').trim(),
        (education.year || '').trim(),
        JSON.stringify(body.skills || []),
        (experience.role || '').trim(),
        (experience.company || '').trim(),
        (experience.duration || '').trim(),
        (experience.description || '').trim()
      ]
    );

    req.session.user.name = body.name.trim();
    res.json({ success: true });
  } catch (err) {
    console.error('updateProfile error:', err.message);
    res.status(500).json({ success: false, message: 'Could not update profile.' });
  }
}

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

// GET /api/applicant/applications — only this applicant's own rows
async function getApplications(req, res) {
  try {
    const userId = req.session.user.id;
    const [rows] = await pool.query(
      `SELECT a.*, u.email AS applicantEmail, u.name AS applicantName, p.phone AS applicantPhone,
              j.title AS jobTitle, j.company AS company
       FROM applications a
       JOIN users u ON u.id = a.applicant_user_id
       LEFT JOIN applicant_profiles p ON p.user_id = u.id
       JOIN jobs j ON j.id = a.job_id
       WHERE a.applicant_user_id = ?
       ORDER BY a.applied_date DESC`,
      [userId]
    );
    res.json({ success: true, applications: rows.map(rowToApplication) });
  } catch (err) {
    console.error('getApplications error:', err.message);
    res.status(500).json({ success: false, message: 'Could not load applications.' });
  }
}

// POST /api/applicant/applications
// Applicant identity fields (name/email/phone) are looked up server-side
// from the session — never accepted from the request body — so a
// submitted application can't be forged to look like it came from
// someone else.
async function createApplication(req, res) {
  try {
    const userId = req.session.user.id;
    const body = req.body || {};
    const jobId = parseNumericId(body.jobId);

    if (!jobId) {
      return res.status(400).json({ success: false, message: 'A valid job is required.' });
    }
    if (!isNonEmptyString(body.resumeName, 255)) {
      return res.status(400).json({ success: false, message: 'A resume file name is required.' });
    }
    const extension = (body.resumeName.split('.').pop() || '').toLowerCase();
    if (!['pdf', 'doc', 'docx'].includes(extension)) {
      return res.status(400).json({ success: false, message: 'Resume must be a .pdf, .doc, or .docx file.' });
    }
    if (body.coverLetter !== undefined && typeof body.coverLetter !== 'string') {
      return res.status(400).json({ success: false, message: 'Invalid cover letter.' });
    }

    const [jobRows] = await pool.query('SELECT id FROM jobs WHERE id = ?', [jobId]);
    if (jobRows.length === 0) {
      return res.status(404).json({ success: false, message: 'Job posting not found.' });
    }

    const [existing] = await pool.query(
      'SELECT id FROM applications WHERE applicant_user_id = ? AND job_id = ?',
      [userId, jobId]
    );
    if (existing.length > 0) {
      return res.status(409).json({ success: false, message: 'You have already applied to this job.' });
    }

    const today = new Date().toISOString().split('T')[0];
    const [result] = await pool.query(
      `INSERT INTO applications (applicant_user_id, job_id, applied_date, last_updated, status, resume_name, cover_letter)
       VALUES (?, ?, ?, ?, 'Applied', ?, ?)`,
      [userId, jobId, today, today, body.resumeName, (body.coverLetter || '').trim()]
    );

    const [rows] = await pool.query(
      `SELECT a.*, u.email AS applicantEmail, u.name AS applicantName, p.phone AS applicantPhone,
              j.title AS jobTitle, j.company AS company
       FROM applications a
       JOIN users u ON u.id = a.applicant_user_id
       LEFT JOIN applicant_profiles p ON p.user_id = u.id
       JOIN jobs j ON j.id = a.job_id
       WHERE a.id = ?`,
      [result.insertId]
    );

    res.status(201).json({ success: true, application: rowToApplication(rows[0]) });
  } catch (err) {
    console.error('createApplication error:', err.message);
    res.status(500).json({ success: false, message: 'Could not submit application.' });
  }
}

module.exports = { getProfile, updateProfile, getApplications, createApplication };
