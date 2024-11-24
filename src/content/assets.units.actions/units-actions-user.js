// units
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { NumberFormat } from "../../services/srvc-utilities";

import WebbDividerMedium from "../webx/webb-divider-md";
import WebbDividerSmall from "../webx/webb-divider-sm";
import FormNeeded from "../webx/form-needed";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-local";

import { AssetUnitStatus } from "../../services/srvc-assets-realm";
import { AssetUserAuthStatus } from "../../services/srvc-assets-webb-realm";

import { UserAccountDetails } from "../../services/srvc-user-realm";

import AssetUnitsClaimModule from "./units-claim";
import AssetUnitsFundModule from "./units-fund";



export default function AssetUnitActionsUserModule (props) {

  const navigate = useNavigate()

  const usxx = GetUserForm()
  const usrx = GetLocalUser()
  const temx = GetLocalBusiness()
  const asset = usxx === 'user' ? usrx : temx

  const {id} = useParams()
  const [loader, setLoader] = useState(true);

  const [actions, setActions] = useState([
    {name: "Fund", icon: "bx bx-credit-card", code: "fund", actv: true},
    // {name: "Claim", icon: "bx bx-plus-circle", code: "claim", actv: true},
    // {name: "Mint", icon: "bx bx-down-arrow-circle", code: "mint", actv: false},
    {name: "Offer", icon: "bx bx-up-arrow-circle", code: "offer", actv: false},
    {name: "Transfer", icon: "bx bx-check-circle", code: "transfer", actv: false}
  ])

  const [data, setData] = useState()

  const [auth, setAuth] = useState(0)
  const [task, setTask] = useState()
  const [onboard, setOnboard] = useState(null)
  const [accounts, setAccounts] = useState()

  
  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoader(true);

        var result = await UserAccountDetails({data:{user:asset.item}})
        if(result.stat) { 
          setOnboard(result.data.onbd)
          // console.log(res.data.onbd)
        }


        // const resUnit = await AssetUnitStatus({data: {unit: id}, srvc: '******'})
        // if (resUnit.stat) setData(resUnit.data)
        // console.log (resUnit)


        // const statusx = ''
        // // await AssetUserAuthStatus({data: {
        // //   asset: resUnit.data.asset.item, 
        // //   user: asset.item}, 
        // //   srvc: '******'
        // // })
        // if (statusx.stat) setAuth(statusx.data.auth == 0 ? false : true)
        // console.log (statusx)        

        setLoader(false);
      }
      fetchData()
    } else {}
  },[id]);


  const handleClick = (item) => {
    if (task == item) setTask() 
    else setTask(item)
  }

  

  // console.log(onboarding)

  if (loader) return <></>
  
  if(!loader && onboard!= null && (!onboard.taxx || !onboard.adhr || !onboard.base || !onboard.bank || !onboard.mntr  )){ 
  return(
    <>

      <div className="p-3 back-color-wite rounded-xd border">
        <p className="m-0">Please complete your KYC and Account Onboarding Steps</p>

        <WebbDividerSmall />
        <p className="text-bold m-0 mb-2">KYC Status</p>
        <p className='m-0 mb-1'>
          <i className={`bx ${onboard.taxx ? 'bxs-check-circle text-color-success': 'bxs-error-circle text-color-error'}`}></i>
          <span className="ms-2">PAN KYC Verification</span>
        </p>
        <p className='m-0 mb-1'>
          <i className={`bx ${onboard.adhr ? 'bxs-check-circle text-color-success': 'bxs-error-circle text-color-error'}`}></i>
          <span className="ms-2">Aadhaar KYC Verification</span>
        </p>

        <WebbDividerSmall />
        <p className="text-bold m-0 mb-2">Accounts Status</p>
        <p className='m-0 mb-1'>
          <i className={`bx ${onboard.mntr ? 'bxs-check-circle text-color-success': 'bxs-error-circle text-color-error'}`}></i>
          <span className="ms-2">Miniland Digital Assets Account</span>
        </p>
        <p className='m-0 mb-1'>
          <i className={`bx ${onboard.bank ? 'bxs-check-circle text-color-success': 'bxs-error-circle text-color-error'}`}></i>
          <span className="ms-2">Bank (Settlement) Account</span>
        </p>        
        <p className='m-0 mb-1'>
          <i className={`bx ${onboard.base ? 'bxs-check-circle text-color-success': 'bxs-error-circle text-color-error'}`}></i>
          <span className="ms-2">Mininland Transfer Account</span>
        </p>    

        <WebbDividerSmall />
        <p className="text-bold m-0 mb-2">Next Actions</p>
        <p className="m-0">
          Please visit your Profile to complete the steps.
        </p>
        <a className="" href={`/${asset.role}/account`}>Click Here to Goto Profile</a>
      </div>

    </>
  )}

  if (!loader && (!data?.status?.book || !auth)) return <>
    <div className="back-color-wite border rounded-xd p-3">
      <span className="align-middle"><i className="bx bxs-info-circle text-color-wait text-icon-sm"></i></span>
      <span>{' '}</span>
      <span>Bookings will start soon</span>
    </div>
  </>


  // check onboarding
 
  // if(!loader && onboarding) 
    //






  return (
  <>

    {/* info */}
    <div className="">
      <p className="text-small text-color-tone m-0 ms-3 mt-2 mb-2">MY ACTIONS</p>
      <div className={`row row-cols-${actions.length} g-0 back-color-wite rounded-xd border`}>
        {actions && actions.map((item, i) => (
        <div className="col text-center p-1" key={i}>

          <div className={`m-1 p-1 rounded-wd ${item.actv ? 'text-color-next hirich cursor' : 'text-color-tint'}`}
            onClick={() => handleClick(item.code)}
          >
            <i className={`m-0 p-0 ${item.icon} text-icon-md`}></i>
            <p className={`m-0 p-0 text-small text-nowrap d-none d-md-block`}>{item.name}</p>
            <p className={`m-0 p-0 text-mini text-nowrap d-md-none`}>{item.name}</p>
          </div>  
        </div>
        ))}

      </div>
    </div>
    
    
    {/* actions */}
    <WebbDividerSmall />
    <div className={task == 'claim' ? 'border rounded-xd back-color-wite p-3' : 'd-none'}>
      <AssetUnitsClaimModule />
    </div>

    <div className={task == 'fund' ? 'border rounded-xd back-color-wite p-3' : 'd-none'}>
      <AssetUnitsFundModule />
    </div>


  </>

  )
}