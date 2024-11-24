// main
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import ContentFormat from "../content/webz/content-format-xz";

import WebbDividerMedium from "../content/webx/webb-divider-md";
import WebbDividerSmall from "../content/webx/webb-divider-sm";

import NextLogout from "../content/webx/next-logout";

const media = 'https://img.freepik.com/free-vector/reviews-concept-landing-page_52683-20168.jpg?w=330'

export default function UserOnboardHold () {
  
  const metadata = {
    name: 'Account In Review',
    banner: {link: 'https://img.freepik.com/premium-vector/futuristic-vector-hexagon-wave-dark-cyberspace-abstract-wave-with-dots-line-white-moving-particles-background_744733-97.jpg?w=900'}
  }
  const navigate = useNavigate();
  
  return(

  <>
    <Helmet>
      <title>{metadata.name}{' • '}{process.env.REACT_APP_WEBB_SITE_NAME}{' • '}{process.env.REACT_APP_WEBB_SITE_LINE}</title>
      <link rel="canonical" href={process.env.REACT_APP_WEBB_SITE_LINK} />
    </Helmet>

    <ContentFormat 
      
      name = {metadata.name}
      header = {{ size: 'medium', show: false, data: 
      <> <div className=""> </div> </> }}

      media = {{ size: 'xtra', show: false, data: <> </> }}

      content = {{ size: 'mini', show: true, data: 
      <>
        <WebbDividerMedium />
        <div className="mx-3">
          <p className="text-lead text-bold text-color-next m-0">Account in Review</p>
          <p className="m-0">We are reviewing your account information.</p>
        </div>
  
        <div className="">
          <WebbDividerSmall />
          <img src={media} className="w-100 rounded-xd" alt='...'></img>
          <WebbDividerSmall />
        </div>

        <div className="mx-3">
          <p className="m-0">You will be able to access your account, once the account review is complete.</p>
          <WebbDividerMedium />
          <div className={'me-auto cursor'} onClick={() => navigate('/auth/next')}>Go Back</div>
        </div>
        

        <WebbDividerMedium />
        <WebbDividerMedium />
        <WebbDividerMedium />
        <WebbDividerMedium />
        <WebbDividerMedium />
      </>
      }}
    
      footer = {{ size: 'medium', data: 
      <>
        <div className="">
        
        </div>
      </>
      }}
    
    
    ></ContentFormat>


  </>
  )
}