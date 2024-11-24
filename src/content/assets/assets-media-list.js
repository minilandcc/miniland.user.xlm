// assets
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-local";
import { AssetsMediaLists } from "../../services/srvc-assets-media-realm";

import AliceCarousel from 'react-alice-carousel';
import Slider from "react-slick";

export default function AssetsMediaListModule () {

  const usxx = GetUserForm()
  const usrx = GetLocalUser()
  const temx = GetLocalBusiness()
  const asset = usxx === 'user' ? usrx : temx

  const {id} = useParams()
  
  const navigate = useNavigate();

  const [loader, setLoader] = useState(true);
  const [data, setData] = useState()

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 3, slidesToScroll: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 576, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ]
  };

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 2 },
  };


  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoader(true);
        var res = await AssetsMediaLists({data:{asset:id, format:'image'}})
        console.log(res)
        if(res.stat)
        {
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
    
    {/* data */}
    <AliceCarousel
      autoPlay
      // autoPlayControls
      autoPlayStrategy="none"
      autoPlayInterval={1000}
      animationDuration={1000}
      animationType="fadeout"
      infinite    
      disableDotsControls
      // disableButtonsControls
      mouseTracking
      paddingLeft={20}
      paddingRight={20}
      items=
      {data && data.map((item, i) => (
        <div className="" key={i}>
          <div className="media-standard">
            <img src={item.link} classname="" alt="..." />
          </div>
          
        </div>
      ))}
        
      responsive={responsive}
      controlsStrategy="alternate"
    />

    <div className="carousel slide d-none">
      <div className="carousel-inner" data-bs-ride="carousel" >
      {data && data.map((item, i) => (
        <div className="carousel-item active" key={i}>
          <div className="media-standard">
            <img src={item.link} classname="d-block img-fluid" alt="..." />
          </div>
          
        </div>
      ))}
      </div>
    </div>

  </>

  )
}