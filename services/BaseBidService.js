const BaseBid = require("../models/BaseBid");

class BaseBidService {
  static async createBid(data) {
    const bid = new BaseBid(data);
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
