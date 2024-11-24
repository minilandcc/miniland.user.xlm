// auth - firebase mail link
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { NumberFormat } from "../../services/srvc-utilities";

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-local";

import { AssetDetails } from "../../services/srvc-assets-realm";


const list = [
  {name: 'Total Value', code: 'features.value', number: '0', ticker: 'INR', active: true },
  {name: 'Ticket Size', code: 'features.ticket', number: '0', ticker: 'INR', active: true },
  {name: 'Area', code: 'features.area', number: '6000', ticker: 'SQFT', active: true },
  {name: 'Asset', code: 'features.format', number: 'LAND', ticker: '', active: true },
  {name: 'Model', code: 'features.model', number: 'SALE', ticker: '', active: true },
  {name: 'Members', code: 'features.members', number: '20-25', ticker: '', active: true },
  {name: 'Returns', code: 'features.returns', number: '15', ticker: '%', active: true },
  {name: 'Hold', code: 'features.hold', number: '12', ticker: 'mon', active: true },
  {name: 'Exit', code: 'features.exit', number: '18', ticker: 'mon', active: true }
]

export default function AssetInfoDetailsModule () {

  const usxx = GetUserForm()
  const usrx = GetLocalUser()
  const temx = GetLocalBusiness()
  const asset = usxx === 'user' ? usrx : temx

  const navigate = useNavigate();
  const {id} = useParams()

  const [loader, setLoader] = useState(false);

  const [data, setData] = useState()
  const [features, setFeatures] = useState(list)


  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoader(true);
        // console.log (id)

        const result = await AssetDetails({data: {item: id}})
        console.log ("------------------------------->>>>>",result)

        if (result.data)  {
          setData(result.data)

          const featuresx = Array.from(list, x => { return {
            ...x, 
            number: result.data.features[x.code.split('.')[1]] || x.number,
            // ticker: result.data.find(z => z.code == x.code).ticker || 'BRX'
          }})
          setFeatures(featuresx)
        } 

        setLoader(false);
      }
      fetchData()
    } else {}
  },[id]);


  if (loader) return <>
    <p className="mx-3 text-color-tone">Please Wait...</p>
  </>


  return (
    <>
      {/* info */}
      <div className="">
        {/* media */}
        <div className="back-color-wite rounded-xd d-block d-md-none">
          <div className="media-banner d-none d-md-block">
            <img src={data?.media?.link} className="w-100 rounded-xd"></img>
            <div className="btn back-color-dark text-color-wite text-mini text-uppercase rounded-xx px-3">
              {data?.meta?.sort || "asset"}
            </div>
          </div>

          <div className="media-standard d-md-none">
            <img src={data?.media?.link} className="w-100 rounded-xd"></img>
            <div className="btn back-color-dark text-color-wite text-mini text-uppercase rounded-xx px-3">
              {data?.meta?.sort || "asset"}
            </div>
          </div>
        </div>
        <div className="d-block d-md-none">
          <WebbDividerSmall />
        </div>
        <div className="container">
          <p className="text-color-next d-block d-md-none">
            ID: {data?.webx?.number || "0000"}
          </p>
          <h1 className="text-lead text-color-main">
            {data && data.meta.name}
          </h1>
          <p className="m-0">{data && data.meta.memo}</p>
        </div>

        {/* <WebbDividerSmall /> */}
        <div className="container">
          <p className="text-uppercase m-0 d-none">
            Project By: {data?.creator?.name || "creator name"}
          </p>
          <p className="m-0 d-md-none d-block">Location: {data?.location?.site || "location"}</p>
        </div>
      </div>

      <WebbDividerSmall />
      <WebbDividerSmall />
      {/* features */}
      <div className="back-color-wite rounded-xd border p-0 m-0">
        <div className="row row-cols-3 row-cols-md-3 g-0">
          {features &&
            features.map((item, i) => (
              <div className="col" key={i}>
                <div className="p-3" key={i}>
                  <p className="m-0" style={{ fontSize: "0.75rem" }}>
                    <span className="text-uppercase text-small text-color-tone text-bold text-sm">
                      {item.name}
                    </span>
                  </p>
                  <p className="m-0 text-uppercase">
                    <span className="text-normal">
                      {NumberFormat(item?.number || "0", "", 0)}
                    </span>
                    <span className="ms-1 text-small">
                      {item?.ticker || ""}
                    </span>
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}