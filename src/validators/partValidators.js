const { createSlug } = require('../utils/slug');
const { normalizeText } = require('./authValidators');

function splitList(value = '') {
  return String(value)
    .split(/[,\n]/)
    .map((item) => normalizeText(item))
    .filter(Boolean);
}

function parseKeyValueLines(value = '') {
  return String(value)
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .reduce((result, line) => {
      const [key, ...rest] = line.split(':');
      if (key && rest.length) result[createSlug(key)] = normalizeText(rest.join(':'));
      return result;
    }, {});
}

function validateCategory(body) {
  const values = {
    name: normalizeText(body.name),
    slug: createSlug(body.slug || body.name),
    description: normalizeText(body.description),
    sortOrder: Number(body.sortOrder || 0)
  };
  const errors = {};

  if (values.name.length < 2) errors.name = 'Category name must be at least 2 characters.';
  if (!values.slug) errors.slug = 'Category slug is required.';

  return { values, errors, isValid: Object.keys(errors).length === 0 };
}

function validatePart(body) {
  const values = {
    name: normalizeText(body.name),
    slug: createSlug(body.slug || `${body.name || ''} ${body.manufacturerPartNumber || ''}`),
    categoryId: normalizeText(body.categoryId) || undefined,
    description: normalizeText(body.description),
    brand: normalizeText(body.brand),
    manufacturerPartNumber: normalizeText(body.manufacturerPartNumber),
    oemNumbers: splitList(body.oemNumbers),
    aftermarketNumbers: splitList(body.aftermarketNumbers),
    universalBarcode: normalizeText(body.universalBarcode),
    tags: splitList(body.tags).map(createSlug),
    attributes: parseKeyValueLines(body.attributes),
    compatibility: [{
      makeName: normalizeText(body.makeName),
      modelName: normalizeText(body.modelName),
      engineCode: normalizeText(body.engineCode),
      startYear: body.startYear ? Number(body.startYear) : undefined,
      endYear: body.endYear ? Number(body.endYear) : undefined,
      notes: normalizeText(body.compatibilityNotes)
    }].filter((item) => item.makeName || item.modelName || item.engineCode || item.notes)
  };
  const errors = {};

  if (values.name.length < 2) errors.name = 'Part name must be at least 2 characters.';
  if (!values.slug) errors.slug = 'Part slug is required.';
  if (!values.brand) errors.brand = 'Brand is required.';
  if (!values.manufacturerPartNumber) errors.manufacturerPartNumber = 'Manufacturer part number is required.';

  return { values, errors, isValid: Object.keys(errors).length === 0 };
}

module.exports = {
  splitList,
  parseKeyValueLines,
  validateCategory,
  validatePart
};
