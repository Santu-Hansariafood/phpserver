const BaseBidService = require("../services/BaseBidService");

class BaseBidController {
  static async createBid(req, res) {
    try {
      const bid = await BaseBidService.createBid(req.body);
      res.status(201).json(bid);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getAllBids(req, res) {
    try {
      const bids = await BaseBidService.getAllBids();
      res.status(200).json(bids);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async getBidById(req, res) {
    try {
      const bid = await BaseBidService.getBidById(req.params.id);
      if (!bid) return res.status(404).json({ message: "Bid not found" });
      res.status(200).json(bid);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async updateBid(req, res) {
    try {
      const updatedBid = await BaseBidService.updateBid(
        req.params.id,
        req.body
      );
      if (!updatedBid)
        return res.status(404).json({ message: "Bid not found" });
      res.status(200).json(updatedBid);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async deleteBid(req, res) {
    try {
      const deletedBid = await BaseBidService.deleteBid(req.params.id);
      if (!deletedBid)
        return res.status(404).json({ message: "Bid not found" });
      res.status(200).json({ message: "Bid deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = BaseBidController;
