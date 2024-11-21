const mongoose = require("mongoose");

const ParameterSchema = new mongoose.Schema({
  parameter: { type: String, required: true },
  value: { type: String, required: false },
});

const CommoditySchema = new mongoose.Schema({
  name: { type: String, required: true },
  parameters: [ParameterSchema],
});

const CompanySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  companyPhone: { type: String, required: true },
  companyEmail: { type: String, required: true },
  consignee: [{ type: String }],
  group: { type: String, required: true },
  commodities: [CommoditySchema],
});

module.exports = mongoose.model("Company", CompanySchema);
