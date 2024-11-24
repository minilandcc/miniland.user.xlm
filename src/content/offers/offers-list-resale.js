import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { EsignPendingDocuments } from '../../services/srvc-contracts';
import { GetUserForm, NumberFormat } from '../../services/srvc-utilities';
import { GetLocalBusiness, GetLocalUser } from '../../services/srvc-auth-local';
import { AssetsOffersList, AssetsOffersListResale } from '../../services/srvc-offers-realm';
import { useNavigate } from 'react-router-dom';

export  const OffersListResaleModule = () => {

const usxx = GetUserForm()
const usrx = GetLocalUser()
const temx = GetLocalBusiness()
const asset = usxx === 'user' ? usrx : temx

const [loader, setLoader] = useState(true);
const [data, setData] = useState([])

const navigate = useNavigate()


useEffect(()=>{
    setLoader(true)
    const fetchdata = async()=>{
        var res = await AssetsOffersListResale({data:{user:asset.item}})
        console.log(res)
        if(res.stat ) setData(res.data.list)
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
  <span className='ms-1 text-color-tone'>No Pending Offers</span>
  
</div>
</>

  return (
    <div className='p-2 bg-white rounded'>
        {
            data && data.map(item=>{
                return(
                    <div className='border rounded-xd p-3 d-flex align-items-center mb-3'>
                       <div className='me-auto'>
                         <p className='text-primary fw-bold m-0'>{item?.assx?.name}</p> 
                         <p className='m-0'>{item?.unit?.name}</p>
                         <p className='m-0'>{NumberFormat(item?.rate?.nmbr/1000000 || 0, 'w', 2)} {item?.rate?.tick}/sqft</p> 
                        
                       </div>
                       <div className='text-end'> <button onClick={()=> navigate(`/user/resale/offer/${item.item}`) } className='btn btn-primary rounded-xx text-small'>View Details</button> </div>
                    </div>

                )
            })
        }
    </div>
  )
}
