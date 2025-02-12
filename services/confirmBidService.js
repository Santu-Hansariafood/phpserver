const ConfirmBid = require("../models/ConfirmBid");

const createConfirmBid = async (data) => {
  return await ConfirmBid.create(data);
};

const getAllConfirmedBids = async () => {
  return await ConfirmBid.find();
};

module.exports = { createConfirmBid, getAllConfirmedBids };
