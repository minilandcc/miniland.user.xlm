// init
import axios from "axios";
const base = 'https://ap-southeast-1.aws.data.mongodb-api.com/app/  -webb-nwrbb/endpoint'

// -----------------

export const AssetListCounts = async (item) => {
  
  const basx = base + '/assets/list/counts';
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

export const AssetCounts = async (item) => {
  
  const basx = base + '/assets/counts';
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


export const AssetInterestStatus = async (item) => {
  
  const basx = base + '/assets/interest/status';
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


export const AssetInterestSet = async (item) => {
  
  const basx = base + '/assets/interest/set';
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


export const AssetLikesSet = async (item) => {
  
  const basx = base + '/assets/likes/set';
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


export const AssetViewsSet = async (item) => {
  
  const basx = base + '/assets/views/set';
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

export const AssetUserAuthStatus = async (item) => {
  
  const basx = base + '/assets/user/auth/status';
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