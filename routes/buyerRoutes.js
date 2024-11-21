const express = require("express");
const buyerController = require("../controllers/buyerController");

const router = express.Router();

router.get("/", buyerController.getAllBuyers);
router.get("/:id", buyerController.getBuyerById);
router.post("/", buyerController.createBuyer);
router.put("/:id", buyerController.updateBuyer);
router.delete("/:id", buyerController.deleteBuyer);
router.post("/login", buyerController.loginBuyer);

module.exports = router;
