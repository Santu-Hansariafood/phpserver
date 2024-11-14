const buyerService = require('../services/buyerService');

// Get all buyers
const getAllBuyers = async (req, res, next) => {
  try {
    const buyers = await buyerService.getAllBuyers();
    res.status(200).json(buyers);
  } catch (err) {
    next(err);
  }
};

// Get buyer by ID
const getBuyerById = async (req, res, next) => {
  try {
    const buyer = await buyerService.getBuyerById(req.params.id);
    if (!buyer) {
      return res.status(404).json({ message: 'Buyer not found' });
    }
    res.status(200).json(buyer);
  } catch (err) {
    next(err);
  }
};

// Create a new buyer
const createBuyer = async (req, res, next) => {
  try {
    const buyer = await buyerService.createBuyer(req.body);
    res.status(201).json(buyer);
  } catch (err) {
    next(err);
  }
};

// Update buyer
const updateBuyer = async (req, res, next) => {
  try {
    const buyer = await buyerService.updateBuyer(req.params.id, req.body);
    if (!buyer) {
      return res.status(404).json({ message: 'Buyer not found' });
    }
    res.status(200).json(buyer);
  } catch (err) {
    next(err);
  }
};

// Delete buyer
const deleteBuyer = async (req, res, next) => {
  try {
    const buyer = await buyerService.deleteBuyer(req.params.id);
    if (!buyer) {
      return res.status(404).json({ message: 'Buyer not found' });
    }
    res.status(200).json({ message: 'Buyer deleted successfully' });
  } catch (err) {
    next(err);
  }
};

// Login buyer
const loginBuyer = async (req, res, next) => {
  const { mobile, password } = req.body;
  try {
    const buyer = await buyerService.loginBuyer(mobile, password);
    res.status(200).json(buyer);
  } catch (err) {
    res.status(401);  // Unauthorized
    next(err);
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
