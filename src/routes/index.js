const express = require('express');
const pageController = require('../controllers/pageController');
const { requireAdmin, requireSeller } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', pageController.home);
router.get('/parts', pageController.parts);
router.get('/packs', pageController.packs);
router.get('/cart', pageController.cart);
router.get('/checkout', pageController.checkout);
router.get('/auth/login', pageController.login);
router.get('/admin/dashboard', requireAdmin, pageController.adminDashboard);
router.get('/seller/dashboard', requireSeller, pageController.sellerDashboard);

router.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'mustapha-shop' });
});

module.exports = router;
