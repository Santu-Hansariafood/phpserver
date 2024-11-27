const SellerCompany = require("../models/SellerCompany");

const createSellerCompany = async (data) => {
  const sellerCompany = new SellerCompany(data);
  return await sellerCompany.save();
};

const getAllSellerCompanies = async () => {
  return await SellerCompany.find();
};

const getSellerCompanyById = async (id) => {
  return await SellerCompany.findById(id);
};

const updateSellerCompany = async (id, data) => {
  return await SellerCompany.findByIdAndUpdate(id, data, { new: true });
};

const deleteSellerCompany = async (id) => {
  return await SellerCompany.findByIdAndDelete(id);
};

module.exports = {
  createSellerCompany,
  getAllSellerCompanies,
  getSellerCompanyById,
  updateSellerCompany,
  deleteSellerCompany,
};
