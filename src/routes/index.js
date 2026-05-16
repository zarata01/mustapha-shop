const express = require('express');
const pageController = require('../controllers/pageController');
const authController = require('../controllers/authController');
const { requireAdmin, requireSeller, requireAuth, requireCustomerOrGuestCheckout } = require('../middleware/authMiddleware');
const authRoutes = require('./authRoutes');

const router = express.Router();

router.get('/', pageController.home);
router.get('/parts', pageController.parts);
router.get('/packs', pageController.packs);
router.get('/cart', pageController.cart);
router.get('/checkout', requireCustomerOrGuestCheckout, pageController.checkout);
router.use('/auth', authRoutes);
router.get('/account', requireAuth, authController.account);
router.get('/admin/dashboard', requireAdmin, pageController.adminDashboard);
router.get('/seller/dashboard', requireSeller, pageController.sellerDashboard);

router.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'mustapha-shop' });
});

module.exports = router;
