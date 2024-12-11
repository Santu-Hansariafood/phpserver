const BidLocation = require("../models/bidLocationModel");

exports.getAllBidLocations = async () => {
  return await BidLocation.find();
};

exports.createBidLocation = async (name) => {
  const newLocation = new BidLocation({ name });
  return await newLocation.save();
};

exports.updateBidLocation = async (id, name) => {
  return await BidLocation.findByIdAndUpdate(id, { name }, { new: true });
};

exports.deleteBidLocation = async (id) => {
  return await BidLocation.findByIdAndDelete(id);
};
