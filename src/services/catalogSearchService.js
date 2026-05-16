const mongoose = require('mongoose');
const Category = require('../models/Category');
const Part = require('../models/Part');
const { createSlug } = require('../utils/slug');

const sampleCategories = [
  { name: 'Engine', slug: 'engine', description: 'Filters, belts, pumps, sensors, and service essentials.' },
  { name: 'Brakes', slug: 'brakes', description: 'Pads, rotors, drums, hydraulic parts, and accessories.' },
  { name: 'Suspension', slug: 'suspension', description: 'Shocks, struts, control arms, bushings, and mounts.' },
  { name: 'Electrical', slug: 'electrical', description: 'Bulbs, batteries, alternators, sensors, and switches.' }
];

const sampleParts = [
  {
    name: 'Premium Oil Filter',
    slug: 'premium-oil-filter',
    brand: 'Mustapha Select',
    categorySlug: 'engine',
    categoryName: 'Engine',
    description: 'High-flow oil filter for common petrol engines. Built for reliable daily maintenance.',
    manufacturerPartNumber: 'MS-OF-1001',
    oemNumbers: ['OEM-OF-8841'],
    aftermarketNumbers: ['AF-7781'],
    tags: ['filter', 'service'],
    attributes: { filterType: 'Spin-on', material: 'Synthetic media' },
    compatibility: [{ makeName: 'Toyota', modelName: 'Corolla', startYear: 2012, endYear: 2018, notes: '1.6 petrol' }],
    offerSummary: { sellerCount: 3, startsFrom: 12.5, currency: 'USD', availabilityStatus: 'in_stock' }
  },
  {
    name: 'Front Brake Pad Set',
    slug: 'front-brake-pad-set',
    brand: 'RoadGrip',
    categorySlug: 'brakes',
    categoryName: 'Brakes',
    description: 'Low-dust ceramic brake pad set with strong city-driving bite.',
    manufacturerPartNumber: 'RG-BP-2210',
    oemNumbers: ['OEM-BR-2210'],
    aftermarketNumbers: ['PAD-4421'],
    tags: ['brake', 'pads'],
    attributes: { position: 'Front', material: 'Ceramic' },
    compatibility: [{ makeName: 'Hyundai', modelName: 'Elantra', startYear: 2017, endYear: 2021, notes: 'Front axle' }],
    offerSummary: { sellerCount: 4, startsFrom: 34.99, currency: 'USD', availabilityStatus: 'low_stock' }
  },
  {
    name: 'Gas Charged Shock Absorber',
    slug: 'gas-charged-shock-absorber',
    brand: 'StabilPro',
    categorySlug: 'suspension',
    categoryName: 'Suspension',
    description: 'Rear gas shock absorber tuned for comfort and stable load handling.',
    manufacturerPartNumber: 'SP-SHOCK-390',
    oemNumbers: ['OEM-SU-390'],
    aftermarketNumbers: ['ABS-390G'],
    tags: ['shock', 'rear'],
    attributes: { position: 'Rear', type: 'Gas charged' },
    compatibility: [{ makeName: 'Nissan', modelName: 'Sentra', startYear: 2013, endYear: 2019, notes: 'Rear suspension' }],
    offerSummary: { sellerCount: 2, startsFrom: 49.5, currency: 'USD', availabilityStatus: 'in_stock' }
  }
];

function isDatabaseReady() {
  return mongoose.connection.readyState === 1;
}

function matchesQuery(part, query = {}) {
  const searchText = [part.name, part.brand, part.manufacturerPartNumber, ...(part.oemNumbers || []), ...(part.aftermarketNumbers || []), ...(part.tags || [])]
    .join(' ')
    .toLowerCase();
  const q = String(query.q || '').toLowerCase().trim();
  const category = String(query.category || '').trim();
  const brand = String(query.brand || '').toLowerCase().trim();
  const make = String(query.make || '').toLowerCase().trim();

  if (q && !searchText.includes(q)) return false;
  if (category && part.categorySlug !== category) return false;
  if (brand && String(part.brand || '').toLowerCase() !== brand) return false;
  if (make && !(part.compatibility || []).some((item) => String(item.makeName || '').toLowerCase().includes(make))) return false;
  return true;
}

async function listCategories() {
  if (!isDatabaseReady()) return sampleCategories;

  return Category.find({ isActive: true })
    .sort({ sortOrder: 1, name: 1 })
    .lean();
}

async function searchParts(query = {}) {
  if (!isDatabaseReady()) {
    const parts = sampleParts.filter((part) => matchesQuery(part, query));
    return { parts, total: parts.length, usingSampleData: true };
  }

  const filter = { isActive: true };
  if (query.q) filter.$text = { $search: query.q };
  if (query.brand) filter.brand = query.brand;
  if (query.category) {
    const category = await Category.findOne({ slug: query.category, isActive: true }).lean();
    if (category) filter.categoryId = category._id;
  }
  if (query.make) filter['compatibility.makeName'] = new RegExp(query.make, 'i');

  const parts = await Part.find(filter)
    .populate('categoryId', 'name slug')
    .sort(query.q ? { score: { $meta: 'textScore' } } : { createdAt: -1 })
    .lean();

  return { parts: parts.map(normalizePart), total: parts.length, usingSampleData: false };
}

async function findPartBySlug(slug) {
  if (!isDatabaseReady()) return sampleParts.find((part) => part.slug === slug) || null;

  const part = await Part.findOne({ slug, isActive: true }).populate('categoryId', 'name slug').lean();
  return part ? normalizePart(part) : null;
}

async function findCategoryPage(slug, query = {}) {
  const category = (await listCategories()).find((item) => item.slug === slug);
  if (!category) return null;

  const result = await searchParts({ ...query, category: slug });
  return { category, ...result };
}

function normalizePart(part) {
  const category = part.categoryId || {};
  return {
    ...part,
    categoryName: category.name || part.categoryName || 'Catalog',
    categorySlug: category.slug || part.categorySlug || '',
    attributes: part.attributes instanceof Map ? Object.fromEntries(part.attributes) : part.attributes,
    standardIds: part.standardIds instanceof Map ? Object.fromEntries(part.standardIds) : part.standardIds,
    offerSummary: part.offerSummary || { sellerCount: 0, startsFrom: null, currency: 'USD', availabilityStatus: 'pending_offers' }
  };
}

function buildPartSlug(name, manufacturerPartNumber) {
  return createSlug([name, manufacturerPartNumber].filter(Boolean).join(' '));
}

module.exports = {
  buildPartSlug,
  findCategoryPage,
  findPartBySlug,
  listCategories,
  searchParts,
  sampleCategories,
  sampleParts
};
