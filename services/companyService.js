const Company = require("../models/Company");

const getAllCompanies = async () => {
  return await Company.find();
};

const getCompanyById = async (id) => {
  return await Company.findById(id);
};

const createCompany = async (companyData) => {
  const company = new Company(companyData);
  return await company.save();
};

const updateCompany = async (id, updateData) => {
  return await Company.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteCompany = async (id) => {
  return await Company.findByIdAndDelete(id);
};

module.exports = {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
};
