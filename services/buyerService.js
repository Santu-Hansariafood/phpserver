const Buyer = require("../models/Buyer");

const getAllBuyers = async () => {
  return await Buyer.find();
};

const getBuyerById = async (id) => {
  return await Buyer.findById(id);
};

const createBuyer = async (buyerData) => {
  const buyer = new Buyer(buyerData);
  return await buyer.save();
};

const updateBuyer = async (id, buyerData) => {
  return await Buyer.findByIdAndUpdate(id, buyerData, { new: true });
};

const deleteBuyer = async (id) => {
  return await Buyer.findByIdAndDelete(id);
};

const loginBuyer = async (mobile, password) => {
  const buyer = await Buyer.findOne({ mobile: mobile });

  if (!buyer) {
    throw new Error("Buyer not found");
  }

  if (buyer.password !== password) {
    throw new Error("Invalid password");
  }

  return buyer;
};

module.exports = {
  getAllBuyers,
  getBuyerById,
  createBuyer,
  updateBuyer,
  deleteBuyer,
  loginBuyer,
};
