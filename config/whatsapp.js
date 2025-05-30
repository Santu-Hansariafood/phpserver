require("dotenv").config();
const axios = require("axios");

const formatEndTime = (timeStr) => {
  const [hour, minute] = timeStr.split(":");
  const h = parseInt(hour, 10);
  const suffix = h >= 12 ? "pm" : "am";
  const formattedHour = ((h + 11) % 12) + 1;
  return `${formattedHour}.${minute}${suffix}`;
};

const sendWhatsAppMessage = async ({
  mobile,
  bidId,
  group,
  consignee,
  commodity,
  quantity,
  rate,
  endTime,
}) => {
  try {
    if (!mobile) throw new Error("Missing mobile number");
    if (!process.env.WHATSAPP_API_KEY)
      throw new Error("Missing WhatsApp API key");

    const formattedTime = formatEndTime(endTime);
    const buyingInfo = `${commodity}  ${group}  ${consignee}  ${quantity} ton ${rate}`;

    // ✅ Defensive check
    if (!bidId || !buyingInfo || !formattedTime) {
      console.error("❌ Missing template parameters:", {
        bidId,
        buyingInfo,
        formattedTime,
      });
      throw new Error("One or more WhatsApp template params are missing.");
    }

    console.log("🚀 Sending WhatsApp message with params:");
    console.log({
      apikey: process.env.WHATSAPP_API_KEY,
      templatename: "test",
      mobile,
      param1: bidId,
      param2: buyingInfo,
      param3: formattedTime,
    });

    const response = await axios.get(
      "http://official.nkinfo.in/wapp/api/v2/send/bytemplate",
      {
        params: {
          apikey: process.env.WHATSAPP_API_KEY,
          templatename: "test",
          mobile,
          param1: bidId,
          param2: buyingInfo,
          param3: formattedTime,
        },
      }
    );

    console.log("✅ WhatsApp response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ WhatsApp API Error:",
      error?.response?.data || error.message
    );
    throw new Error(
      "WhatsApp API Error: " + (error?.response?.data?.message || error.message)
    );
  }
};

module.exports = { sendWhatsAppMessage };
