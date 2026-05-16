const crypto = require('node:crypto');

function ensureCsrfToken(req) {
  if (!req.session.csrfToken) {
    req.session.csrfToken = crypto.randomBytes(32).toString('hex');
  }
  return req.session.csrfToken;
}

function attachCsrfToken(req, res, next) {
  if (!req.session) return next();
  res.locals.csrfToken = ensureCsrfToken(req);
  return next();
}

function requireCsrfToken(req, res, next) {
  const sessionToken = req.session?.csrfToken;
  const requestToken = req.body?._csrf;

  if (sessionToken && requestToken && sessionToken.length === requestToken.length) {
    const isValid = crypto.timingSafeEqual(Buffer.from(sessionToken), Buffer.from(requestToken));
    if (isValid) return next();
  }

  const error = new Error('Invalid form token. Please refresh and try again.');
  error.status = 403;
  return next(error);
}

module.exports = {
  attachCsrfToken,
  requireCsrfToken
};
