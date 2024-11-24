// init
import axios from "axios";
import services from '../data.services/data-services-main.json'

const base = (services.data.find(x => x.code == 'accounts')).link

// -----------------

export const AccountsList = async (item) => {
  
  const basx = base + '/accounts/list';
  const head = { 
    "Content-Type": "application/json",
    "Authorization": process.env.REACT_APP_WEBB_SITE_CLNT
  }
  const datx = {data: item.data, srvc: process.env.REACT_APP_WEBB_SITE_SRVC}

  var result;
  try {
    result = await axios.post(basx, datx, { headers: head })
    return { code: result.status, ...result.data }
  } catch (error) {
    return { code: error.response.status, ...error.response.data }
  }
}


export const AccountsOnboardStatus = async (item) => {
  
  const basx = base + '/accounts/onboard/status';
  const head = { 
    "Content-Type": "application/json",
    "Authorization": process.env.REACT_APP_WEBB_SITE_CLNT
  }
  const datx = {data: item.data, srvc: process.env.REACT_APP_WEBB_SITE_SRVC}

  var result;
  try {
    result = await axios.post(basx, datx, { headers: head })
    return { code: result.status, ...result.data }
  } catch (error) {
    return { code: error.response.status, ...error.response.data }
  }
}


export const AccountsBaseCreate = async (item) => {

  const basx = base + '/accounts/base/create';
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

export const AccountsBankCreate = async (item) => {
  
  const basx = base + '/accounts/bank/create';
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


export const AccountsTransitCreate = async (item) => {
  
  const basx = base + '/accounts/transit/create';
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


export const AccountsBaseBalance = async (item) => {
  
  const basx = base + '/accounts/base/balance';
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

export const AccountsTransitBalance = async (item) => {
  
  const basx = base + '/accounts/transit/balance';
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

export const AccountsTransitDetails = async (item) => {
  
  const basx = base + '/accounts/transit/details';
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
