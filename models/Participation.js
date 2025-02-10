const mongoose = require("mongoose");

const ParticipationSchema = new mongoose.Schema({
  bidId: { type: mongoose.Schema.Types.ObjectId, ref: "Bid", required: true },
  mobile: { type: Number, required: true },
  rate: { type: Number, required: true },
  quantity: { type: Number, required: true },
  participationDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Participation", ParticipationSchema);
