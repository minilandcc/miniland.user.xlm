// main
import { Helmet } from "react-helmet";

import ContentFormat from "../content/webz/content-format-xx";
import WebbHeader from "../content/webz/webb-header-xx";
import WebbFooterMobile from "../content/webz/webb-footer-mobile";

import WebbDividerMedium from "../content/webx/webb-divider-md";
import WebbDividerSmall from "../content/webx/webb-divider-sm";

import TransfersAccountCreditModule from "../content/transfers/transfers-account-credit";
import TransfersBaseAccountCreditModule from "../content/transfers/transfers-account-credit-base";

export default function TransfersAccountCredit () {
  
  const metadata = {
    name: 'Account Credit',
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
      header = {{ size: 'small', show: true, data: 
        <> 
          <WebbHeader data={{name: metadata.name, home: '/', link:'home'}} /> 
          
        </> }}

      media = {{ size: 'fluid', show: false, data: <></> }}

      content = {{ size: 'small', show: true, data: 
      <>
        <WebbDividerSmall />
        {/* <TransfersAccountCreditModule /> */}
        <TransfersBaseAccountCreditModule />

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