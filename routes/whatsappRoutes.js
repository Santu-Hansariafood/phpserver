require("dotenv").config();
const express = require("express");
const router = express.Router();
const Seller = require("../models/Seller");
const { sendWhatsAppMessage } = require("../config/whatsapp");

// Helper to format end time to 12-hour with am/pm
const formatEndTime = (timeStr) => {
  const [hour, minute] = timeStr.split(":");
  const h = parseInt(hour, 10);
  const suffix = h >= 12 ? "pm" : "am";
  const formattedHour = ((h + 11) % 12 + 1);
  return `${formattedHour}.${minute}${suffix}`;
};

router.post("/send", async (req, res) => {
  try {
    const { bidData, bidId, apiKey } = req.body;

    if (!bidData || !bidId) {
      return res.status(400).json({ message: "Missing bidData or bidId" });
    }

    if (!apiKey || apiKey !== process.env.WHATSAPP_API_KEY) {
      return res.status(401).json({ message: "Invalid API key" });
    }

    const sellers = await Seller.find({});
    const relevantSellers = sellers.filter((seller) =>
      seller.commodities.some((c) => c.name === bidData.commodity)
    );

    const results = await Promise.allSettled(
      relevantSellers.map(async (seller) => {
        const phone = seller.phoneNumbers?.[0]?.value;
        const isValidPhone = /^\d{10,13}$/.test(phone);

        if (!phone || !isValidPhone) {
          console.warn(`Invalid phone for ${seller.sellerName}: ${phone}`);
          return { phone, status: "invalid" };
        }

        try {
          const result = await sendWhatsAppMessage({
            mobile: phone,
            bidId,
            group: bidData.group,
            consignee: bidData.consignee,
            commodity: bidData.commodity,
            quantity: bidData.quantity,
            rate: bidData.rate,
            endTime: formatEndTime(bidData.endTime),
          });

          return { phone, status: "success", result };
        } catch (error) {
          return { phone, status: "error", error: error.message };
        }
      })
    );

    const summary = {
      total: results.length,
      success: results.filter((r) => r.status === "fulfilled" && r.value?.status === "success").length,
      failed: results.filter((r) => r.status === "rejected" || r.value?.status === "error").length,
      invalid: results.filter((r) => r.value?.status === "invalid").length,
    };

    res.status(200).json({
      message: "WhatsApp messages processed",
      summary,
      results,
    });
  } catch (error) {
    console.error("Backend WhatsApp error:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
