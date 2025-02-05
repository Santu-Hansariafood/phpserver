const buyerService = require("../services/buyerService");

const getAllBuyers = async (req, res, next) => {
  try {
    const buyers = await buyerService.getAllBuyers();
    res.status(200).json(buyers);
  } catch (err) {
    next(err);
  }
};

const getBuyerById = async (req, res, next) => {
  try {
    const buyer = await buyerService.getBuyerById(req.params.id);
    if (!buyer) {
      return res.status(404).json({ message: "Buyer not found" });
    }
    res.status(200).json(buyer);
  } catch (err) {
    next(err);
  }
};

const createBuyer = async (req, res, next) => {
  try {
    const buyer = await buyerService.createBuyer(req.body);
    res.status(201).json(buyer);
  } catch (err) {
    next(err);
  }
};

const updateBuyer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedBuyer = await buyerService.updateBuyer(id, req.body);
    if (!updatedBuyer) {
      return res.status(404).json({ message: "Buyer not found" });
    }
    res.status(200).json(updatedBuyer);
  } catch (err) {
    next(err);
  }
};

const deleteBuyer = async (req, res, next) => {
  try {
    const buyer = await buyerService.deleteBuyer(req.params.id);
    if (!buyer) {
      return res.status(404).json({ message: "Buyer not found" });
    }
    res.status(200).json({ message: "Buyer deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const loginBuyer = async (req, res) => {
  try {
    const { mobile, password } = req.body;
    const buyer = await buyerService.loginBuyer(mobile, password);
    res.json({ message: "Login successful", buyer });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = {
  getAllBuyers,
  getBuyerById,
  createBuyer,
  updateBuyer,
  deleteBuyer,
  loginBuyer,
};
