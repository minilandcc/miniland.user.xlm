// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

const base = 'https://ap-southeast-1.aws.data.mongodb-api.com/app/tokenize-data-fmlxk/endpoint'

export default async (req, res) => {
 
  const basx = base + `/transfers/list/data`
  const head = { 
    "Content-Type": "application/json",
    "Authorization": process.env.NEXT_APP_WEBB_SITE_CLNT
  }
  const datx = {data: req.body, user: process.env.NEXT_APP_WEBB_SITE_SRVC }
  
  var result
  try {
    result = await axios.post(basx, datx, {headers: head})
    console.log (result.status)
    console.log (JSON.stringify(result.data))
    res.status(result.status).json(JSON.stringify(result.data))
  }
  catch (error) {
    console.log(error.response.data);
    res.status(error.response.status).json(JSON.stringify(error.response.data))
  }

}