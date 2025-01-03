const mongoose = require("mongoose");

const selfOrderSchema = new mongoose.Schema(
  {
    buyer: { type: String, required: true },
    buyerCompany: { type: String },
    consignee: { type: String },
    buyerEmail: { type: String },
    buyerCommodity: [{ type: String }],
    buyerBrokerage: {
      brokerageBuyer: { type: String },
      brokerageSupplier: { type: String },
    },
    commodity: { type: String },
    parameters: [{ type: String }],
    poNumber: { type: String, required: true },
    poDate: { type: Date, default: Date.now },
    state: { type: String },
    location: { type: String },
    quantity: { type: String },
    pendingQuantity: { type: String },
    rate: { type: String },
    gst: { type: String },
    cd: { type: String },
    weight: { type: String },
    supplier: { type: String },
    supplierCompany: { type: String },
    paymentTerms: { type: String },
    deliveryDate: { type: Date },
    loadingDate: { type: Date },
    notes: [{ type: String }],
    broker: { type: String },
    agentName: { type: String },
    buyerEmails: [{ type: String }],
    sellerEmails: [{ type: String }],
    sendPOToBuyer: { type: String, enum: ["yes", "no"], default: "yes" },
    sendPOToSupplier: { type: String, enum: ["yes", "no"], default: "yes" },
    billTo: { type: String, enum: ["none", "buyer", "supplier"], default: "none" },
    saudaNo: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SelfOrder", selfOrderSchema);
