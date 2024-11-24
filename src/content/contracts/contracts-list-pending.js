import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { EsignPendingDocuments } from '../../services/srvc-contracts';
import { GetUserForm } from '../../services/srvc-utilities';
import { GetLocalBusiness, GetLocalUser } from '../../services/srvc-auth-local';
import "./text.css"

export  const ContractListPendingModule = () => {

const usxx = GetUserForm()
const usrx = GetLocalUser()
const temx = GetLocalBusiness()
const asset = usxx === 'user' ? usrx : temx

const [loader, setLoader] = useState(true);
const [data, setData] = useState([])


useEffect(()=>{
    setLoader(true)
    const fetchdata = async()=>{
        var res = await EsignPendingDocuments({data:{user:asset.item}})
        if(res.stat ) setData(res.data)
        setLoader(false)
    //    var filtered =  res.data.find(docx => docx.mmbr.item == asset.item && docx.mmbr.stat== 1)
    //    console.log(filtered)
    }

    fetchdata()

},[])


if (loader) return <>
    <div className='p-3 back-color-wite rounded-xd border align-middle' style={{}}>
      
      <span className="align-middle text-lead">
        <i className="bx bxs-info-circle text-color-wait"></i>
      </span>
      <span className='ms-1 text-color-tone'>Please Wait...</span>
      
    </div>
  </>
if (!loader && (!data || data.length === 0)) return <>
<div className='p-3 back-color-wite rounded-xd border align-middle' style={{}}>
  
  <span className="align-middle text-lead">
    <i className="bx bxs-info-circle text-color-success"></i>
  </span>
  <span className='ms-1 text-color-tone'>No Pending Signature</span>
  
</div>
</>

  return (
    <div className='p-2 bg-white rounded'>
        {
            data && data.map(item=>{
                return (
                  <div className="border rounded-xd p-3 d-flex align-items-center mb-2">
                    <div className="me-auto">
                      <p className="m-0">{item.meta.name}</p>
                      <p
                        className="text-small d-md-block d-none"
                      >
                        {item.meta.memo}
                      </p>
                      <p
                        className="text-small textWidth d-md-none"
                        style={{
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.meta.memo}
                      </p>
                    </div>
                    <div className="text-end">
                      {" "}
                      <div
                        onClick={() => window.open(item.mmbr[0].link)}
                        className="btn btn-primary rounded-xx text-small"
                      >
                        Esign
                      </div>{" "}
                    </div>
                  </div>
                );
            })
        }
    </div>
  )
}
