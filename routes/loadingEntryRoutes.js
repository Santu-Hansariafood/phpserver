const express = require("express");
const router = express.Router();
const loadingEntryController = require("../controllers/loadingEntryController");

router.post("/", loadingEntryController.createLoadingEntry);
router.get("/", loadingEntryController.getAllLoadingEntries);
router.get("/:id", loadingEntryController.getLoadingEntryById);
router.put("/:id", loadingEntryController.updateLoadingEntry);
router.delete("/:id", loadingEntryController.deleteLoadingEntry);

module.exports = router;
