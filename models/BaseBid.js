const mongoose = require("mongoose");

const baseBidSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, enum: ["buyer", "seller"] },
    group: { type: String, required: true },
    consignee: { type: String, required: true },
    origin: { type: String, required: true },
    commodity: { type: String, required: true },
    parameters: [
      {
        parameter: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    quantity: { type: Number, required: true },
    rate: { type: Number, required: true },
    bidDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    paymentTerms: { type: String, required: true },
    delivery: { type: String, required: true },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BaseBid", baseBidSchema);
