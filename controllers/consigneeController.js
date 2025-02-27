const consigneeService = require("../services/consigneeService");

const createConsignee = async (req, res) => {
  try {
    const consignee = await consigneeService.createConsignee(req.body);
    res.status(201).json(consignee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllConsignees = async (req, res) => {
  try {
    const consignees = await consigneeService.getAllConsignees();
    res.status(200).json(consignees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getConsigneeById = async (req, res) => {
  const { id } = req.params;

  try {
    const consignee = await consigneeService.getConsigneeById(id);
    res.status(200).json(consignee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateConsignee = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedConsignee = await consigneeService.updateConsignee(
      id,
      req.body
    );
    res.status(200).json(updatedConsignee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteConsignee = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedConsignee = await consigneeService.deleteConsignee(id);
    res.status(200).json({
      message: "Consignee deleted successfully",
      consignee: deletedConsignee,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createConsignee,
  getAllConsignees,
  getConsigneeById,
  updateConsignee,
  deleteConsignee,
};
