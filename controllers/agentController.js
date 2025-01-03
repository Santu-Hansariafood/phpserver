const agentService = require("../services/agentService");

const createAgent = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    const agent = await agentService.createAgent(name);
    res.status(201).json(agent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllAgents = async (req, res) => {
  try {
    const agents = await agentService.getAllAgents();
    res.status(200).json(agents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAgentById = async (req, res) => {
  try {
    const { id } = req.params;
    const agent = await agentService.getAgentById(id);
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }
    res.status(200).json(agent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAgent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const agent = await agentService.updateAgent(id, name);
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }
    res.status(200).json(agent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAgent = async (req, res) => {
  try {
    const { id } = req.params;
    const agent = await agentService.deleteAgent(id);
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }
    res.status(200).json({ message: "Agent deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAgent,
  getAllAgents,
  getAgentById,
  updateAgent,
  deleteAgent,
};
