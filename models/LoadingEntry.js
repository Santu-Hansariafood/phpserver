const mongoose = require("mongoose");

const loadingEntrySchema = new mongoose.Schema(
  {
    loadingDate: Date,
    loadingWeight: Number,
    lorryNumber: String,
    addedTransport: String,
    driverName: String,
    driverPhoneNumber: String,
    freightRate: Number,
    totalFreight: Number,
    advance: Number,
    balance: Number,
    billNumber: String,
    dateOfIssue: Date,
    documentUrl: String,
    saudaNo: String,
    supplier: String,
    consignee: String,
    commodity: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("LoadingEntry", loadingEntrySchema);