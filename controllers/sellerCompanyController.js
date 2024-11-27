const {
  createSellerCompany,
  getAllSellerCompanies,
  getSellerCompanyById,
  updateSellerCompany,
  deleteSellerCompany,
} = require("../services/sellerCompanyService");

const addSellerCompany = async (req, res) => {
  try {
    const { body, files } = req;
    let bankDetails = [];
    if (body.bankDetails) {
      try {
        bankDetails =
          typeof body.bankDetails === "string"
            ? JSON.parse(body.bankDetails)
            : body.bankDetails;
      } catch (error) {
        console.error("Error parsing bankDetails:", error);
        return res.status(400).json({
          success: false,
          message: "Invalid bankDetails format.",
          error: error.message,
        });
      }
    }

    // Process file uploads and construct documents object
    const documents = {};
    Object.keys(files || {}).forEach((key) => {
      if (files[key]?.[0]?.path) {
        documents[key] = files[key][0].path;
      }
    });

    const sellerCompany = await createSellerCompany({
      ...body,
      bankDetails,
      documents,
    });

    res.status(201).json({
      success: true,
      data: sellerCompany,
      message: "Seller company added successfully.",
    });
  } catch (error) {
    console.error("Error Adding Seller Company:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add seller company.",
      error: error.message,
    });
  }
};

const getSellerCompanies = async (req, res) => {
  try {
    const companies = await getAllSellerCompanies();
    res.status(200).json({ success: true, data: companies });
  } catch (error) {
    console.error("Error fetching seller companies:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch companies." });
  }
};

const getSellerCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await getSellerCompanyById(id);
    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found." });
    }
    res.status(200).json({ success: true, data: company });
  } catch (error) {
    console.error("Error fetching seller company:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch company." });
  }
};

const updateSellerCompanyDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { body, files } = req;

    let bankDetails = [];
    if (body.bankDetails) {
      try {
        bankDetails =
          typeof body.bankDetails === "string"
            ? JSON.parse(body.bankDetails)
            : body.bankDetails;
      } catch (error) {
        console.error("Error parsing bankDetails:", error);
        return res.status(400).json({
          success: false,
          message: "Invalid bankDetails format.",
          error: error.message,
        });
      }
    }

    const documents = {
      addressProof: files.addressProof?.[0]?.path,
      gstProof: files.gstProof?.[0]?.path,
      panProof: files.panProof?.[0]?.path,
      aadhaarCard: files.aadhaarCard?.[0]?.path,
      checkCopy: files.checkCopy?.[0]?.path,
      msmeCopy: files.msmeCopy?.[0]?.path,
    };

    const updatedData = { ...body, bankDetails, documents };
    const updatedCompany = await updateSellerCompany(id, updatedData);

    if (!updatedCompany) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedCompany,
      message: "Seller company updated successfully.",
    });
  } catch (error) {
    console.error("Error updating seller company:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update company.",
      error: error.message,
    });
  }
};

const deleteSellerCompanyRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCompany = await deleteSellerCompany(id);

    if (!deletedCompany) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found." });
    }

    res.status(200).json({
      success: true,
      data: deletedCompany,
      message: "Seller company deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting seller company:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete company." });
  }
};

module.exports = {
  addSellerCompany,
  getSellerCompanies,
  getSellerCompany,
  updateSellerCompanyDetails,
  deleteSellerCompanyRecord,
};
