const mongoose = require('mongoose');
const { createSlug } = require('../utils/slug');

const compatibilitySchema = new mongoose.Schema({
  makeId: { type: mongoose.Schema.Types.ObjectId, ref: 'VehicleMake' },
  modelId: { type: mongoose.Schema.Types.ObjectId, ref: 'VehicleModel' },
  engineId: { type: mongoose.Schema.Types.ObjectId, ref: 'VehicleEngine' },
  makeName: { type: String, trim: true },
  modelName: { type: String, trim: true },
  engineCode: { type: String, trim: true },
  startYear: { type: Number, min: 1900, max: 2100 },
  endYear: { type: Number, min: 1900, max: 2100 },
  notes: { type: String, trim: true, maxlength: 500 }
}, { _id: false });

const partSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 180 },
  slug: { type: String, required: true, trim: true, lowercase: true, maxlength: 200 },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  description: { type: String, trim: true, maxlength: 3000 },
  brand: { type: String, trim: true, maxlength: 120 },
  manufacturerPartNumber: { type: String, trim: true, maxlength: 120 },
  oemNumbers: [{ type: String, trim: true, maxlength: 120 }],
  aftermarketNumbers: [{ type: String, trim: true, maxlength: 120 }],
  universalBarcode: { type: String, trim: true, maxlength: 120 },
  standardIds: { type: Map, of: String, default: {} },
  attributes: { type: Map, of: String, default: {} },
  compatibility: [compatibilitySchema],
  images: [{ type: String, trim: true }],
  tags: [{ type: String, trim: true, lowercase: true, maxlength: 80 }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

partSchema.index({ slug: 1 }, { unique: true });
partSchema.index({ categoryId: 1, isActive: 1 });
partSchema.index({ brand: 1, isActive: 1 });
partSchema.index({ manufacturerPartNumber: 1 });
partSchema.index({ oemNumbers: 1 });
partSchema.index({ name: 'text', brand: 'text', manufacturerPartNumber: 'text', oemNumbers: 'text', aftermarketNumbers: 'text', tags: 'text' });

partSchema.pre('validate', function assignSlug(next) {
  if (!this.slug && this.name) this.slug = createSlug(this.name);
  next();
});

module.exports = mongoose.model('Part', partSchema);
