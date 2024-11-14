const mongoose = require("mongoose");

const commoditySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    hsnCode: { type: String, required: true, trim: true },
    parameters: [
      {
        parameter: { type: String, required: true, trim: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Commodity", commoditySchema);
