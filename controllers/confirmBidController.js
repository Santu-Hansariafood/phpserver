const confirmBidService = require("../services/confirmBidService");

exports.createBid = async (req, res) => {
  try {
    const savedBid = await confirmBidService.createConfirmBid(req.body);
    res.status(201).json({ message: "Bid saved successfully", savedBid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllBids = async (req, res) => {
  try {
    const bids = await confirmBidService.getAllConfirmedBids();
    res.status(200).json(bids);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
