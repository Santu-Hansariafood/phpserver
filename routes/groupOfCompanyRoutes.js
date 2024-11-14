const express = require("express");
const router = express.Router();
const groupOfCompanyController = require("../controllers/groupOfCompanyController");

router.post("/", groupOfCompanyController.createGroupOfCompany);
router.get("/", groupOfCompanyController.getGroupsOfCompany);
router.get("/:id", groupOfCompanyController.getGroupOfCompanyById);
router.put("/:id", groupOfCompanyController.updateGroupOfCompany);
router.delete("/:id", groupOfCompanyController.deleteGroupOfCompany);

module.exports = router;
