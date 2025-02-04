const mongoose = require("mongoose");

const selfOrderSchema = new mongoose.Schema(
  {
    buyer: { type: String, required: true, trim: true },
    buyerCompany: { type: String, trim: true },
    consignee: { type: String, trim: true },
    buyerEmail: { 
      type: String, 
      trim: true, 
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ 
    },
    buyerCommodity: [{ type: String, trim: true }],
    buyerBrokerage: {
      brokerageBuyer: { type: String, trim: true },
      brokerageSupplier: { type: String, trim: true },
    },
    supplierBrokerage: [
      {
        name: { type: String, required: true, trim: true },
        brokerage: { type: String, required: true, trim: true },
      },
    ],
    commodity: { type: String, trim: true },
    parameters: [
      {
        parameter: { type: String, required: true, trim: true },
        value: { type: String, required: true, trim: true },
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
      },
    ],       
    poNumber: { type: String, required: true, unique: true, trim: true },
    poDate: { type: Date, default: Date.now },
    state: { type: String, trim: true },
    location: { type: String, trim: true },
    quantity: { type: String, trim: true },
    pendingQuantity: { type: String, trim: true },
    rate: { type: String, trim: true },
    gst: { type: String, trim: true },
    cd: { type: String, trim: true },
    weight: { type: String, trim: true },
    supplier: { type: String, trim: true },
    supplierCompany: { type: String, trim: true },
    paymentTerms: { type: String, trim: true },
    deliveryDate: { type: Date },
    loadingDate: { type: Date },
    notes: [{ type: String, trim: true }],
    broker: { type: String, trim: true, default: "Hansaria Food Pvt. Ltd." },
    agentName: { type: String, trim: true },
    buyerEmails: [
      { 
        type: String, 
        trim: true, 
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ 
      },
    ],
    sellerEmails: [
      { 
        type: String, 
        trim: true, 
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ 
      },
    ],
    sendPOToBuyer: { type: String, enum: ["yes", "no"], default: "yes" },
    sendPOToSupplier: { type: String, enum: ["yes", "no"], default: "yes" },
    billTo: {
      type: String,
      enum: ["none", "buyer", "consignee"],
      default: "none",
    },
    saudaNo: { type: String, required: true, unique: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SelfOrder", selfOrderSchema);
