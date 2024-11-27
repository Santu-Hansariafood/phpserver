const Seller = require("../models/Seller");

const addSellerDetails = async (sellerData) => {
  const seller = new Seller(sellerData);
  return await seller.save();
};

const getSellers = async () => {
  return await Seller.find();
};

const getSellerById = async (id) => {
  return await Seller.findById(id);
};

const updateSeller = async (id, sellerData) => {
  return await Seller.findByIdAndUpdate(id, sellerData, { new: true });
};

const deleteSeller = async (id) => {
  return await Seller.findByIdAndDelete(id);
};

module.exports = {
  addSellerDetails,
  getSellers,
  getSellerById,
  updateSeller,
  deleteSeller,
};
