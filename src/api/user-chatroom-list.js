// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import axios from "axios";

// const base =
//   "https://ap-south-1.aws.data.mongodb-api.com/app/workbasis-whatsapp-hpptuew/endpoint";

// export default async (req, res) => {
//   const basx = base + `/room/lists`;
//   const head = {
//     "Content-Type": "application/json",
//     Authorization: process.env.REACT_APP_WEBB_SITE_CLNT,
//   };
//   const datx = {
//     data: req.body.data,
//     srvc: process.env.REACT_APP_WEBB_SITE_SRVC,
//   };
//   console.log ("RRRRRRRRRRRROOOOOOOOOOOOMlist",datx)
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


import axios from "axios";

const base =
  "https://ap-south-1.aws.data.mongodb-api.com/app/miniland-rooms-qudptma/endpoint";

export const fetchRoomList = async (data) => {
  const basx = base + `/users/rooms`;
  const head = {
    "Content-Type": "application/json",
    Authorization: process.env.REACT_APP_WEBB_SITE_CLNT,
  };
  const datx = {
    data: data,
    srvc: process.env.REACT_APP_WEBB_SITE_SRVC,
  };
  try {
    const result = await axios.post(basx, datx, { headers: head });
    return result.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Server Error:", error.response.data);
      console.error("Status Code:", error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up the request:", error.message);
    }
    throw error; // rethrow the error to propagate it to the caller
  }
};


