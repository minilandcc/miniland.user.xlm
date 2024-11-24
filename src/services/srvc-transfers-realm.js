// init
import axios from "axios";
const base = 'https://ap-south-1.aws.data.mongodb-api.com/app/miniland-transfers-baommbt/endpoint'

// -----------------

export const TransfersList = async (item) => {
  
  const basx = base + '/transfers/funds/list';
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

export const TransfersAccountCredit = async (item) => {
  
  const basx = base + '/transfers/funds/account/credit';
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


export const TransfersAccountDebit = async (item) => {
  
  const basx = base + '/transfers/funds/account/debit';
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

export const TransfersCreate = async (item) => {
  
  const basx = base + '/transfers/funds/create';
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

export const TransfersDetails = async (item) => {
  
  const basx = base + '/transfers/funds/details';
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

export const TransfersFundsSubmit = async (item) => {
  
  const basx = base + '/transfers/funds/submit';
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

export const TransfersFundsDecline = async (item) => {
  
  const basx = base + '/transfers/funds/decline';
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