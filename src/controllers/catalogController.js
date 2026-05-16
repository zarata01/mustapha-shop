const catalogSearchService = require('../services/catalogSearchService');

async function listParts(req, res, next) {
  try {
    const [categories, result] = await Promise.all([
      catalogSearchService.listCategories(),
      catalogSearchService.searchParts(req.query)
    ]);

    res.render('catalog/list', {
      title: 'Spare parts catalog | Mustapha Shop',
      categories,
      parts: result.parts,
      total: result.total,
      usingSampleData: result.usingSampleData,
      filters: req.query
    });
  } catch (error) {
    next(error);
  }
}

async function showPart(req, res, next) {
  try {
    const part = await catalogSearchService.findPartBySlug(req.params.slug);
    if (!part) {
      const error = new Error('Part not found.');
      error.status = 404;
      return next(error);
    }

    return res.render('catalog/detail', {
      title: `${part.name} | Mustapha Shop`,
      part
    });
  } catch (error) {
    return next(error);
  }
}

async function showCategory(req, res, next) {
  try {
    const [categories, page] = await Promise.all([
      catalogSearchService.listCategories(),
      catalogSearchService.findCategoryPage(req.params.slug, req.query)
    ]);

    if (!page) {
      const error = new Error('Category not found.');
      error.status = 404;
      return next(error);
    }

    return res.render('catalog/list', {
      title: `${page.category.name} parts | Mustapha Shop`,
      categories,
      currentCategory: page.category,
      parts: page.parts,
      total: page.total,
      usingSampleData: page.usingSampleData,
      filters: { ...req.query, category: req.params.slug }
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  listParts,
  showCategory,
  showPart
};
