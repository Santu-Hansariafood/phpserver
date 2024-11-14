const express = require("express");
const router = express.Router();
const qualityParameterController = require("../controllers/qualityParameterController");

router.post("/", qualityParameterController.createQualityParameter);
router.get("/", qualityParameterController.getAllQualityParameters);
router.get("/:id", qualityParameterController.getQualityParameterById);
router.put("/:id", qualityParameterController.updateQualityParameter);
router.delete("/:id", qualityParameterController.deleteQualityParameter);

module.exports = router;
