const express = require("express");
const router = express.Router();
const sellerController = require("../controllers/sellerController");

router.post("/", sellerController.addSeller);
router.get("/", sellerController.getSellers);
router.get("/:id", sellerController.getSeller);
router.put("/:id", sellerController.updateSeller);
router.delete("/:id", sellerController.deleteSeller);
router.post("/login", sellerController.loginSeller);

module.exports = router;
