const GroupOfCompany = require("../models/GroupOfCompany");

exports.createGroup = async (data) => {
  return await GroupOfCompany.create(data);
};

exports.getAllGroups = async () => {
  return await GroupOfCompany.find();
};

exports.getGroupById = async (id) => {
  return await GroupOfCompany.findById(id);
};

exports.updateGroup = async (id, data) => {
  return await GroupOfCompany.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteGroup = async (id) => {
  await GroupOfCompany.findByIdAndDelete(id);
};
