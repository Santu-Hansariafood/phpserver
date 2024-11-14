const Consignee = require("../models/Consignee");

// Create a new Consignee
const createConsignee = async (data) => {
  try {
    const newConsignee = new Consignee(data);
    await newConsignee.save();
    return newConsignee;
  } catch (error) {
    throw new Error("Error creating consignee: " + error.message);
  }
};

// Get all consignees
const getAllConsignees = async () => {
  try {
    const consignees = await Consignee.find();
    return consignees;
  } catch (error) {
    throw new Error("Error fetching consignees: " + error.message);
  }
};

// Get a consignee by ID
const getConsigneeById = async (id) => {
  try {
    const consignee = await Consignee.findById(id);
    if (!consignee) {
      throw new Error("Consignee not found");
    }
    return consignee;
  } catch (error) {
    throw new Error("Error fetching consignee: " + error.message);
  }
};

// Update consignee
const updateConsignee = async (id, data) => {
  try {
    const updatedConsignee = await Consignee.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updatedConsignee;
  } catch (error) {
    throw new Error("Error updating consignee: " + error.message);
  }
};

// Delete consignee
const deleteConsignee = async (id) => {
  try {
    const deletedConsignee = await Consignee.findByIdAndDelete(id);
    return deletedConsignee;
  } catch (error) {
    throw new Error("Error deleting consignee: " + error.message);
  }
};

module.exports = {
  createConsignee,
  getAllConsignees,
  getConsigneeById,
  updateConsignee,
  deleteConsignee,
};
