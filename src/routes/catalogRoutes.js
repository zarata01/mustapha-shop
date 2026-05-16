const express = require('express');
const catalogController = require('../controllers/catalogController');

const router = express.Router();

router.get('/parts', catalogController.listParts);
router.get('/parts/:slug', catalogController.showPart);
router.get('/categories/:slug', catalogController.showCategory);
router.get('/search', catalogController.listParts);

module.exports = router;
