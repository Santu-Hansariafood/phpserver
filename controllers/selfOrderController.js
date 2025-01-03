const selfOrderService = require("../services/selfOrderService");

// Create
const createOrder = async (req, res) => {
  try {
    const newOrder = await selfOrderService.createOrder(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to create order", error: error.message });
  }
};

// Read All
const getAllOrders = async (req, res) => {
  try {
    const orders = await selfOrderService.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
};

// Read by ID
const getOrderById = async (req, res) => {
  try {
    const order = await selfOrderService.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order", error: error.message });
  }
};

// Update
const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await selfOrderService.updateOrderById(req.params.id, req.body);
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to update order", error: error.message });
  }
};

// Delete
const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await selfOrderService.deleteOrderById(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete order", error: error.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
