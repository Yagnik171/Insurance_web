const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  policy: { type: mongoose.Schema.Types.ObjectId, ref: 'Policy', required: true },
  description: { type: String, required: true },
  claimAmount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  adminRemarks: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Claim', claimSchema);
