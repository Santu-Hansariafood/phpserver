const express = require("express");
const SaudaNoController = require("../controllers/SaudaNoController");

const router = express.Router();

// Generate a new Sauda No
router.post("/", SaudaNoController.createSaudaNo);

// Get details of a specific Sauda No
router.get("/:saudaNo", SaudaNoController.getSaudaNo);

module.exports = router;
