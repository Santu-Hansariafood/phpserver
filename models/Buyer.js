const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: [{ type: String, required: true }],
  email: [{ type: String, required: true }],
  companyName: { type: String },
  password: { type: String, required: true },
  commodity: [{ type: String }],
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

module.exports = mongoose.model('Buyer', buyerSchema);
