// main
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

import ContentFormat from "../content/webz/content-format-xz";
import WebbHeader from "../content/webz/webb-header-xz";

import WebbDividerMedium from "../content/webx/webb-divider-md";
import WebbDividerSmall from "../content/webx/webb-divider-sm";

import WebbIcon from "../content/webx/webb-icon";
import GoogleAuth from "../content/auth/auth-google-firebase";


export default function Main () {

  const navigate = useNavigate()
  
  const metadata = {
    name: 'Welcome',
    banner: {link: 'https://img.freepik.com/free-vector/duotone-abstract-background_79603-324.jpg?w=690'}
  }

  return(

  <>
    <Helmet>
      <title>{metadata.name}{' • '}{process.env.REACT_APP_WEBB_SITE_NAME}{' • '}{process.env.REACT_APP_WEBB_SITE_LINE}</title>
      <link rel="canonical" href={process.env.REACT_APP_WEBB_SITE_LINK} />
    </Helmet>

    <ContentFormat 
      
      name = {metadata.name}
      header = {{ size: 'medium', show: false, data: 
      <>
        <WebbHeader data={{home: '/', name: metadata.name, link: '/'}}/>
      </>
      }}

      media = {{ size: 'xtra', show: false, data: 
      <>
        <div className="">

        </div>
      </>
      }}

      content = {{ size: 'xtra', show: true, data: 
      <>

        <div className="" 
          style={{
            backgroundImage:`url(${metadata.banner.link})`, 
            backgroundRepeat:'no-repeat', 
            backgroundSize:'cover',
            backgroundPosition: 'center center',
            height:'100vh',

          }}
        >
        
        <WebbDividerMedium />
        <WebbDividerMedium /> 
        <div className="container">
          <div className="row">
            <div className="col d-none d-lg-block"></div>
            <div className="col">
              {/* <video className="w-100 rounded-xd" width='100%' height={'auto'} loop autoPlay muted  >
                <source src={minilandmp4} type="video/mp4"/>
              </video> */}
              <div className="back-color-wite rounded-xd text-center px-3" 
                style={{minHeight:'60vh', backgroundColor: `rgba(0,0,0,.5)`}}>

                <WebbDividerMedium/>
                <WebbIcon data={{color: 'text-color-wite', size: 'text-icon-wd'}}/>
                
                <WebbDividerMedium/>
                <h2 className="text-color-rich">{process.env.REACT_APP_WEBB_SITE_NAME}</h2>
                {/* <p className="text-normal">{process.env.REACT_APP_WEBB_SITE_LINE}</p> */}
                <p className="text-normal text-color-wite m-0 mx-4">{'Diversify Your Investment Portfolio with Real Estate'}</p>
                

                <WebbDividerMedium/>
                <WebbDividerMedium/>

                <div className={`d-flex p-3 py-0 back-color-wite rounded-xd hitone mt-2 p-3 mx-3`}
                  style={{cursor:'pointer'}}
                  onClick={() => navigate('/auth')}
                >
                  <div className="py-2 mt-1">
                    <i className="bx bx-envelope text-color-main m-0 text-icon-sm"></i>
                  </div>
                  <div className="ps-2 py-2 mt-1">
                    <p className="m-0 mt-1">Login with Email</p>
                  </div>
                  <div className="ms-auto text-end py-2 mt-1">
                    <i className="bx bx-chevron-right text-color-tone m-0 text-icon-sm" ></i>
                  </div>
                </div>

                {/* add google login */}
                <div className="mx-3 mt-2">
                  <GoogleAuth />
                </div>
                
                <WebbDividerMedium /> 

              </div>
              <div className="text-center">
                <WebbDividerMedium /> 
                <a href={process.env.REACT_APP_WEBB_SITE_LINK} 
                  target={'_blank'} 
                  rel="noopener" 
                  className="text-color-wite"
                >Main Website</a>
                <WebbDividerMedium /> 
              </div>


            </div>
            <div className="col d-none d-lg-block"></div>
          </div>

        </div>

        </div>

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