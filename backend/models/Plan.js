const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['car', 'bike', 'health', 'life', 'travel', 'home', 'other'], 
    required: true 
  },
  description: { type: String, required: true },
  premiumAmount: { type: Number, required: true }, // Default Monthly Premium
  coverageAmount: { type: Number, required: true }, // Total Coverage Output
  durationYears: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Plan', planSchema);
