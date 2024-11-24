// assets
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-local";

import { AssetsMediaLists } from "../../services/srvc-assets-media-realm";

import ImageCarousel from "../webx/image-carousel";
import { Carousel } from 'react-responsive-carousel';

export default function AssetsMediaListModule () {

  const usxx = GetUserForm()
  const usrx = GetLocalUser()
  const temx = GetLocalBusiness()
  const asset = usxx === 'user' ? usrx : temx

  const {id} = useParams()
  
  const navigate = useNavigate();

  const [loader, setLoader] = useState(true);
  const [data, setData] = useState()

  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoader(true);
        var res = await AssetsMediaLists({data:{asset:id, format:'image'}})
        console.log(res)
        
        if(res.stat) {
          setData(res.data.list)
        }
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
      <span className='ms-1 text-color-tone'>No Media Found</span>
      
    </div>
  </>

  return (
  <>

    {/* info */}

    {/* data */}
    <div className="back-color-wite rounded-xd border mb-3">
        
      {/* <ImageCarousel images={data} /> */}
      <div className="row">
        <div className="col"></div>
        <div className="col">
        <Carousel>
      {data && data.map((item, i) => (
        <div className="" style={{maxWidth: '600px'}}>
          <img src={item.link} className="img-fluid"></img>
        </div>
      ))}
      </Carousel>
        </div>
        <div className="col"></div>
      </div>
       
    </div>

  </>

  )
}