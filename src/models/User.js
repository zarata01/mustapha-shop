const mongoose = require('mongoose');

const USER_ROLES = ['customer', 'seller', 'admin'];

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 120
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    maxlength: 160
  },
  phone: {
    type: String,
    trim: true,
    maxlength: 30
  },
  passwordHash: {
    type: String,
    required: true,
    select: false
  },
  role: {
    type: String,
    enum: USER_ROLES,
    default: 'customer',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1, isActive: 1 });

userSchema.methods.toSessionUser = function toSessionUser() {
  return {
    id: this._id.toString(),
    name: this.name,
    email: this.email,
    role: this.role
  };
};

module.exports = mongoose.model('User', userSchema);
module.exports.USER_ROLES = USER_ROLES;
