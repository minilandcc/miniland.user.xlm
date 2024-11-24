// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import axios from "axios";

// const base =
//   "https://ap-south-1.aws.data.mongodb-api.com/app/workbasis-whatsapp-hpptuew/endpoint";

// export default async (req, res) => {
//   const basx = base + `/message/add`;
//   const head = {
//     "Content-Type": "application/json",
//     Authorization: process.env.REACT_APP_WEBB_SITE_CLNT,
//   };
//   const datx = {
//     data: req.body.data,
//     srvc: process.env.REACT_APP_WEBB_SITE_SRVC,
//   };
//   // console.log (datx)
//   var result;
//   try {
//     result = await axios.post(basx, datx, { headers: head });
//     // console.log (result.status)
//     // console.log (JSON.stringify(result.data))
//     res.status(result.status).json(JSON.stringify(result.data));
//   } catch (error) {
//     // console.log(error.response.data);
//     res.status(error.response.status).json(JSON.stringify(error.response.data));
//   }
// };

// import axios from "axios";

// const base =
//   "https://ap-south-1.aws.data.mongodb-api.com/app/workbasis-whatsapp-hpptuew/endpoint";

// export const sendMessage =  async (req, res) => {
//   const basx = base + `/message/add`;
//   const head = {
//     "Content-Type": "application/json",
//     Authorization: process.env.REACT_APP_WEBB_SITE_CLNT,
//   };
//   const datx = {
//     data: req.body.data,
//     srvc: process.env.REACT_APP_WEBB_SITE_SRVC,
//   };
//   console.log ("DATX",datx)
//   var result;
//   try {
//     result = await axios.post(basx, datx, { headers: head });
//     // console.log (result.status)
//     // console.log (JSON.stringify(result.data))
//     res.status(result.status).json(JSON.stringify(result.data));
//   } catch (error) {
//     // console.log(error.response.data);
//     res.status(error.response.status).json(JSON.stringify(error.response.data));
//   }
// };


// api.js
import axios from "axios";

const base =
  "https://ap-south-1.aws.data.mongodb-api.com/app/workbasis-whatsapp-hpptuew/endpoint";

export const sendMessage = async (data) => {
  const basx = base + `/message/add`;
  const head = {
    "Content-Type": "application/json",
    Authorization: process.env.REACT_APP_WEBB_SITE_CLNT,
  };
  const datx = {
    data: data,
    srvc: process.env.REACT_APP_WEBB_SITE_SRVC,
  };
  console.log("DATX", datx);
  var result;
  try {
    result = await axios.post(basx, datx, { headers: head });
    return result.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error.response.data;
  }
};

