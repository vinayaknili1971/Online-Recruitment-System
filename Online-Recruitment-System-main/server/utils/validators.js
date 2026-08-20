// Small, dependency-free server-side validators. Frontend validation is
// for UX only — every one of these is re-checked here because the
// frontend can never be trusted.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email) {
  return typeof email === 'string' && email.length <= 255 && EMAIL_RE.test(email);
}

function isValidPassword(password) {
  return typeof password === 'string' && password.length >= 8 && password.length <= 200;
}

function isNonEmptyString(value, maxLen = 255) {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= maxLen;
}

function isValidPhone(phone) {
  if (phone === '' || phone === undefined || phone === null) return true; // optional field
  return typeof phone === 'string' && /^[0-9+()\-.\s]{5,30}$/.test(phone);
}

function isPositiveInt(value) {
  const n = Number(value);
  return Number.isInteger(n) && n > 0;
}

function isStringArray(value, maxItems = 50, maxItemLen = 100) {
  return Array.isArray(value) &&
    value.length <= maxItems &&
    value.every(v => typeof v === 'string' && v.length <= maxItemLen);
}

function isValidDate(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !isNaN(Date.parse(value));
}

const ALLOWED_STATUSES = ['Applied', 'Pending', 'Shortlisted', 'Selected', 'Rejected'];

module.exports = {
  isValidEmail,
  isValidPassword,
  isNonEmptyString,
  isValidPhone,
  isPositiveInt,
  isStringArray,
  isValidDate,
  ALLOWED_STATUSES
};
