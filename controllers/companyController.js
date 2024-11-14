const companyService = require("../services/companyService");

const getCompanies = async (req, res) => {
  try {
    const companies = await companyService.getAllCompanies();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching companies", error });
  }
};

const getCompany = async (req, res) => {
  try {
    const company = await companyService.getCompanyById(req.params.id);
    if (company) {
      res.status(200).json(company);
    } else {
      res.status(404).json({ message: "Company not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching company", error });
  }
};

const addCompany = async (req, res) => {
  try {
    const company = await companyService.createCompany(req.body);
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ message: "Error creating company", error });
  }
};

const updateCompany = async (req, res) => {
  try {
    const company = await companyService.updateCompany(req.params.id, req.body);
    if (company) {
      res.status(200).json(company);
    } else {
      res.status(404).json({ message: "Company not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating company", error });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const company = await companyService.deleteCompany(req.params.id);
    if (company) {
      res.status(200).json({ message: "Company deleted successfully" });
    } else {
      res.status(404).json({ message: "Company not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting company", error });
  }
};

module.exports = {
  getCompanies,
  getCompany,
  addCompany,
  updateCompany,
  deleteCompany,
};
