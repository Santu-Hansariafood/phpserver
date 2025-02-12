const mongoose = require("mongoose");

const ConfirmBidSchema = new mongoose.Schema({
  bidId: { type: String, required: true },
  sellerName: { type: String, required: true },
  company: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  rate: { type: Number, required: true },
  quantity: { type: Number, required: true },
  status: { type: String, enum: ["Confirmed", "Rejected"], required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ConfirmBid", ConfirmBidSchema);
