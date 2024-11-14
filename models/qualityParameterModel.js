const mongoose = require("mongoose");

const qualityParameterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("QualityParameter", qualityParameterSchema);
