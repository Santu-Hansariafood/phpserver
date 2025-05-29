// require("dotenv").config();
// const axios = require("axios");
// console.log("Loaded WhatsApp API Key:", process.env.WHATSAPP_API_KEY);

// const formatEndTime = (timeStr) => {
//   const [hour, minute] = timeStr.split(":");
//   const h = parseInt(hour, 10);
//   const suffix = h >= 12 ? "pm" : "am";
//   const formattedHour = ((h + 11) % 12 + 1);
//   return `${formattedHour}.${minute}${suffix}`;
// };

// const sendWhatsAppMessage = async ({
//   mobile,
//   bidId,
//   group,
//   consignee,
//   commodity,
//   quantity,
//   rate,
//   endTime
// }) => {
//   try {
//     const formattedMobile = mobile.startsWith("91") ? mobile : `91${mobile}`;
//     const buyingInfo = `${commodity} - ${group} - ${consignee} - ${quantity} ton @${rate}/-`;
//     const formattedTime = formatEndTime(endTime);

//     const response = await axios.get("http://official.nkinfo.in/wapp/api/v2/send/bytemplate", {
//       params: {
//         apikey: process.env.WHATSAPP_API_KEY,
//         templatename: "buying",
//         mobile: formattedMobile,
//         param1: bidId,
//         param2: buyingInfo,
//         param3: formattedTime,
//         footer: "Thanking you, Hansaria Team",
//         button1: JSON.stringify({
//           type: "phone",
//           text: "Whatsapp- 9330433535",
//           phone: "9330433535"
//         })
//       }
//     });

//     console.log("WhatsApp response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error:", error?.response?.data || error.message);
//     throw new Error("WhatsApp API Error: " + (error?.response?.data?.message || error.message));
//   }
// };

// module.exports = { sendWhatsAppMessage };

require("dotenv").config();
const axios = require("axios");

console.log("Loaded WhatsApp API Key:", process.env.WHATSAPP_API_KEY);

// Format time like "18:00" to "6.00pm"
const formatEndTime = (timeStr) => {
  const [hour, minute] = timeStr.split(":");
  const h = parseInt(hour, 10);
  const suffix = h >= 12 ? "pm" : "am";
  const formattedHour = ((h + 11) % 12 + 1); // converts 24h to 12h format
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
  endTime
}) => {
  try {
    const formattedMobile = mobile.startsWith("91") ? mobile : `91${mobile}`;
    const buyingInfo = `${commodity} - ${group} - ${consignee} - ${quantity} ton @${rate}/-`;
    const formattedTime = formatEndTime(endTime);

    const response = await axios.get("http://official.nkinfo.in/wapp/api/v2/send/bytemplate", {
      params: {
        apikey: process.env.WHATSAPP_API_KEY,
        templatename: "buying",
        mobile: formattedMobile,
        param1: bidId,
        param2: buyingInfo,
        param3: formattedTime,
        footer: "Thanking you, Hansaria Team",
        button1: JSON.stringify({
          type: "phone",
          text: "Whatsapp- 9330433535",
          phone: "9330433535"
        })
      }
    });

    console.log("WhatsApp response:", response.data);
    return response.data;

  } catch (error) {
    console.error("WhatsApp API Error:", error?.response?.data || error.message);
    throw new Error("WhatsApp API Error: " + (error?.response?.data?.message || error.message));
  }
};

module.exports = { sendWhatsAppMessage };
