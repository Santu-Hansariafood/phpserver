const Commodity = require('../models/commodity');

const createCommodity = async (data) => {
  const commodity = new Commodity(data);
  return await commodity.save();
};

const getAllCommodities = async () => {
  return await Commodity.find();
};

const getCommodityById = async (id) => {
  return await Commodity.findById(id);
};

const updateCommodity = async (id, data) => {
  return await Commodity.findByIdAndUpdate(id, data, { new: true });
};

const deleteCommodity = async (id) => {
  return await Commodity.findByIdAndDelete(id);
};

module.exports = {
  createCommodity,
  getAllCommodities,
  getCommodityById,
  updateCommodity,
  deleteCommodity,
};
