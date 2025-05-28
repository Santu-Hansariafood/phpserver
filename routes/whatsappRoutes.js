const express = require("express");
const router = express.Router();
const Seller = require("../models/Seller");
const { sendWhatsAppMessage } = require("../config/whatsapp");

router.post("/send", async (req, res) => {
  try {
    const { bidData, bidId } = req.body;

    if (!bidData || !bidId) {
      return res.status(400).json({ message: "Missing bidData or bidId" });
    }

    const sellers = await Seller.find({});
    const relevantSellers = sellers.filter((seller) =>
      seller.commodities.some((c) => c.name === bidData.commodity)
    );

    const results = await Promise.allSettled(
      relevantSellers.map((seller) => {
        const phone = seller.phoneNumbers[0]?.value;
        // Allow for country code
        const isValidPhone = /^\d{10,13}$/.test(phone);
        if (!phone || !isValidPhone) {
          console.warn(`Invalid phone for ${seller.sellerName}: ${phone}`);
          return null;
        }

        return sendWhatsAppMessage({
          mobile: phone,
          bidId,
          group: bidData.group,
          consignee: bidData.consignee,
          commodity: bidData.commodity,
          quantity: bidData.quantity,
          origin: bidData.origin,
          paymentTerms: bidData.paymentTerms,
          endTime: bidData.endTime,
        });
      })
    );

    res.status(200).json({ message: "WhatsApp messages processed", results });
  } catch (error) {
    console.error("Backend WhatsApp error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
