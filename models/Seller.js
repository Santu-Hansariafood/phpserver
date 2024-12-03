const mongoose = require("mongoose");

const SellerSchema = new mongoose.Schema(
  {
    sellerName: { type: String, required: true, maxlength: 50 },
    password: { type: String, required: true, minlength: 4, maxlength: 25 },
    phoneNumbers: [
      {
        value: { type: String, required: true, match: /^[0-9]{10,15}$/ },
      },
    ],
    emails: [
      {
        value: {
          type: String,
          required: true,
          match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        },
      },
    ],
    commodities: [
      {
        name: { type: String, required: true },
        brokerage: { type: Number, default: 0 },
      },
    ],
    selectedCompany: [
      {
        value: { type: String, required: true },
        label: { type: String, required: true },
      },
    ],
    selectedStatus: {
      type: String,
      enum: ["active", "inactive"],
      required: true,
    },
    buyers: [
      {
        name: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Seller", SellerSchema);
