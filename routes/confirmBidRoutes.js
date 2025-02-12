const express = require("express");
const router = express.Router();
const confirmBidController = require("../controllers/confirmBidController");

router.post("/", confirmBidController.createBid);
router.get("/", confirmBidController.getAllBids);

module.exports = router;
