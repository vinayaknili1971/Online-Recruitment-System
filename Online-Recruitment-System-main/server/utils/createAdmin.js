// One-off script to create (or reset the password of) an admin account.
// Run: node server/utils/createAdmin.js admin@example.com "StrongPassword123"
require('dotenv').config();
const bcrypt = require('bcryptjs');
const pool = require('../config/db');

async function main() {
  const [, , email, password, name] = process.argv;
  if (!email || !password) {
    console.error('Usage: node server/utils/createAdmin.js <admin@recruiter.com> <admin12345> [admin]');
    process.exit(1);
  }
  if (password.length < 8) {
    console.error('Password must be at least 8 characters.');
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const displayName = name || 'System Admin';

  const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email.toLowerCase()]);
  if (existing.length > 0) {
    await pool.query('UPDATE users SET password_hash = ?, role = ?, name = ? WHERE email = ?',
      [passwordHash, 'admin', displayName, email.toLowerCase()]);
    console.log(`Updated existing account ${email} to admin with a new password.`);
  } else {
    await pool.query('INSERT INTO users (email, password_hash, name, role) VALUES (?, ?, ?, ?)',
      [email.toLowerCase(), passwordHash, displayName, 'admin']);
    console.log(`Created admin account ${email}.`);
  }
  process.exit(0);
}

main().catch((err) => {
  console.error('Failed to create admin:', err.message);
  process.exit(1);
});
