const express = require("express");
const router = express.Router();
const selfOrderController = require("../controllers/selfOrderController");

router.post("/", selfOrderController.createOrder);
router.get("/", selfOrderController.getAllOrders);
router.get("/:id", selfOrderController.getOrderById);
router.put("/:id", selfOrderController.updateOrder);
router.delete("/:id", selfOrderController.deleteOrder);

module.exports = router;
