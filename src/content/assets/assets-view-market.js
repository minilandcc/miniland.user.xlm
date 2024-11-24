// assets
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { NumberFormat } from "../../services/srvc-utilities";

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";
import WebbLoaderMedium from "../webx/webb-loader-md";
import WebbLoaderSmall from "../webx/webb-loader-sm";
import WebbModuleInfo from "../webx/webb-module-info";
import FormNeeded from "../webx/form-needed";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-local";

import { AssetDetails } from "../../services/srvc-assets-realm";

import AssetFeaturesModule from "./assetx-features";
import AssetStatisticsModule from "./assetx-statistics";
import AssetUnitListModule from "./assetx-units";

export default function AssetsViewMarketModule () {

  const usxx = GetUserForm()
  const usrx = GetLocalUser()
  const temx = GetLocalBusiness()
  const asset = usxx === 'user' ? usrx : temx
  
  const navigate = useNavigate();
  const {id} = useParams()

  const [loader, setLoader] = useState(true);
  const [data, setData] = useState()


  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoader(true);
        // console.log (id)

        const result = await AssetDetails({data: {item: id}})
        console.log (result)

        if (result.stat) setData(result.data)

        setLoader(false);
      }
      fetchData()
    } else {}
  },[id]);

  const handleClick = async(item) => {
    navigate(`/${asset.role}/ax/${item}`)
  }


  if (loader) return <>
    <div className='p-3 back-color-wite rounded-xd border align-middle' style={{}}>
      
      <span className="align-middle text-lead">
        <i className="bx bxs-info-circle text-color-wait"></i>
      </span>
      <span className='ms-1 text-color-tone'>Please Wait...</span>
      
    </div>
  </>
  if (!loader && !data) return <>
    <div className='p-3 back-color-wite rounded-xd border align-middle' style={{}}>
      
      <span className="align-middle text-lead">
        <i className="bx bxs-info-circle text-color-error"></i>
      </span>
      <span className='ms-1 text-color-tone'>Assets Not Found</span>
      
    </div>
  </>


  return (
    <>
  

    </>
  );

}