require('dotenv').config();

if (!process.env.SESSION_SECRET) {
  console.error('FATAL: SESSION_SECRET is not set. Copy .env.example to .env and fill it in.');
  process.exit(1);
}

const app = require('./app');
const pool = require('./config/db');

const PORT = process.env.PORT || 5000;

// Fail fast with a clear message if MySQL isn't reachable, instead of
// starting a server that will error on every request.
pool.query('SELECT 1')
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('FATAL: could not connect to MySQL.', err.message);
    process.exit(1);
  });
