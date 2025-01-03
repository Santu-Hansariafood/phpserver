const SelfOrder = require("../models/SelfOrder");

// Create
const createOrder = async (data) => {
  const order = new SelfOrder(data);
  return await order.save();
};

// Read All
const getAllOrders = async () => {
  return await SelfOrder.find();
};

// Read by ID
const getOrderById = async (id) => {
  return await SelfOrder.findById(id);
};

// Update
const updateOrderById = async (id, data) => {
  return await SelfOrder.findByIdAndUpdate(id, data, { new: true });
};

// Delete
const deleteOrderById = async (id) => {
  return await SelfOrder.findByIdAndDelete(id);
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
};
