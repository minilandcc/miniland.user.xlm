// init
import axios from "axios";
import services from '../data.services/data-services-main.json'

const base = (services.data.find(x => x.code == 'transfers.assets')).link

// -----------------

export const TransfersAssetDetails= async (item) => {
  
  const basx = base + '/transfers/assets/details';
  const head = { 
    "Content-Type": "application/json",
    "Authorization": process.env.REACT_APP_WEBB_SITE_CLNT
  }
  const datx = {data: item.data, srvc: process.env.REACT_APP_WEBB_SITE_SRVC}

  var result
  try {
    result = await axios.post(basx, datx, { headers: head })
    // console.log(result)
    return { code: result.status, ...result.data }
  } catch (error) {
    // console.log(error)
    return { code: error.response.status, ...error.response.data }
  }
}


export const TransfersAssetListUnit = async (item) => {
  
  const basx = base + '/transfers/assets/list/unit';
  const head = { 
    "Content-Type": "application/json",
    "Authorization": process.env.REACT_APP_WEBB_SITE_CLNT
  }
  const datx = {data: item.data, srvc: process.env.REACT_APP_WEBB_SITE_SRVC}

  var result
  try {
    result = await axios.post(basx, datx, { headers: head })
    // console.log(result)
    return { code: result.status, ...result.data }
  } catch (error) {
    // console.log(error)
    return { code: error.response.status, ...error.response.data }
  }
}

export const TransfersAssetListUserWait = async (item) => {
  
  const basx = base + '/transfers/assets/list/users/wait';
  const head = { 
    "Content-Type": "application/json",
    "Authorization": process.env.REACT_APP_WEBB_SITE_CLNT
  }
  const datx = {data: item.data, srvc: process.env.REACT_APP_WEBB_SITE_SRVC}

  var result
  try {
    result = await axios.post(basx, datx, { headers: head })
    // console.log(result)
    return { code: result.status, ...result.data }
  } catch (error) {
    // console.log(error)
    return { code: error.response.status, ...error.response.data }
  }
}

export const TransfersAssetListUser = async (item) => {
  
  const basx = base + '/transfers/assets/list/users';
  const head = { 
    "Content-Type": "application/json",
    "Authorization": process.env.REACT_APP_WEBB_SITE_CLNT
  }
  const datx = {data: item.data, srvc: process.env.REACT_APP_WEBB_SITE_SRVC}

  var result
  try {
    result = await axios.post(basx, datx, { headers: head })
    // console.log(result)
    return { code: result.status, ...result.data }
  } catch (error) {
    // console.log(error)
    return { code: error.response.status, ...error.response.data }
  }
}


export const TransfersAssetClaim = async (item) => {
  
  const basx = base + '/transfers/assets/claim';
  const head = { 
    "Content-Type": "application/json",
    "Authorization": process.env.REACT_APP_WEBB_SITE_CLNT
  }
  const datx = {data: item.data, srvc: process.env.REACT_APP_WEBB_SITE_SRVC}

  var result
  try {
    result = await axios.post(basx, datx, { headers: head })
    // console.log(result)
    return { code: result.status, ...result.data }
  } catch (error) {
    // console.log(error)
    return { code: error.response.status, ...error.response.data }
  }
}

export const TransfersAssetSubmit = async (item) => {
  
  const basx = base + '/transfers/assets/submit';
  const head = { 
    "Content-Type": "application/json",
    "Authorization": process.env.REACT_APP_WEBB_SITE_CLNT
  }
  const datx = {data: item.data, srvc: process.env.REACT_APP_WEBB_SITE_SRVC}

  var result
  try {
    result = await axios.post(basx, datx, { headers: head })
    // console.log(result)
    return { code: result.status, ...result.data }
  } catch (error) {
    // console.log(error)
    return { code: error.response.status, ...error.response.data }
  }
}

export const TransfersAssetDecline = async (item) => {
  
  const basx = base + '/transfers/assets/decline';
  const head = { 
    "Content-Type": "application/json",
    "Authorization": process.env.REACT_APP_WEBB_SITE_CLNT
  }
  const datx = {data: item.data, srvc: process.env.REACT_APP_WEBB_SITE_SRVC}

  var result
  try {
    result = await axios.post(basx, datx, { headers: head })
    // console.log(result)
    return { code: result.status, ...result.data }
  } catch (error) {
    // console.log(error)
    return { code: error.response.status, ...error.response.data }
  }
}

export const TransfersAssetCreate = async (item) => {
  
  const basx = base + '/transfers/assets/create';
  const head = { 
    "Content-Type": "application/json",
    "Authorization": process.env.REACT_APP_WEBB_SITE_CLNT
  }
  const datx = {data: item.data, srvc: process.env.REACT_APP_WEBB_SITE_SRVC}

  var result
  try {
    result = await axios.post(basx, datx, { headers: head })
    // console.log(result)
    return { code: result.status, ...result.data }
  } catch (error) {
    // console.log(error)
    return { code: error.response.status, ...error.response.data }
  }
}

export const TransfersAssetGraph = async (item) => {
  const basx = base + "/transfers/assets/graph";
  const head = {
    "Content-Type": "application/json",
    Authorization: process.env.REACT_APP_WEBB_SITE_CLNT,
  };
  const datx = { data: item.data, srvc: process.env.REACT_APP_WEBB_SITE_SRVC };

  var result;
  try {
    result = await axios.post(basx, datx, { headers: head });
    // console.log(result)
    return { code: result.status, ...result.data };
  } catch (error) {
    // console.log(error)
    return { code: error.response.status, ...error.response.data };
  }
};