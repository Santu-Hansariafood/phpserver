const SaudaNoService = require("../services/SaudaNoService");

class SaudaNoController {
  static async createSaudaNo(req, res) {
    try {
      const saudaNo = await SaudaNoService.createSaudaNo();
      res.status(201).json({ saudaNo: saudaNo.saudaNo });
    } catch (error) {
      console.error("Error creating Sauda No:", error);
      res.status(500).json({ error: "Failed to generate Sauda No" });
    }
  }

  static async getSaudaNo(req, res) {
    try {
      const { saudaNo } = req.params;
      const saudaRecord = await SaudaNoService.getSaudaNo(saudaNo);
      if (!saudaRecord) {
        return res.status(404).json({ error: "Sauda No not found" });
      }
      res.status(200).json(saudaRecord);
    } catch (error) {
      console.error("Error fetching Sauda No:", error);
      res.status(500).json({ error: "Failed to retrieve Sauda No" });
    }
  }
}

module.exports = SaudaNoController;
