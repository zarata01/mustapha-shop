function attachCurrentUser(req, res, next) {
  res.locals.currentUser = req.session?.user || null;
  next();
}

function requireAuth(req, res, next) {
  if (req.session?.user) return next();
  return res.redirect('/auth/login');
}

function requireRole(role) {
  return (req, res, next) => {
    if (!req.session?.user) return res.redirect('/auth/login');
    if (req.session.user.role !== role) {
      const error = new Error('You do not have permission to access this page.');
      error.status = 403;
      return next(error);
    }
    return next();
  };
}


function requireCustomerOrGuestCheckout(req, res, next) {
  const user = req.session?.user;
  if (!user || user.role === 'customer') return next();

  const error = new Error('Seller and admin accounts cannot use customer checkout.');
  error.status = 403;
  return next(error);
}

const requireAdmin = requireRole('admin');
const requireSeller = requireRole('seller');

module.exports = {
  attachCurrentUser,
  requireAuth,
  requireRole,
  requireCustomerOrGuestCheckout,
  requireAdmin,
  requireSeller
};
