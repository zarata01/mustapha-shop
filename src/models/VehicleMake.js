const mongoose = require('mongoose');
const { createSlug } = require('../utils/slug');

const vehicleMakeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 120 },
  slug: { type: String, required: true, trim: true, lowercase: true, maxlength: 140 },
  country: { type: String, trim: true, maxlength: 80 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

vehicleMakeSchema.index({ slug: 1 }, { unique: true });
vehicleMakeSchema.pre('validate', function assignSlug(next) {
  if (!this.slug && this.name) this.slug = createSlug(this.name);
  next();
});

module.exports = mongoose.model('VehicleMake', vehicleMakeSchema);
