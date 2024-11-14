const QualityParameter = require("../models/qualityParameterModel");

const createQualityParameter = async (data) => {
  const qualityParameter = new QualityParameter(data);
  return await qualityParameter.save();
};

const getAllQualityParameters = async () => {
  return await QualityParameter.find();
};

const getQualityParameterById = async (id) => {
  return await QualityParameter.findById(id);
};

const updateQualityParameter = async (id, data) => {
  return await QualityParameter.findByIdAndUpdate(id, data, { new: true });
};

const deleteQualityParameter = async (id) => {
  return await QualityParameter.findByIdAndDelete(id);
};

module.exports = {
  createQualityParameter,
  getAllQualityParameters,
  getQualityParameterById,
  updateQualityParameter,
  deleteQualityParameter,
};
