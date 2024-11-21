const mongoose = require("mongoose");

const consigneeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    gst: { type: String, required: true },
    pan: { type: String, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
    location: { type: String, required: true },
    pin: { type: String, required: true },
    contactPerson: { type: String, required: true },
    mandiLicense: { type: String, required: true },
    activeStatus: {
      type: String,
      required: true,
      enum: ["active", "inactive"],
    },
  },
  { timestamps: true }
);

const Consignee = mongoose.model("Consignee", consigneeSchema);
module.exports = Consignee;
