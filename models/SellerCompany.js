const mongoose = require("mongoose");

const sellerCompanySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  gstNo: { type: String, required: true },
  panNo: { type: String, required: true },
  aadhaarNo: { type: String, required: true },
  address: { type: String, required: true },
  pinNo: { type: String, required: true },
  state: { type: String, required: true },
  district: { type: String, required: true },
  msme: { type: Boolean, default: false },
  msmeNo: { type: String },
  bankDetails: [
    {
      accountHolderName: String,
      accountNumber: String,
      ifscCode: String,
      branchName: String,
      bankName: String,
    },
  ],
  documents: {
    addressProof: String,
    gstProof: String,
    panProof: String,
    aadhaarCard: String,
    checkCopy: String,
    msmeCopy: String, 
  },
}, { timestamps: true });

module.exports = mongoose.model("SellerCompany", sellerCompanySchema);
