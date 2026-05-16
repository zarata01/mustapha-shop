const express = require('express');
const authController = require('../controllers/authController');
const { requireCsrfToken } = require('../middleware/csrfMiddleware');

const router = express.Router();

router.get('/register', authController.renderRegister);
router.post('/register', requireCsrfToken, authController.register);
router.get('/login', authController.renderLogin);
router.post('/login', requireCsrfToken, authController.login);
router.post('/logout', requireCsrfToken, authController.logout);
router.get('/forgot-password', (req, res) => {
  res.render('placeholder', {
    title: 'Forgot password | Mustapha Shop',
    pageTitle: 'Forgot password',
    description: 'Password reset will be added after email delivery settings are configured.'
  });
});
module.exports = router;
