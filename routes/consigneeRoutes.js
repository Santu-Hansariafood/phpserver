const express = require("express");
const router = express.Router();
const consigneeController = require("../controllers/consigneeController");

router.post("/", consigneeController.createConsignee);
router.get("/", consigneeController.getAllConsignees);
router.get("/:id", consigneeController.getConsigneeById);
router.put("/:id", consigneeController.updateConsignee);
router.delete("/:id", consigneeController.deleteConsignee);

module.exports = router;
