// content
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-local";


const listactions = require("../../data.static/data-user-account-section.json").data;

export default function UserOptionModule (props) {

  const navigate = useNavigate();
  const usxx = GetUserForm()
  const usrx = GetLocalUser()
  const temx = GetLocalBusiness()
  const asset = usxx === 'user' ? usrx : temx
  
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState()

  // console.log(listactions.filter(x => x.user.includes(asset.role)))

  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoader(true);

        const result = listactions.filter(x => x.user.includes(asset.role))
        console.log(result)
        setData(result)

        setLoader(false);
      }
      fetchData()
    } else {}
  },[]);

  // const handleClick = (live, link) => {
  //   if (live) navigate(`/${asset.role}/${link}`)
  // }
  const handleClick = (item) => {
    props.handleSelect(item)
    // if (live) navigate(`/${asset.role}/${link}`);
  };


  if (loader) return <></>


  return (
  <>
    
    <div className="back-color-wite rounded-xd p-1">
      {data && data.map((item, i) => (item.actv ?
      
        <div className={`d-flex p-2 align-middle 
          ${item.live ? 'cursor hidark rounded-wd' : 'text-color-tint'}`} 
          style={{height: '2.4rem'}} key={i} 
          onClick={() => handleClick(item)}
        >

          <div className="">
            <i className={`m-0 p-0 ${item.icon} `} style={{fontSize:"1.5em",}}></i>
          </div>
          <div className="ms-2">
            <p className={`m-0 p-0 text-nowrap`}>
              <span className="text-small align-middle">{item.name}</span>
            </p>
          </div>
          <div className="ms-auto ">
            <i className={`m-0 p-0 bx bx-chevron-right`} style={{fontSize:"1.5em",}}></i>
          </div>
        
        </div>
      :''))}
    </div>
    
  </>

  )
}