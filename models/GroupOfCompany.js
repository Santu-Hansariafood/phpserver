const mongoose = require("mongoose");

const groupOfCompanySchema = new mongoose.Schema(
  {
    groupName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GroupOfCompany", groupOfCompanySchema);
