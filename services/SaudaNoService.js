const { Counter, SaudaNo } = require("../models/SaudaNo");

class SaudaNoService {
  static async getNextSequence(name) {
    const counter = await Counter.findOneAndUpdate(
      { name },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    return counter.seq;
  }

  static async createSaudaNo() {
    const seq = await this.getNextSequence("sauda_no");
    const saudaNo = `SN-${seq.toString().padStart(6, "0")}`;

    const newSaudaNo = new SaudaNo({ saudaNo });
    await newSaudaNo.save();
    return newSaudaNo;
  }

  static async getSaudaNo(saudaNo) {
    return await SaudaNo.findOne({ saudaNo });
  }
}

module.exports = SaudaNoService;
