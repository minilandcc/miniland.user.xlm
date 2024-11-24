// documents
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";


import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-local";

import listDocs from '../../data.static/data-documents.json'
import {  UserDocumentList } from "../../services/srvc-media-docs-realm";


export default function UserMediaDocsListModule () {

  const usxx = GetUserForm()
  const usrx = GetLocalUser()
  const temx = GetLocalBusiness()
  const asset = usxx === 'user' ? usrx : temx

  const navigate = useNavigate();

  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([])


  const updateObjectByKeyValue = (array, key, value, updatedProperties) => {
    return array.map(obj =>
      obj[key] === value ? { ...obj, ...updatedProperties } : obj
    );
  };


  useEffect( () => {
    if (asset){
      setLoader(true);
      const fetchData = async() => {
        
        var locallist = listDocs.data.filter(x => x.actv)
        setData(locallist)
        //console.log(locallist)
        const result = await UserDocumentList({data: {user: asset.item}})
        console.log (result)
        var newArray
        if (result.stat) {
          var list = (result.data.list.filter(item=> item.active== true))
        // console.log(list)

         if(list.length>0)
         {
          list.map((item,i)=>{
            if(i==0)  newArray = updateObjectByKeyValue(locallist, 'form', item.meta.name, {active: true, url: item.file.link, number: item.meta.number});
            else newArray = updateObjectByKeyValue(newArray, 'form', item.meta.name, {active: true, url: item.file.link, number: item.meta.number});

            setData(newArray)
           
          })
        
         
         }
  
         
        }
        setLoader(false);
        
      }
      fetchData()
    } else {}
  },[]);
  

  console.log(data)

  const handleClick = (item) => {
    // 
    if(item.active) window.open(item.url)
    else navigate(item.link)
    
  }


  if (loader) return <><div className="mx-3 text-color-tone">Please Wait...</div></>
  if (!loader && data && data.length === 0) return <>
    <div className="mx-3">No Documents Linked</div>
  </>

  return (
  <>
    {/* data */}
    <div className="back-color-wite rounded-xd border">
    {data && data.map((item, i) => (
      <div key={i}>
      <div className={`d-flex px-3 mt-3 mb-3`} >

        <div className="">
          <p className="m-0 ">
          <i className={`bx bxs-${item.active ? 'check' : 'error'}-circle ${item.active ? 'text-color-success' : 'text-color-error'}`}></i>
          </p>
        </div>

        <div className="ms-2">       
          <p className="m-0 ">
            <span className="text-color-next text-bold">{item?.meta?.name || '******'}</span>
          </p>
          <p className="text-small m-0 text-sm">
            <span className="">Number: {item?.number ||'******'}</span>
          </p>
          <p className="text-small m-0 text-sm d-none">
            <span className="">Verified: {item.active ? 'Yes' : 'No'}</span>
          </p>          
        </div>
    
        <div className="ms-auto text-end text-color-wite">      
          <div className="mb-1"></div>
          <span className={`p-2 px-3 back-color-success rounded-xx text-small align-middle ${item.active ? '': 'd-none'}`} 
            >
            {'Verified'}
          </span>           
          <span className={`p-2 px-3 back-color-error rounded-xx text-small align-middle cursor hidark   ${item.active ? 'd-none': ''}`} 
            onClick={() => handleClick(item)}>
            {'Pending'}
          </span>   
          
        </div>

      </div>
      <div className={i < data.length-1 ? 'border-bottom': ''}></div>
      </div>
    ))}
    </div> 

  </>

  )
}