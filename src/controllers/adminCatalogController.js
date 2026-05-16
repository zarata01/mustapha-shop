const mongoose = require('mongoose');
const Category = require('../models/Category');
const Part = require('../models/Part');
const catalogSearchService = require('../services/catalogSearchService');
const { validateCategory, validatePart } = require('../validators/partValidators');

function isDatabaseReady() {
  return mongoose.connection.readyState === 1;
}

async function listAdminParts(req, res, next) {
  try {
    const [categories, result] = await Promise.all([
      catalogSearchService.listCategories(),
      catalogSearchService.searchParts(req.query)
    ]);

    res.render('admin/parts/index', {
      title: 'Admin parts | Mustapha Shop',
      categories,
      parts: result.parts,
      filters: req.query,
      usingSampleData: result.usingSampleData,
      databaseReady: isDatabaseReady()
    });
  } catch (error) {
    next(error);
  }
}

async function newPart(req, res, next) {
  try {
    res.render('admin/parts/new', {
      title: 'Create part | Mustapha Shop',
      categories: await catalogSearchService.listCategories(),
      values: {},
      errors: {},
      databaseReady: isDatabaseReady()
    });
  } catch (error) {
    next(error);
  }
}

async function createPart(req, res, next) {
  const validation = validatePart(req.body);
  if (!isDatabaseReady()) {
    validation.errors.form = 'MongoDB is not connected. Start the database before creating catalog records.';
  }

  if (!validation.isValid || Object.keys(validation.errors).length) {
    return res.status(422).render('admin/parts/new', {
      title: 'Create part | Mustapha Shop',
      categories: await catalogSearchService.listCategories(),
      values: validation.values,
      errors: validation.errors,
      databaseReady: isDatabaseReady()
    });
  }

  try {
    await Part.create(validation.values);
    return res.redirect('/admin/parts');
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).render('admin/parts/new', {
        title: 'Create part | Mustapha Shop',
        categories: await catalogSearchService.listCategories(),
        values: validation.values,
        errors: { slug: 'A part with this slug already exists.' },
        databaseReady: isDatabaseReady()
      });
    }
    return next(error);
  }
}

async function disablePart(req, res, next) {
  if (!isDatabaseReady()) {
    const error = new Error('MongoDB is not connected.');
    error.status = 503;
    return next(error);
  }

  try {
    await Part.findByIdAndUpdate(req.params.id, { isActive: false });
    return res.redirect('/admin/parts');
  } catch (error) {
    return next(error);
  }
}

async function listCategories(req, res, next) {
  try {
    res.render('admin/categories/index', {
      title: 'Admin categories | Mustapha Shop',
      categories: await catalogSearchService.listCategories(),
      values: {},
      errors: {},
      databaseReady: isDatabaseReady()
    });
  } catch (error) {
    next(error);
  }
}

async function createCategory(req, res, next) {
  const validation = validateCategory(req.body);
  if (!isDatabaseReady()) validation.errors.form = 'MongoDB is not connected. Start the database before creating categories.';

  if (!validation.isValid || Object.keys(validation.errors).length) {
    return res.status(422).render('admin/categories/index', {
      title: 'Admin categories | Mustapha Shop',
      categories: await catalogSearchService.listCategories(),
      values: validation.values,
      errors: validation.errors,
      databaseReady: isDatabaseReady()
    });
  }

  try {
    await Category.create(validation.values);
    return res.redirect('/admin/categories');
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createCategory,
  createPart,
  disablePart,
  listAdminParts,
  listCategories,
  newPart
};
