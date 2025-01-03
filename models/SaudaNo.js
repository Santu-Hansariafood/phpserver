const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  seq: {
    type: Number,
    default: 0,
  },
});

const SaudaNoSchema = new mongoose.Schema({
  saudaNo: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Counter = mongoose.model("Counter", CounterSchema);
const SaudaNo = mongoose.model("SaudaNo", SaudaNoSchema);

module.exports = { Counter, SaudaNo };
