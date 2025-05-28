require("dotenv").config();
const axios = require("axios");

const sendWhatsAppMessage = async ({
  mobile,
  bidId,
  group,
  consignee,
  commodity,
  quantity,
  origin,
  paymentTerms,
  endTime,
}) => {
  try {
    console.log("WhatsApp API Key:", process.env.WHATSAPP_API_KEY);
    const url = `https://official.nkinfo.in/wapp/api/v2/send/bytemplate`;

    // Construct the request body
    const requestBody = {
      apikey: process.env.WHATSAPP_API_KEY,
      templatename: 'buy',
      mobile,
      param1: bidId || '',
      param2: group || '',
      param3: consignee || '',
      param4: commodity || '',
      param5: `${quantity || ''} Tons`,
      param6: origin || '',
      param7: `${paymentTerms || ''} Days`,
      param8: endTime || '',
      param9: 'https://hansariafood.shop'
    };

    console.log("WhatsApp API Request Body:", requestBody);

    const response = await axios.post(url, requestBody);
    console.log("WhatsApp API Response:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error.response?.data || error.message);
    throw error;
  }
};

module.exports = { sendWhatsAppMessage };
