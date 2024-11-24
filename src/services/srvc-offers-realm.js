// init
import axios from "axios";
import services from '../data.services/data-services-main.json'

const base = (services.data.find(x => x.code == 'offers')).link

// -----------------

export const AssetsOffersCreate = async (item) => {
  
  const basx = base + '/assets/offers/create';
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

export const AssetsOffersList = async (item) => {
  
    const basx = base + '/assets/offer/list/individual';
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

  export const AssetsOffersDetails = async (item) => {
  
    const basx = base + '/assets/offer/details/individual';
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

  export const AssetsOffersStatusSet = async (item) => {
  
    const basx = base + '/assets/individual/offers/status/set';
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
  
export const AssetsOffersDecline = async (item) => {
  const basx = base + "/assets/offers/decline";
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

  export const AssetsOffersListResale = async (item) => {
  
    const basx = base + '/assets/offers/list';
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

  export const AssetsOffersResaleDetails = async (item) => {
  
    const basx = base + '/assets/offer/details';
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
  
export const CreateIndividualOffers = async (item) => {
  const basx = base + "/assets/offer/create/individual";
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

export const AssetsUsersOffersList = async (item) => {
  const basx = base + "/assets/users/offers/list";
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

export const AssetsUsersOfferCancel = async (item) => {
  const basx = base + "/asset/offer/cancel";
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

export const AssetUserOfferEdit = async (item) => {
  const basx = base + "/asset/user/offer/edit";
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