// Seeds the two demo applicant accounts referenced in the README, with
// their password hashed by bcrypt at run time (same code path real
// registration uses) rather than a hash pasted into schema.sql.
// Run: npm run seed-demo-users
require('dotenv').config();
const bcrypt = require('bcryptjs');
const pool = require('../config/db');

const DEMO_PASSWORD = 'applicant123';

const DEMO_APPLICANTS = [
  {
    email: 'jane.doe@example.com',
    name: 'Jane Doe',
    profile: {
      phone: '+1 (555) 019-2834',
      title: 'Software Engineer (Frontend)',
      bio: 'Frontend engineer passionate about building accessible UI.',
      edu_degree: 'B.S. Computer Science',
      edu_school: 'State University',
      edu_year: '2016 - 2020',
      skills: ['JavaScript', 'React', 'CSS'],
      exp_role: 'Frontend Developer',
      exp_company: 'PrevCo',
      exp_duration: '2020 - Present',
      exp_description: 'Built and maintained customer-facing web apps.'
    }
  },
  {
    email: 'john.smith@example.com',
    name: 'John Smith',
    profile: {
      phone: '+1 (555) 044-7710',
      title: 'Data Analyst',
      bio: 'Analyst with a background in statistics and reporting.',
      edu_degree: 'B.S. Statistics',
      edu_school: 'State University',
      edu_year: '2017 - 2021',
      skills: ['SQL', 'Python', 'Tableau'],
      exp_role: 'Data Analyst',
      exp_company: 'PrevCo',
      exp_duration: '2021 - Present',
      exp_description: 'Built dashboards and ran A/B experiments.'
    }
  }
];

async function main() {
  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);

  for (const applicant of DEMO_APPLICANTS) {
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [applicant.email]);
    let userId;

    if (existing.length > 0) {
      userId = existing[0].id;
      await pool.query('UPDATE users SET password_hash = ?, name = ?, role = ? WHERE id = ?',
        [passwordHash, applicant.name, 'applicant', userId]);
    } else {
      const [result] = await pool.query(
        'INSERT INTO users (email, password_hash, name, role) VALUES (?, ?, ?, ?)',
        [applicant.email, passwordHash, applicant.name, 'applicant']
      );
      userId = result.insertId;
    }

    const p = applicant.profile;
    await pool.query(
      `INSERT INTO applicant_profiles
         (user_id, phone, title, bio, edu_degree, edu_school, edu_year, skills, exp_role, exp_company, exp_duration, exp_description)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         phone = VALUES(phone), title = VALUES(title), bio = VALUES(bio),
         edu_degree = VALUES(edu_degree), edu_school = VALUES(edu_school), edu_year = VALUES(edu_year),
         skills = VALUES(skills), exp_role = VALUES(exp_role), exp_company = VALUES(exp_company),
         exp_duration = VALUES(exp_duration), exp_description = VALUES(exp_description)`,
      [userId, p.phone, p.title, p.bio, p.edu_degree, p.edu_school, p.edu_year, JSON.stringify(p.skills),
       p.exp_role, p.exp_company, p.exp_duration, p.exp_description]
    );

    console.log(`Seeded ${applicant.email} (password: ${DEMO_PASSWORD})`);
  }

  process.exit(0);
}

main().catch((err) => {
  console.error('Failed to seed demo users:', err.message);
  process.exit(1);
});
