// init
import axios from "axios";
import services from '../data.services/data-services-main.json'

const base = (services.data.find(x => x.code == 'media')).link

// -----------------

export const AssetsMediaLists = async (item) => {
  
  const basx = base + '/documents/list/asset/media';
  const head = { 
    "Content-Type": "application/json",
    "Authorization": process.env.REACT_APP_WEBB_SITE_CLNT
  }
  const datx = {data: item.data, srvc: process.env.REACT_APP_WEBB_SITE_SRVC}

  var result;
  try {
    result = await axios.post(basx, datx, { headers: head })
    // console.log(result)
    return { code: result.status, ...result.data }
  } catch (error) {
    // console.log(error)
    return { code: error.response.status, ...error.response.data }
  }
}