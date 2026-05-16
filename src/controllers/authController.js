const User = require('../models/User');
const { hashPassword, verifyPassword } = require('../utils/password');
const { validateRegistration, validateLogin } = require('../validators/authValidators');

function renderRegister(req, res) {
  res.render('auth/register', {
    title: 'Create customer account | Mustapha Shop',
    values: {},
    errors: {}
  });
}

async function register(req, res, next) {
  const validation = validateRegistration(req.body);

  if (!validation.isValid) {
    return res.status(422).render('auth/register', {
      title: 'Create customer account | Mustapha Shop',
      values: validation.values,
      errors: validation.errors
    });
  }

  try {
    const existingUser = await User.findOne({ email: validation.values.email }).lean();
    if (existingUser) {
      return res.status(409).render('auth/register', {
        title: 'Create customer account | Mustapha Shop',
        values: validation.values,
        errors: { email: 'An account already exists for this email.' }
      });
    }

    const passwordHash = await hashPassword(validation.values.password);
    const user = await User.create({
      name: validation.values.name,
      email: validation.values.email,
      phone: validation.values.phone,
      passwordHash,
      role: 'customer'
    });

    req.session.user = user.toSessionUser();
    return res.redirect('/account');
  } catch (error) {
    return next(error);
  }
}

function renderLogin(req, res) {
  res.render('auth/login', {
    title: 'Login | Mustapha Shop',
    values: {},
    errors: {}
  });
}

async function login(req, res, next) {
  const validation = validateLogin(req.body);

  if (!validation.isValid) {
    return res.status(422).render('auth/login', {
      title: 'Login | Mustapha Shop',
      values: validation.values,
      errors: validation.errors
    });
  }

  try {
    const user = await User.findOne({ email: validation.values.email, isActive: true }).select('+passwordHash');
    const isPasswordValid = user ? await verifyPassword(validation.values.password, user.passwordHash) : false;

    if (!user || !isPasswordValid) {
      return res.status(401).render('auth/login', {
        title: 'Login | Mustapha Shop',
        values: { email: validation.values.email },
        errors: { form: 'Invalid email or password.' }
      });
    }

    req.session.regenerate((regenerateError) => {
      if (regenerateError) return next(regenerateError);
      req.session.user = user.toSessionUser();
      return res.redirect(getRedirectForRole(user.role));
    });
  } catch (error) {
    return next(error);
  }
}

function logout(req, res, next) {
  req.session.destroy((error) => {
    if (error) return next(error);
    res.clearCookie(req.app.locals.sessionName || 'mustapha_shop_sid');
    return res.redirect('/');
  });
}

function account(req, res) {
  res.render('account/show', {
    title: 'My account | Mustapha Shop'
  });
}

function getRedirectForRole(role) {
  if (role === 'admin') return '/admin/dashboard';
  if (role === 'seller') return '/seller/dashboard';
  return '/account';
}

module.exports = {
  renderRegister,
  register,
  renderLogin,
  login,
  logout,
  account
};
