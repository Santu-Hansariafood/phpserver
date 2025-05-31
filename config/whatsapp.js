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
    const apiKey = process.env.WHATSAPP_API_KEY;
    if (!mobile || !apiKey) throw new Error("Missing mobile or API key");

    const formattedTime = formatEndTime(endTime);
    const buyingInfo = `${commodity}  ${group}  ${consignee}  ${quantity} ton ${rate}`;

    const to = Array.isArray(mobile) ? mobile.join(",") : mobile;

    const payload = {
      payloadVersion: 0.1,
      to,
      isTemplate: true,
      template: {
        namespace: "buy",
      },
      components: [
        {
          type: "body",
          body: {
            parameters: [bidId, buyingInfo, formattedTime],
          },
        },
      ],
    };

    const response = await axios.post(
      "http://official.nkinfo.in/wapp/api/send/bytemplate/json/clevertap",
      payload,
      {
        headers: {
          "X-API-KEY": apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    // console.log("WhatsApp response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "WhatsApp API Error:",
      error?.response?.data || error.message
    );
    throw new Error(
      "WhatsApp API Error: " + (error?.response?.data?.message || error.message)
    );
  }
};

module.exports = { sendWhatsAppMessage };
