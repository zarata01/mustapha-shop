const mongoose = require('mongoose');
const { createSlug } = require('../utils/slug');

const vehicleModelSchema = new mongoose.Schema({
  makeId: { type: mongoose.Schema.Types.ObjectId, ref: 'VehicleMake', required: true },
  name: { type: String, required: true, trim: true, maxlength: 120 },
  slug: { type: String, required: true, trim: true, lowercase: true, maxlength: 140 },
  generation: { type: String, trim: true, maxlength: 80 },
  startYear: { type: Number, min: 1900, max: 2100 },
  endYear: { type: Number, min: 1900, max: 2100 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

vehicleModelSchema.index({ makeId: 1, slug: 1 }, { unique: true });
vehicleModelSchema.index({ makeId: 1, isActive: 1 });
vehicleModelSchema.pre('validate', function assignSlug(next) {
  if (!this.slug && this.name) this.slug = createSlug(this.name);
  next();
});

module.exports = mongoose.model('VehicleModel', vehicleModelSchema);
