// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

const base = 'https://ap-southeast-1.aws.data.mongodb-api.com/app/terano-cart-xccsv/endpoint'

export default async (req, res) => {
 
  const basx = base + `/cart/create`
  const head = { 
    "Content-Type": "application/json",
    "Authorization": process.env.NEXT_APP_WEBB_SITE_CLNT
  }

  const datx = {data: req.body.data, srvc: process.env.NEXT_APP_WEBB_SITE_SRVC }
  
  var result
  try {
    result = await axios.post(basx, datx, {headers: head})
    res.status(result.status).json(JSON.stringify(result.data))
  }
  catch (error) {
    console.log(error.response.data);
    res.status(error.response.status).json(JSON.stringify(error.response.data))
  }

}