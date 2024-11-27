const express = require("express");
const upload = require("../config/cloudinaryConfig");
const {
  addSellerCompany,
  getSellerCompanies,
  getSellerCompany,
  updateSellerCompanyDetails,
  deleteSellerCompanyRecord,
} = require("../controllers/sellerCompanyController");

const router = express.Router();

// Define upload fields for file uploads
const uploadFields = upload.fields([
    { name: "addressProof", maxCount: 1 },
    { name: "gstProof", maxCount: 1 },
    { name: "panProof", maxCount: 1 },
    { name: "aadhaarCard", maxCount: 1 },
    { name: "checkCopy", maxCount: 1 },
    { name: "msmeCopy", maxCount: 1 },
  ]);
  
  router.post("/", uploadFields, addSellerCompany);
  router.put("/:id", uploadFields, updateSellerCompanyDetails);
  
router.get("/", getSellerCompanies);
router.get("/:id", getSellerCompany);
// router.put("/:id", uploadFields, updateSellerCompanyDetails);
router.delete("/:id", deleteSellerCompanyRecord);

module.exports = router;
