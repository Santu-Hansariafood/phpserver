const Agent = require("../models/agentModel");

const createAgent = async (name) => {
  const agent = new Agent({ name });
  return await agent.save();
};

const getAllAgents = async () => {
  return await Agent.find();
};

const getAgentById = async (id) => {
  return await Agent.findById(id);
};

const updateAgent = async (id, name) => {
  return await Agent.findByIdAndUpdate(id, { name }, { new: true });
};

const deleteAgent = async (id) => {
  return await Agent.findByIdAndDelete(id);
};

module.exports = {
  createAgent,
  getAllAgents,
  getAgentById,
  updateAgent,
  deleteAgent,
};
