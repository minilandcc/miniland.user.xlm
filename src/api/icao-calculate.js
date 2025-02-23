// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

const base =
  "https://ap-southeast-1.aws.data.mongodb-api.com/app/nezos-travel-gpzrqzt/endpoint";

export default async (req, res) => {
  const basx = base + `/icao/calculate`;
  const head = {
    "Content-Type": "application/json",
    Authorization: "******",
  };
  const datx = {
    data: req.body.data,
    srvc: "",
  };
  var result;
  try {
    result = await axios.post(basx, datx, { headers: head });
    // console.log (result.status)
    // console.log (JSON.stringify(result.data))
    res.status(result.status).json(JSON.stringify(result.data));
  } catch (error) {
    // console.log(error.response.data);
    res.status(error.response.status).json(JSON.stringify(error.response.data));
  }
};
