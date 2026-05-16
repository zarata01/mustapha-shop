const mongoose = require('mongoose');

const sellerProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  businessName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 160
  },
  businessPhone: {
    type: String,
    trim: true,
    maxlength: 30
  },
  address: {
    type: String,
    trim: true,
    maxlength: 260
  },
  city: {
    type: String,
    trim: true,
    maxlength: 80
  },
  description: {
    type: String,
    trim: true,
    maxlength: 1000
  },
  ratingAverage: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  ratingCount: {
    type: Number,
    default: 0,
    min: 0
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

sellerProfileSchema.index({ userId: 1 }, { unique: true });
sellerProfileSchema.index({ city: 1, isActive: 1 });

module.exports = mongoose.model('SellerProfile', sellerProfileSchema);
