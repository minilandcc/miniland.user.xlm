// auth - firebase mail link
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { NumberFormat } from "../../services/srvc-utilities";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-local";

import { AssetFeatures } from "../../services/srvc-assets-realm";

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

export default function AssetFeaturesModule () {

  const usxx = GetUserForm()
  const usrx = GetLocalUser()
  const temx = GetLocalBusiness()
  const asset = usxx === 'user' ? usrx : temx

  const navigate = useNavigate();
  const {id} = useParams()

  const [loader, setLoader] = useState(false);

  const [data, setData] = useState(list)



  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoader(true);

        const result = await AssetFeatures({data: {item: id, chain: '416001'}})
        console.log (result)

        const stats = Array.from(list, x => { return {
          ...x, 
          number: result.data.features[x.code.split('.')[1]] || x.number,
          // ticker: result.data.find(z => z.code == x.code).ticker || 'BRX'
        }})

        if (result.data) setData(stats)

        setLoader(false);
      }
      fetchData()
    } else {}
  },[id]);



  if (loader) return <></>


  return (
  <>

    {/* info */}
    <div className="back-color-wite rounded-xd border p-0 m-0">
    

      {/* data */}
      <div className="row row-cols-3 row-cols-md-3 g-0">
        {data && data.map((item, i) => (
        <div className="col" key={i}>
          <div className="p-3" key={i}>
            <p className="m-0" style={{fontSize: '0.75rem'}}>
              <span className="text-uppercase text-small text-color-tone text-bold text-sm">{item.name}</span>
            </p>
            <p className="m-0 text-uppercase">
              <span className="text-normal">{(item?.number || '0')}</span>
              <span className="ms-1 text-small">{(item?.ticker || '')}</span>
            </p>
          </div>
        </div>
        ))}                  
        </div>
     
      </div>

    </>
  );

}