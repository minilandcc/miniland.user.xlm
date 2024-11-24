// init
import axios from "axios";
import services from '../data.services/data-services-main.json'

const base = (services.data.find(x => x.code == 'navs')).link

// -----------------

export const NAVSChangeList = async (item) => {
  
  const basx = base + '/nav/change/list/X';
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

export const AssetsCurrentNav = async (item) => {
  const basx = base + "/assets/current/nav";
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

export const AssetsNAVChangeList = async (item) => {
  const basx = base + "/assets/nav/change/list/X";
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