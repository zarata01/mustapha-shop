const test = require('node:test');
const assert = require('node:assert/strict');
const { createSlug } = require('../../src/utils/slug');
const { splitList, parseKeyValueLines, validatePart } = require('../../src/validators/partValidators');

test('catalog helpers normalize slugs, lists, attributes, and required part fields', () => {
  assert.equal(createSlug(' Front Brake Pad Set / 2026! '), 'front-brake-pad-set-2026');
  assert.deepEqual(splitList('OEM-1, OEM-2\nOEM-3'), ['OEM-1', 'OEM-2', 'OEM-3']);
  assert.deepEqual(parseKeyValueLines('Position: Front\nMaterial: Ceramic'), { position: 'Front', material: 'Ceramic' });

  const validation = validatePart({ name: 'Oil Filter', brand: 'Select', manufacturerPartNumber: 'OF-100', attributes: 'Type: Spin-on' });
  assert.equal(validation.isValid, true);
  assert.equal(validation.values.slug, 'oil-filter-of-100');
  assert.deepEqual(validation.values.attributes, { type: 'Spin-on' });
});
