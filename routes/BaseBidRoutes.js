const express = require("express");
const BaseBidController = require("../controllers/BaseBidController");

const router = express.Router();

router.post("/", BaseBidController.createBid);
router.get("/", BaseBidController.getAllBids);
router.get("/:id", BaseBidController.getBidById);
router.put("/:id", BaseBidController.updateBid);
router.delete("/:id", BaseBidController.deleteBid);

module.exports = router;
