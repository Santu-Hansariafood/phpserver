const mongoose = require("mongoose");

const buyerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mobile: [{ type: String, required: true }],
    email: [{ type: String, required: true }],
    group: { type: String, required: true },
    password: { type: String, required: true },
    commodity: [{ type: String, required: true }],
    brokerage: {
      type: Map,
      of: String,
      required: true,
    },
    consignee: [
      {
        value: { type: String, required: true },
        label: { type: String, required: true },
      },
    ],
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Buyer", buyerSchema);
