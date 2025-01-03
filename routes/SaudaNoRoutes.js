const express = require("express");
const SaudaNoController = require("../controllers/SaudaNoController");

const router = express.Router();

router.post("/", SaudaNoController.createSaudaNo);

router.get("/:saudaNo", SaudaNoController.getSaudaNo);

module.exports = router;
