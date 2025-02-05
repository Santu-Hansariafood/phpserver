const sellerService = require("../services/sellerService");

const addSeller = async (req, res) => {
  try {
    const sellerData = req.body;
    const seller = await sellerService.addSellerDetails(sellerData);
    res.status(201).json({ message: "Seller added successfully", seller });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding seller", error: error.message });
  }
};

const getSellers = async (req, res) => {
  try {
    const sellers = await sellerService.getSellers();
    res.status(200).json(sellers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching sellers", error: error.message });
  }
};


const getSeller = async (req, res) => {
  try {
    const seller = await sellerService.getSellerById(req.params.id);
    if (!seller) return res.status(404).json({ message: "Seller not found" });
    res.status(200).json(seller);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching seller", error: error.message });
  }
};


const updateSeller = async (req, res) => {
  try {
    const seller = await sellerService.updateSeller(req.params.id, req.body);
    if (!seller) return res.status(404).json({ message: "Seller not found" });
    res.status(200).json({ message: "Seller updated successfully", seller });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating seller", error: error.message });
  }
};

const deleteSeller = async (req, res) => {
  try {
    const seller = await sellerService.deleteSeller(req.params.id);
    if (!seller) return res.status(404).json({ message: "Seller not found" });
    res.status(200).json({ message: "Seller deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting seller", error: error.message });
  }
};

const loginSeller = async (req, res) => {
  try {
    const { phone, password } = req.body;

    // Fetch seller by phone number
    const seller = await sellerService.getSellerByPhone(phone);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    // Verify the password
    if (seller.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Successful login response
    res.status(200).json({ message: "Login successful", seller });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};


module.exports = {
  addSeller,
  getSellers,
  getSeller,
  updateSeller,
  deleteSeller,
  loginSeller,
};
