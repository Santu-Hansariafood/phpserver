const BaseBid = require("../models/BaseBid");

class BaseBidService {
  static async generateBidId() {
    const now = new Date();
    const month = now.toLocaleString("en-US", { month: "short" }).toUpperCase();
    const prefix = `HANS-${month}`;
    const regex = new RegExp(`^${prefix}-\\d{4}$`);

    const latestBid = await BaseBid.findOne({ bidId: regex }).sort({
      createdAt: -1,
    });

    let sequence = 1;
    if (latestBid) {
      const lastNumber = parseInt(latestBid.bidId.split("-")[2]);
      sequence = lastNumber + 1;
    }

    const formatted = String(sequence).padStart(4, "0");
    return `${prefix}-${formatted}`;
  }

  static async createBid(data) {
    const bidId = await this.generateBidId();
    const bid = new BaseBid({ ...data, bidId });
    return await bid.save();
  }

  static async getAllBids() {
    return await BaseBid.find();
  }

  static async getBidById(id) {
    return await BaseBid.findById(id);
  }

  static async updateBid(id, data) {
    return await BaseBid.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteBid(id) {
    return await BaseBid.findByIdAndDelete(id);
  }
}

module.exports = BaseBidService;
