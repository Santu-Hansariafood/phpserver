const express = require("express");
const bidLocationController = require("../controllers/bidLocationController");

const router = express.Router();

router.get("/", bidLocationController.getAll);
router.post("/", bidLocationController.create);
router.put("/:id", bidLocationController.update);
router.delete("/:id", bidLocationController.delete);

module.exports = router;
