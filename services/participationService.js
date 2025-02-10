const Participation = require("../models/Participation");

// Create a new participation entry
const participateInBid = async (bidData) => {
  const participation = new Participation(bidData);
  return await participation.save();
};

// Get all participations
const getAllParticipations = async () => {
  return await Participation.find();
};

// Get participation by ID
const getParticipationById = async (id) => {
  return await Participation.findById(id);
};

// Update participation by ID
const updateParticipation = async (id, updatedData) => {
  return await Participation.findByIdAndUpdate(id, updatedData, { new: true });
};

// Delete participation by ID
const deleteParticipation = async (id) => {
  return await Participation.findByIdAndDelete(id);
};

module.exports = {
  participateInBid,
  getAllParticipations,
  getParticipationById,
  updateParticipation,
  deleteParticipation
};
