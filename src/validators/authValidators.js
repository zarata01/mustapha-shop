const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+\d][+\d\s().-]{6,29}$/;

function normalizeText(value = '') {
  return String(value).trim().replace(/\s+/g, ' ');
}

function normalizeEmail(value = '') {
  return normalizeText(value).toLowerCase();
}

function validateRegistration(body) {
  const values = {
    name: normalizeText(body.name),
    email: normalizeEmail(body.email),
    phone: normalizeText(body.phone),
    password: String(body.password || ''),
    confirmPassword: String(body.confirmPassword || '')
  };
  const errors = {};

  if (values.name.length < 2) errors.name = 'Name must be at least 2 characters.';
  if (!EMAIL_PATTERN.test(values.email)) errors.email = 'Enter a valid email address.';
  if (values.phone && !PHONE_PATTERN.test(values.phone)) errors.phone = 'Enter a valid phone number.';
  if (values.password.length < 8) errors.password = 'Password must be at least 8 characters.';
  if (!/[A-Za-z]/.test(values.password) || !/\d/.test(values.password)) {
    errors.password = 'Password must include letters and numbers.';
  }
  if (values.password !== values.confirmPassword) errors.confirmPassword = 'Passwords do not match.';

  return { values, errors, isValid: Object.keys(errors).length === 0 };
}

function validateLogin(body) {
  const values = {
    email: normalizeEmail(body.email),
    password: String(body.password || '')
  };
  const errors = {};

  if (!EMAIL_PATTERN.test(values.email)) errors.email = 'Enter a valid email address.';
  if (!values.password) errors.password = 'Password is required.';

  return { values, errors, isValid: Object.keys(errors).length === 0 };
}

module.exports = {
  validateRegistration,
  validateLogin,
  normalizeText,
  normalizeEmail
};
