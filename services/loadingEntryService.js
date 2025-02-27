const LoadingEntry = require("../models/LoadingEntry");

exports.createLoadingEntry = async (data) => {
  return await LoadingEntry.create(data);
};

exports.getAllLoadingEntries = async () => {
  return await LoadingEntry.find();
};

exports.getLoadingEntryById = async (id) => {
  return await LoadingEntry.findById(id);
};

exports.updateLoadingEntry = async (id, data) => {
  return await LoadingEntry.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteLoadingEntry = async (id) => {
  return await LoadingEntry.findByIdAndDelete(id);
};
