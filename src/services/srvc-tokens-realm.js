// init
import axios from "axios";
import services from '../data.services/data-services-main.json'

const base = (services.data.find(x => x.code == 'tokens')).link

// -----------------

export const TokensListUser = async (item) => {
  
  const basx = base + '/tokens/list';
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

export const TokensBalanceUser = async (item) => {
  
  const basx = base + '/tokens/balance/user';
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

export const TokensListAsset = async (item) => {
  
  const basx = base + '/tokens/list/asset';
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

export const TokensDetails = async (item) => {
  const basx = base + "/tokens/details";
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


export const TokensUserUnitStat = async (item) => {
  const basx = base + "/tokens/users/units/stat";
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

export const TokensUnitsUsersList = async (item) => {
  const basx = base + "/tokens/units/users/list";
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

