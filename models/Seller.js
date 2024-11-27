const mongoose = require("mongoose");

const SellerSchema = new mongoose.Schema(
  {
    sellerName: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumbers: [{ value: { type: String, required: true } }],
    emails: [{ value: { type: String, required: true } }],
    selectedCommodity: { type: String, required: true },
    selectedCompany: { type: String, required: true },
    selectedStatus: {
      type: String,
      enum: ["active", "inactive"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Seller", SellerSchema);
