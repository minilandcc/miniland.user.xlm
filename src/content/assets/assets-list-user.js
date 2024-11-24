// assets
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NumberFormat } from "../../services/srvc-utilities";

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";
import WebbLoaderMedium from "../webx/webb-loader-md";
import WebbLoaderSmall from "../webx/webb-loader-sm";
import WebbModuleInfo from "../webx/webb-module-info";
import FormNeeded from "../webx/form-needed";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-local";

import { TokensListUser } from "../../services/srvc-tokens-realm";


export default function AssetsListUserModule () {

  const usxx = GetUserForm()
  const usrx = GetLocalUser()
  const temx = GetLocalBusiness()
  const asset = usxx === 'user' ? usrx : temx
  
  const navigate = useNavigate();

  const [loader, setLoader] = useState(true);
  const [data, setData] = useState()

  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoader(true);

        const result = await TokensListUser({data: {user: asset.item}})
        console.log (result)

        if (result.data)
        setData(result.data.list)

        setLoader(false);
      }
      fetchData()
    } else {}
  },[]);

  const handleClick = async(item) => {
    navigate(`/${asset.form}/vx/${item}`)
  }


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
        <i className="bx bxs-info-circle text-color-tint"></i>
      </span>
      <span className='ms-1 text-color-tone'>No Assets</span>
      
    </div>
  </>

  return (
  <>

    {/* info */}

    {/* data */}
    <div className="back-color-wite rounded-xd border mb-3">
    {data && data.map((item, i) => (
      <div className="cursor " key={i}  onClick={() => handleClick(item.unit.item)}>
        <div className="d-flex rounded-wd p-3 hitone" >
          <div className="" style={{width: '2.4rem', height: '2.4rem'}}>
            <div className="media-cube" >
              <img src={item.media.link} className="rounded-xx" alt={item.name || ''}></img>
            </div>
          </div>

          <div className="ms-2 w-50" >
            <p className="text-bold m-0 text-sm">{item?.unit?.name || '******'}</p>
            <p className="text-small m-0 text-sm">{item?.unit?.number || '******'}</p>
          </div>

          <div className="ms-auto text-end w-25">
            <p className="m-0 text-sm">
              <span className="text-bold">{parseInt(item?.balance?.number || '0')}</span>
              <span>{' '}</span>
              <span className="text-small text-color-tone d-none">{(item?.balance?.ticker || '**')}</span>
              <span className="text-small text-color-tone">{('SQFT')}</span>
            </p>
            <p className="text-small m-0 text-sm">
            <span>{((item?.rate?.number || '0')/1000000).toFixed(2)}</span>
            <span>{' '}</span>
            <span className="text-small text-color-tone">{(item?.rate?.ticker || '**')}</span>
            </p>
          </div>

        </div>
        <div className={i < data.length-1 ? 'border-bottom' : ''}></div>
      </div>      
    ))}
    </div>

  </>

  )
}