// init
import axios from "axios";
import services from "../data.services/data-services-main.json";

const base = services.data.find((x) => x.code == "rooms").link;

// -----------------

export const fetchRoomList = async (item) => {
  const basx = base + "/users/rooms";
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

export const fetchRoomsMessageList = async (item) => {
  const basx = base + "/rooms/message/list";
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

export const roomsMessageSend = async (item) => {
  const basx = base + "/rooms/message/add";
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

export const RoomsDetails = async (item) => {
  const basx = base + "/rooms/details";
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
