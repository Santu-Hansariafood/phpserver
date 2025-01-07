const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema(
  {
    sellerName: { type: String, required: true, maxlength: 50 },
    password: { type: String, required: true },
    phoneNumbers: [{ value: { type: String, required: true } }],
    emails: [{ value: { type: String, required: true } }],
    commodities: [
      {
        name: { type: String, required: true },
        brokerage: { type: Number, default: 0 },
      },
    ],
    companies: [String],
    selectedStatus: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    buyers: [{ name: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Seller", sellerSchema);
