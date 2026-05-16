const express = require('express');
const pageController = require('../controllers/pageController');
const authController = require('../controllers/authController');
const { requireAdmin, requireSeller, requireAuth, requireCustomerOrGuestCheckout } = require('../middleware/authMiddleware');
const authRoutes = require('./authRoutes');
const catalogRoutes = require('./catalogRoutes');
const adminCatalogRoutes = require('./adminCatalogRoutes');

const router = express.Router();

router.get('/', pageController.home);
router.get('/packs', pageController.packs);
router.get('/cart', pageController.cart);
router.get('/checkout', requireCustomerOrGuestCheckout, pageController.checkout);
router.use(catalogRoutes);
router.use('/auth', authRoutes);
router.use('/admin', requireAdmin, adminCatalogRoutes);
router.get('/account', requireAuth, authController.account);
router.get('/admin/dashboard', requireAdmin, pageController.adminDashboard);
router.get('/seller/dashboard', requireSeller, pageController.sellerDashboard);

router.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'mustapha-shop' });
});

module.exports = router;
