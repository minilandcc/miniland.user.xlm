import axios from 'axios'

import services from "../data.services/data-services-main.json";


const base = services.data.find((x) => x.code === "contracts").link;


export const CreateContract = async (item) => {

    const basx = base + '/contract/create'
    const head = {
      'Content-Type': 'application/json',
      'Authorization': process.env.REACT_APP_WEBB_SITE_CLNT
    }
    
    const datx = { data: item.data, srvc: process.env.REACT_APP_WEBB_SITE_SRVC }
  
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

  export const ContractDetailsRead = async (item) => {

    const basx = base + '/contract/read'
    const head = {
      'Content-Type': 'application/json',
      'Authorization': process.env.REACT_APP_WEBB_SITE_CLNT
    }
    
    const datx = { data: item.data, srvc: process.env.REACT_APP_WEBB_SITE_SRVC }
  
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

  export const ContractLists = async (item) => {

    const basx = base + '/contract/list'
    const head = {
      'Content-Type': 'application/json',
      'Authorization': process.env.REACT_APP_WEBB_SITE_CLNT
    }
    
    const datx = { data: item.data, srvc: process.env.REACT_APP_WEBB_SITE_SRVC }
  
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

  export const ContractSetMembers = async (item) => {

    const basx = base + '/contract/set/members'
    const head = {
      'Content-Type': 'application/json',
      'Authorization': process.env.REACT_APP_WEBB_SITE_CLNT
    }
    
    const datx = { data: item.data, srvc: process.env.REACT_APP_WEBB_SITE_SRVC }
  
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

  export const ContractSend = async (item) => {

    const basx = base + '/contract/send'
    const head = {
      'Content-Type': 'application/json',
      'Authorization': process.env.REACT_APP_WEBB_SITE_CLNT
    }
    
    const datx = { data: item.data, srvc: process.env.REACT_APP_WEBB_SITE_SRVC }
  
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

  export const GetSignedDocuments = async (item) => {
    const basx = base + '/get/signed/documents'
    const head = {
      'Content-Type': 'application/json',
      'Authorization': process.env.REACT_APP_WEBB_SITE_CLNT
    }
    
    const datx = { data: item.data, srvc: process.env.REACT_APP_WEBB_SITE_SRVC }
  
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

  export const GetSignedStatus = async (item) => {
    const basx = base + '/get/signed/status'
    const head = {
      'Content-Type': 'application/json',
      'Authorization': process.env.REACT_APP_WEBB_SITE_CLNT
    }
    
    const datx = { data: item.data, srvc: process.env.REACT_APP_WEBB_SITE_SRVC }
  
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

  export const EsignPendingDocuments = async (item) => {
    const basx = base + '/contracts/list/pending'
    const head = {
      'Content-Type': 'application/json',
      'Authorization': process.env.REACT_APP_WEBB_SITE_CLNT
    }
    
    const datx = { data: item.data, srvc: process.env.REACT_APP_WEBB_SITE_SRVC }
  
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
