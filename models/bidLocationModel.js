const mongoose = require("mongoose");

const bidLocationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

const BidLocation = mongoose.model("BidLocation", bidLocationSchema);

module.exports = BidLocation;
