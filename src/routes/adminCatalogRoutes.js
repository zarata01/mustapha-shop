const express = require('express');
const adminCatalogController = require('../controllers/adminCatalogController');
const { requireCsrfToken } = require('../middleware/csrfMiddleware');

const router = express.Router();

router.get('/parts', adminCatalogController.listAdminParts);
router.get('/parts/new', adminCatalogController.newPart);
router.post('/parts', requireCsrfToken, adminCatalogController.createPart);
router.patch('/parts/:id/disable', requireCsrfToken, adminCatalogController.disablePart);
router.get('/categories', adminCatalogController.listCategories);
router.post('/categories', requireCsrfToken, adminCatalogController.createCategory);

module.exports = router;
