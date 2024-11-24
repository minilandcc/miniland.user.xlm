// init
import axios from "axios";
import services from '../data.services/data-services-main.json'

const base = (services.data.find(x => x.code == 'transfers.funds')).link

// -----------------

export const TransfersFundListUser = async (item) => {
  
  
  const basx = base + '/transfers/funds/list';
  const head = { 
    "Content-Type": "application/json",
    "Authorization": process.env.REACT_APP_WEBB_SITE_CLNT
  }
  const datx = {data: item.data, srvc: process.env.REACT_APP_WEBB_SITE_SRVC}

  var result
  try {
    result = await axios.post(basx, datx, { headers: head })
    return { code: result.status, ...result.data }
  } catch (error) {
    return { code: error.response.status, ...error.response.data }
  }
}

export const TransfersFundAssetListUser = async (item) => {
  
  const basx = base + '/transfers/funds/list/assets';
  const head = { 
    "Content-Type": "application/json",
    "Authorization": process.env.REACT_APP_WEBB_SITE_CLNT
  }
  const datx = {data: item.data, srvc: process.env.REACT_APP_WEBB_SITE_SRVC}

  var result
  try {
    result = await axios.post(basx, datx, { headers: head })
    return { code: result.status, ...result.data }
  } catch (error) {
    return { code: error.response.status, ...error.response.data }
  }
}

export const TransfersFundAssetListUnits = async (item) => {
  
  const basx = base + '/transfers/funds/list/units';
  const head = { 
    "Content-Type": "application/json",
    "Authorization": process.env.REACT_APP_WEBB_SITE_CLNT
  }
  const datx = {data: item.data, srvc: process.env.REACT_APP_WEBB_SITE_SRVC}

  var result
  try {
    result = await axios.post(basx, datx, { headers: head })
    return { code: result.status, ...result.data }
  } catch (error) {
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
    return { code: result.status, ...result.data }
  } catch (error) {
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
    return { code: result.status, ...result.data }
  } catch (error) {
    return { code: error.response.status, ...error.response.data }
  }
}

export const TransfersAssetCredit = async (item) => {
  
  const basx = base + '/transfers/funds/asset/credit';
  const head = { 
    "Content-Type": "application/json",
    "Authorization": process.env.REACT_APP_WEBB_SITE_CLNT
  }
  const datx = {data: item.data, srvc: process.env.REACT_APP_WEBB_SITE_SRVC}

  var result
  try {
    result = await axios.post(basx, datx, { headers: head })
    return { code: result.status, ...result.data }
  } catch (error) {
    return { code: error.response.status, ...error.response.data }
  }
}

export const TransfersAssetDebit= async (item) => {
  
  const basx = base + '/transfers/funds/asset/debit';
  const head = { 
    "Content-Type": "application/json",
    "Authorization": process.env.REACT_APP_WEBB_SITE_CLNT
  }
  const datx = {data: item.data, srvc: process.env.REACT_APP_WEBB_SITE_SRVC}

  var result
  try {
    result = await axios.post(basx, datx, { headers: head })
    return { code: result.status, ...result.data }
  } catch (error) {
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
    return { code: result.status, ...result.data }
  } catch (error) {
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
    return { code: result.status, ...result.data }
  } catch (error) {
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
    return { code: result.status, ...result.data }
  } catch (error) {
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
    return { code: result.status, ...result.data }
  } catch (error) {
    return { code: error.response.status, ...error.response.data }
  }
}

export const TransfersFundsStatus = async (item) => {
  
  const basx = base + '/transfers/funds/status';
  const head = { 
    "Content-Type": "application/json",
    "Authorization": process.env.REACT_APP_WEBB_SITE_CLNT
  }
  const datx = {data: item.data, srvc: process.env.REACT_APP_WEBB_SITE_SRVC}

  var result
  try {
    result = await axios.post(basx, datx, { headers: head })
    return { code: result.status, ...result.data }
  } catch (error) {
    return { code: error.response.status, ...error.response.data }
  }
}

export const TransfersFundsSearch = async (item) => {
  const basx = base + "/transfers/funds/search";
  const head = {
    "Content-Type": "application/json",
    Authorization: process.env.REACT_APP_WEBB_SITE_CLNT,
  };
  const datx = { data: item.data, srvc: process.env.REACT_APP_WEBB_SITE_SRVC };

  var result;
  try {
    result = await axios.post(basx, datx, { headers: head });
    return { code: result.status, ...result.data };
  } catch (error) {
    return { code: error.response.status, ...error.response.data };
  }
};