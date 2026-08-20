-- =====================================================================
-- Online Recruitment System — MySQL schema
-- Run with:  mysql -u root -p < database/schema.sql
-- =====================================================================

CREATE DATABASE IF NOT EXISTS ors
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE ors;

-- ---------------------------------------------------------------------
-- users: one row per login account (both admins and applicants).
-- Passwords are ALWAYS bcrypt hashes, never plaintext.
-- role is the single source of truth for authorization decisions on
-- the server — it is never trusted from the client.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email         VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  name          VARCHAR(150) NOT NULL,
  role          ENUM('admin', 'applicant') NOT NULL DEFAULT 'applicant',
  created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_users_role (role)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- applicant_profiles: 1:1 extension of users for applicant-only data.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS applicant_profiles (
  id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id         INT UNSIGNED NOT NULL UNIQUE,
  phone           VARCHAR(30)  NOT NULL DEFAULT '',
  title           VARCHAR(150) NOT NULL DEFAULT 'Job Seeker',
  bio             TEXT,
  edu_degree      VARCHAR(150) NOT NULL DEFAULT '',
  edu_school      VARCHAR(150) NOT NULL DEFAULT '',
  edu_year        VARCHAR(50)  NOT NULL DEFAULT '',
  skills          JSON NULL,
  exp_role        VARCHAR(150) NOT NULL DEFAULT '',
  exp_company     VARCHAR(150) NOT NULL DEFAULT '',
  exp_duration    VARCHAR(100) NOT NULL DEFAULT '',
  exp_description TEXT,
  created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_profile_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- jobs: postings managed by admins, browsed by applicants.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS jobs (
  id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title        VARCHAR(200) NOT NULL,
  company      VARCHAR(200) NOT NULL,
  location     VARCHAR(150) NOT NULL,
  job_type     VARCHAR(50)  NOT NULL,
  salary       VARCHAR(100) NOT NULL,
  experience   VARCHAR(100) NOT NULL,
  posted_date  DATE NOT NULL,
  deadline     DATE NOT NULL,
  skills       JSON NULL,
  description  TEXT NOT NULL,
  requirements JSON NULL,
  created_by   INT UNSIGNED NULL,
  created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_job_creator FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_jobs_deadline (deadline)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- applications: one applicant applying to one job.
-- applicant_user_id is always taken from the authenticated session on
-- the server — never from client-supplied data — so an applicant can
-- never write an application under someone else's identity.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS applications (
  id                INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  applicant_user_id INT UNSIGNED NOT NULL,
  job_id            INT UNSIGNED NOT NULL,
  applied_date      DATE NOT NULL,
  last_updated      DATE NOT NULL,
  status            ENUM('Applied','Pending','Shortlisted','Selected','Rejected') NOT NULL DEFAULT 'Applied',
  resume_name       VARCHAR(255) NOT NULL,
  cover_letter      TEXT,
  created_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_app_applicant FOREIGN KEY (applicant_user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_app_job FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
  UNIQUE KEY uniq_applicant_job (applicant_user_id, job_id),
  INDEX idx_apps_job (job_id)
) ENGINE=InnoDB;

-- ---------------------------------------------------------------------
-- Seed data (safe to re-run: uses INSERT IGNORE on the unique key).
--
-- IMPORTANT: user accounts (both the demo applicants and the admin
-- account) are intentionally NOT seeded here with a hardcoded password
-- hash. A bcrypt hash pasted into a .sql file either has to be
-- generated correctly out-of-band (easy to get subtly wrong / stale)
-- or, worse, invites copy-pasting the same well-known demo hash across
-- projects. Instead, run after this schema:
--
--   npm run create-admin -- admin@recruiter.com "ChangeThisPassword123"
--   npm run seed-demo-users
--
-- Both scripts hash the password with bcrypt at run time via the same
-- code path real registration uses. See README.md.
-- ---------------------------------------------------------------------
INSERT IGNORE INTO jobs (title, company, location, job_type, salary, experience, posted_date, deadline, skills, description, requirements) VALUES
('Senior Frontend Engineer', 'VibeTech Corp', 'Remote', 'Full-time', '$125,000 - $145,000', 'Senior (5+ yrs)', '2026-08-16', '2026-10-15',
 JSON_ARRAY('React','JavaScript','TypeScript','TailwindCSS','Vite'),
 'We are looking for a Senior Frontend Engineer to lead the design and implementation of our next-generation web application.',
 JSON_ARRAY('5+ years of experience with modern frontend applications built with React.','Strong understanding of ES6+ JavaScript and TypeScript.')),
('Full Stack Developer', 'ByteNexus', 'San Francisco, CA', 'Full-time', '$110,000 - $135,000', 'Mid-level (2-5 yrs)', '2026-08-14', '2026-09-30',
 JSON_ARRAY('Node.js','Express','React','MongoDB','REST APIs'),
 'ByteNexus is hiring a versatile Full Stack Developer to build and maintain end-to-end features for our analytics dashboard.',
 JSON_ARRAY('3+ years of professional backend and frontend development experience.','Proficient in writing RESTful web APIs.'));
