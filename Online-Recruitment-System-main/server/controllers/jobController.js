const pool = require('../config/db');
const { toJobId, parseNumericId } = require('../utils/idFormat');
const { isNonEmptyString, isStringArray, isValidDate } = require('../utils/validators');

function rowToJob(row) {
  return {
    id: toJobId(row.id),
    title: row.title,
    company: row.company,
    location: row.location,
    jobType: row.job_type,
    salary: row.salary,
    experience: row.experience,
    postedDate: row.posted_date,
    deadline: row.deadline,
    skills: row.skills || [],
    description: row.description,
    requirements: row.requirements || []
  };
}

function validateJobBody(body) {
  if (!isNonEmptyString(body.title, 200)) return 'Job title is required.';
  if (!isNonEmptyString(body.company, 200)) return 'Company is required.';
  if (!isNonEmptyString(body.location, 150)) return 'Location is required.';
  if (!isNonEmptyString(body.jobType, 50)) return 'Job type is required.';
  if (!isNonEmptyString(body.salary, 100)) return 'Salary is required.';
  if (!isNonEmptyString(body.experience, 100)) return 'Experience level is required.';
  if (!isNonEmptyString(body.description, 5000)) return 'Description is required.';
  if (!isValidDate(body.deadline)) return 'A valid deadline date (YYYY-MM-DD) is required.';
  if (!isStringArray(body.skills)) return 'Skills must be a list of short text values.';
  if (!isStringArray(body.requirements, 50, 500)) return 'Requirements must be a list of short text values.';
  return null;
}

// GET /api/jobs — any authenticated user (applicant or admin) can browse
async function listJobs(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM jobs ORDER BY posted_date DESC');
    res.json({ success: true, jobs: rows.map(rowToJob) });
  } catch (err) {
    console.error('listJobs error:', err.message);
    res.status(500).json({ success: false, message: 'Could not load job postings.' });
  }
}

// POST /api/admin/jobs — admin only (enforced by route middleware)
async function createJob(req, res) {
  try {
    const body = req.body || {};
    const validationError = validateJobBody(body);
    if (validationError) {
      return res.status(400).json({ success: false, message: validationError });
    }

    const today = new Date().toISOString().split('T')[0];
    const [result] = await pool.query(
      `INSERT INTO jobs (title, company, location, job_type, salary, experience, posted_date, deadline, skills, description, requirements, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        body.title.trim(), body.company.trim(), body.location.trim(), body.jobType.trim(),
        body.salary.trim(), body.experience.trim(), today, body.deadline,
        JSON.stringify(body.skills), body.description.trim(), JSON.stringify(body.requirements),
        req.session.user.id
      ]
    );

    const [rows] = await pool.query('SELECT * FROM jobs WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, job: rowToJob(rows[0]) });
  } catch (err) {
    console.error('createJob error:', err.message);
    res.status(500).json({ success: false, message: 'Could not create job posting.' });
  }
}

// PUT /api/admin/jobs/:id — admin only
async function updateJob(req, res) {
  try {
    const jobId = parseNumericId(req.params.id);
    if (!jobId) return res.status(400).json({ success: false, message: 'Invalid job id.' });

    const body = req.body || {};
    const validationError = validateJobBody(body);
    if (validationError) {
      return res.status(400).json({ success: false, message: validationError });
    }

    const [existing] = await pool.query('SELECT id FROM jobs WHERE id = ?', [jobId]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Job posting not found.' });
    }

    await pool.query(
      `UPDATE jobs SET title = ?, company = ?, location = ?, job_type = ?, salary = ?, experience = ?,
              deadline = ?, skills = ?, description = ?, requirements = ? WHERE id = ?`,
      [
        body.title.trim(), body.company.trim(), body.location.trim(), body.jobType.trim(),
        body.salary.trim(), body.experience.trim(), body.deadline,
        JSON.stringify(body.skills), body.description.trim(), JSON.stringify(body.requirements),
        jobId
      ]
    );

    const [rows] = await pool.query('SELECT * FROM jobs WHERE id = ?', [jobId]);
    res.json({ success: true, job: rowToJob(rows[0]) });
  } catch (err) {
    console.error('updateJob error:', err.message);
    res.status(500).json({ success: false, message: 'Could not update job posting.' });
  }
}

// DELETE /api/admin/jobs/:id — admin only
async function deleteJob(req, res) {
  try {
    const jobId = parseNumericId(req.params.id);
    if (!jobId) return res.status(400).json({ success: false, message: 'Invalid job id.' });

    const [result] = await pool.query('DELETE FROM jobs WHERE id = ?', [jobId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Job posting not found.' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('deleteJob error:', err.message);
    res.status(500).json({ success: false, message: 'Could not delete job posting.' });
  }
}

module.exports = { listJobs, createJob, updateJob, deleteJob };
