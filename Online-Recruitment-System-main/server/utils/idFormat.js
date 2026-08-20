// The original frontend (kept as-is wherever possible) compares job/
// application ids as strings like "job-3" / "app-12" in dozens of
// places. Rather than touch every comparison, the API formats the
// numeric MySQL primary key into that same shape on the way out, and
// parses it back to a plain integer on the way in.

function toJobId(numericId) {
  return `job-${numericId}`;
}

function toAppId(numericId) {
  return `app-${numericId}`;
}

// Accepts "job-12", "12", or 12 and returns the integer 12 (or null if invalid)
function parseNumericId(value) {
  if (value === undefined || value === null) return null;
  const match = String(value).match(/(\d+)\s*$/);
  if (!match) return null;
  const n = parseInt(match[1], 10);
  return Number.isInteger(n) && n > 0 ? n : null;
}

module.exports = { toJobId, toAppId, parseNumericId };
