const mongoose = require('mongoose');

const vehicleEngineSchema = new mongoose.Schema({
  modelId: { type: mongoose.Schema.Types.ObjectId, ref: 'VehicleModel', required: true },
  engineCode: { type: String, required: true, trim: true, maxlength: 80 },
  fuelType: { type: String, trim: true, maxlength: 40 },
  displacement: { type: String, trim: true, maxlength: 40 },
  power: { type: String, trim: true, maxlength: 40 },
  startYear: { type: Number, min: 1900, max: 2100 },
  endYear: { type: Number, min: 1900, max: 2100 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

vehicleEngineSchema.index({ modelId: 1, engineCode: 1 }, { unique: true });
vehicleEngineSchema.index({ modelId: 1, isActive: 1 });

module.exports = mongoose.model('VehicleEngine', vehicleEngineSchema);
