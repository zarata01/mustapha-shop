const mongoose = require('mongoose');
const { createSlug } = require('../utils/slug');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 120 },
  slug: { type: String, required: true, trim: true, lowercase: true, maxlength: 140 },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
  description: { type: String, trim: true, maxlength: 1200 },
  imagePath: { type: String, trim: true },
  sortOrder: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

categorySchema.index({ slug: 1 }, { unique: true });
categorySchema.index({ parentId: 1, sortOrder: 1, isActive: 1 });

categorySchema.pre('validate', function assignSlug(next) {
  if (!this.slug && this.name) this.slug = createSlug(this.name);
  next();
});

module.exports = mongoose.model('Category', categorySchema);
