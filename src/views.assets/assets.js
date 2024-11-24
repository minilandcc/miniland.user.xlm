// main
import { Helmet } from "react-helmet";

import ContentFormat from "../content/webz/content-format-xw";
import WebbHeader from "../content/webz/webb-header-xw";
import WebbFooterMobile from "../content/webz/webb-footer-mobile";

import WebbDividerMedium from "../content/webx/webb-divider-md";
import WebbDividerSmall from "../content/webx/webb-divider-sm";
import WebbLoaderSmall from "../content/webx/webb-loader-sm";

import AssetsListUserModule from "../content/assets/assets-list-user";
import AssetsListUserFundedModule from "../content/assets/assets-list-user-funded";

export default function Assets () {
  
  const metadata = {
    name: 'Assets',
    banner: {link: 'https://img.freepik.com/premium-vector/futuristic-vector-hexagon-wave-dark-cyberspace-abstract-wave-with-dots-line-white-moving-particles-background_744733-97.jpg?w=900'}
  }


  return(

  <>
    <Helmet>
      <title>{metadata.name}{' • '}{process.env.REACT_APP_WEBB_SITE_NAME}{' • '}{process.env.REACT_APP_WEBB_SITE_LINE}</title>
      <link rel="canonical" href={process.env.REACT_APP_WEBB_SITE_LINK} />
    </Helmet>

    <ContentFormat 
      
      name = {metadata.name}
      header = {{ size: 'medium', show: true, data: 
        <> 
          <WebbHeader data={{name: metadata.name, home: '/', link:''}} />     
        </> }}
      
      media = {{ size: 'fluid', show: true, data: <></> }}
      
      content = {{ size: 'medium', show: true, data: 
      <>
        <WebbDividerSmall />
        <AssetsListUserFundedModule />
        <AssetsListUserModule />

        <WebbDividerMedium />
        <WebbDividerMedium />
        <WebbDividerMedium />
        <WebbDividerMedium />
        <WebbDividerMedium />
        <WebbDividerMedium />
      </>
      }}
    
      footer = {{ size: 'medium', show: true, data: 
      <> 
        <div className="text-center back-color-lite">
          <WebbDividerSmall />
          <WebbFooterMobile /> 
        </div>
      </> }}
    
    ></ContentFormat>


  </>
  )
}