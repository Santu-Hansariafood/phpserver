const mongoose = require("mongoose");

const baseBidSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, enum: ["buyer", "seller"] },
    selectedOption: { type: String, required: true },
    company: { type: String, required: true },
    origin: { type: String, required: true },
    commodity: { type: String, required: true },
    parameters: {
      type: Map,
      of: String,
      default: {},
    },
    quantity: { type: Number, required: true },
    rate: { type: Number, required: true },
    bidDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    paymentTerms: { type: String, required: true },
    delivery: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BaseBid", baseBidSchema);
