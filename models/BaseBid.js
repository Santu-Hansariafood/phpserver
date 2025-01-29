const mongoose = require("mongoose");

const baseBidSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["buyer", "seller"], required: true },
    group: { type: String, required: true },
    consignee: { type: String, required: true },
    origin: { type: String, required: true },
    commodity: { type: String, required: true },
    parameters: { type: Object, default: {} },
    notes: { type: String, default: "" },
    quantity: { type: Number, required: true },
    rate: { type: Number, required: true },
    bidDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    paymentTerms: { type: String, default: "" },
    delivery: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BaseBid", baseBidSchema);
