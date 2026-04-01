const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  plan: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: true },
  handler: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['active', 'expired', 'cancelled'], default: 'active' },
  renewalStatus: { type: String, enum: ['none', 'pending', 'rejected'], default: 'none' },
  policyNumber: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('Policy', policySchema);
