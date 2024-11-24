import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { EsignPendingDocuments } from '../../services/srvc-contracts';
import { GetUserForm, NumberFormat } from '../../services/srvc-utilities';
import { GetLocalBusiness, GetLocalUser } from '../../services/srvc-auth-local';
import { AssetsOffersDetails, AssetsOffersList, AssetsOffersStatusSet } from '../../services/srvc-offers-realm';
import { useNavigate, useParams } from 'react-router-dom';
import WebbDividerMedium from '../webx/webb-divider-md';
import { UserOnboardStatus } from '../../services/srvc-user-realm';
import { AccountsBaseBalance } from '../../services/srvc-accounts-realm';
import { TransfersAssetCredit } from '../../services/srvc-transfers-funds-realm';
import AssetUnitOfferListModule from '../assets/assetx-offers-units';
import "./offers.css"

export  const OffersDetailsModule = () => {

const usxx = GetUserForm()
const usrx = GetLocalUser()
const temx = GetLocalBusiness()
const asset = usxx === 'user' ? usrx : temx

const [loader, setLoader] = useState(true);
const [data, setData] = useState()
const [onboardstatus, setOnboardStatus] = useState(false);
const [balance, setBalance] = useState(false)

const navigate = useNavigate()
const id = useParams().id


useEffect(()=>{
    setLoader(true)
    const fetchdata = async()=>{
        var res = await AssetsOffersDetails({data:{item:id}})
        console.log(res)
        if(res.stat ) setData(res.data)
        setLoader(false)
    //    var filtered =  res.data.find(docx => docx.mmbr.item == asset.item && docx.mmbr.stat== 1)
    //    console.log(filtered)
    }

    fetchdata()

},[])


useEffect(() => {
    if (asset) {
      const fetchData = async () => {
        setOnboardStatus(false);
        var result = await UserOnboardStatus({
          data: { user: asset.item },
          srvc: "******",
        });
        console.log(result);
        if (result.stat)
          setOnboardStatus(
            result.data.taxx && result.data.adhr && result.data.mntr
          );
      };
      fetchData();
    } else {
    }
  }, []);

  useEffect(() => {
    if (asset) {
      const fetchData = async () => {
        setLoader(true);
        const result = await AccountsBaseBalance({
          data: { user: asset.item },
        });
        // console.log(result)
        if (result.stat) 
        {
            setBalance(parseFloat(result?.data?.balance?.number)/1000000)
        }
            // setBalance(result.data.balance);

        setLoader(false);
      };
      fetchData();
    } else {
    }
  }, []);


  const BuyUnit = async()=>{
    var datx = {
        credit: {
          name: data?.debt?.name,
          mail: data?.debt?.mail || "******",
          item: data?.debt?.item,
        },
        debit: { name: asset.name, mail: asset.mail, item: asset.item },
        count: { number: data?.size?.nmbr, ticker:  "BRX" },
        rate: { number: (parseFloat(data?.rate?.nmbr)*1000000).toString(), ticker: data?.rate?.tick || "INR" },
        meta: {
          name: "unit.sale",
          memo: `brx.unit.${data?.unit?.number || "000000"}.sale.${data?.size?.nmbr}`,
        },
        asset: {
          name: data?.assx?.name,
          memo: data?.assx?.memo,
          number: data?.assx?.number,
          item: data?.assx?.item,
        },
        unit: {
          name: data?.unit?.name,
          memo: data?.unit?.memo,
          item: data?.unit.item,
          number: data?.unit?.number || "000000",
          media: data?.unit?.media || '',
        },
      };
  
      console.log(datx);
     var result = await TransfersAssetCredit({ data: datx, srvc: "******" });
    //   console.log(result);
      if(result.stat)
        {
            var res = await AssetsOffersStatusSet({data:{item: id, status: '6'}})
            if(res.stat)
            {
                navigate("/user/transfers")
            }
        }
      
  }


if (loader) return <>
    <div className='p-3 back-color-wite rounded-xd border align-middle' style={{}}>
      
      <span className="align-middle text-lead">
        <i className="bx bxs-info-circle text-color-wait"></i>
      </span>
      <span className='ms-1 text-color-tone'>Please Wait...</span>
      
    </div>
  </>
if (!loader && (!data )) return <>
<div className='p-3 back-color-wite rounded-xd border align-middle' style={{}}>
  
  <span className="align-middle text-lead">
    <i className="bx bxs-info-circle text-color-success"></i>
  </span>
  <span className='ms-1 text-color-tone'>No Pending Offers</span>
  
</div>
</>

//console.log(balance)

  return (
    <>
      {/* <div className="px-1 py-3 rounded-xd border">
        <div className="p-2 bg-white">
          <div className="p-2 bg-white  rounded mt-3 d-flex">
            <div className="me-auto text-center " style={{ width: "50%" }}>
              <h6 className="fw-bold mt-2">Offer Id</h6>
              <p
                className="text-small textWidth"
                style={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {data?.item}
              </p>
            </div>
            <div className="text-end text-center" style={{ width: "50%" }}>
              <h6 className="fw-bold mt-2">Assets Name</h6>
              <p>{data?.assx?.name || ""}</p>
            </div>
            <div className="text-end text-center" style={{ width: "50%" }}>
              <h6 className="fw-bold mt-2">Unit Name</h6>
              <p className="m-0">{data?.unit?.name}</p>
            </div>
          </div>
        </div>

        <div className="p-2 bg-white rounded">
          <div className="p-2 bg-white  rounded mt-3 d-flex">
            <div className="me-auto text-center " style={{ width: "50%" }}>
              <h6 className="fw-bold mt-2">Offer Rate</h6>
              <p>
                {NumberFormat(
                  parseFloat(data?.rate?.nmbr) / 1000000 || 0,
                  "w",
                  2
                )}{" "}
                {data?.rate?.tick}
              </p>
            </div>
            <div className="text-end text-center" style={{ width: "50%" }}>
              <h6 className="fw-bold mt-2">Sale Unit</h6>
              <p>
                {data?.size?.nmbr || ""} {data?.size?.tick}
              </p>
            </div>
            <div className="text-end text-center" style={{ width: "50%" }}>
              <h6 className="fw-bold mt-2">Total Cost</h6>
              <p className="m-0">
                {NumberFormat(
                  (parseFloat(data?.size?.nmbr) *
                    parseFloat(data?.rate?.nmbr)) /
                    1000000,
                  "w",
                  2
                )}{" "}
                {data?.rate?.tick}
              </p>
            </div>
          </div>
        </div>

        <div className="p-2 bg-white rounded">
          <div className="p-2 bg-white  rounded mt-3 d-flex">
            <div className="me-auto text-center " style={{ width: "50%" }}>
              <h6 className="fw-bold mt-2">Seller Name</h6>
              <p>{data?.debt?.name} </p>
            </div>
            <div className="text-end text-center" style={{ width: "50%" }}>
              <h6 className="fw-bold mt-2">Seller Mail</h6>
              <p
                style={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
                className="textWidth"
              >
                {data?.debt?.mail || ""}{" "}
              </p>
            </div>
            <div className="text-end text-center" style={{ width: "50%" }}>
              <h6 className="fw-bold mt-2">View Assets</h6>
              <p
                onClick={() => navigate(`/user/ax/${data?.assx?.item}`)}
                className="m-0 text-primary cursor"
              >
                click
              </p>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className={!onboardstatus ? 'mt-3':'d-none'}>
        <div className='d-flex'>
         <p className='text-danger fw-bold m'>Complete Your eKYC Onboarding </p>
         <p className='text-small text-primary mx-4 mt-1 cursor' onClick={()=> navigate("/user/account")}>click Here </p>
        </div>
    </div> */}

      {/* <div className={onboardstatus ? 'mt-3':'d-none'}>
        <div className= {balance >=  parseFloat(data?.size?.nmbr) * parseFloat(data?.rate?.nmbr)? '':'d-none'} >
            <button onClick={()=> BuyUnit()} className='btn btn-primary rounded-xx text-small'>Buy Unit</button>
        </div>

        <div className= { balance < parseFloat(data?.size?.nmbr) * parseFloat(data?.rate?.nmbr)? 'd-flex':'d-none'} >
           <p className='text-danger'>Insufficient Balance</p>
           <p className='text-primary mx-4 cursor' onClick={()=> navigate('/user/account/credit')}>Click To Recharge</p>
        </div>
        
    </div> */}
      {/* assets offer units list */}

      {data ? <AssetUnitOfferListModule data={data} /> : <></>}
    </>
  );
}
