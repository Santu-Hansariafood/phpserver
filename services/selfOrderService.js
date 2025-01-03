const SelfOrder = require("../models/SelfOrder");

const createOrder = async (data) => {
  const order = new SelfOrder(data);
  return await order.save();
};

const getAllOrders = async () => {
  return await SelfOrder.find();
};

const getOrderById = async (id) => {
  return await SelfOrder.findById(id);
};

const updateOrderById = async (id, data) => {
  return await SelfOrder.findByIdAndUpdate(id, data, { new: true });
};

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
