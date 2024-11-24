// main
import { Helmet } from "react-helmet";

import ContentFormat from "../content/webz/content-format-xx";
import WebbHeader from "../content/webz/webb-header-xx";

import WebbDividerMedium from "../content/webx/webb-divider-md";
import WebbDividerSmall from "../content/webx/webb-divider-sm";

import AccountsCreateVirtualModule from "../content/accounts/accounts-create-virtual";


export default function AcccountsVirtualCreate () {
  
  const metadata = {
    name: 'Accounts',
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
      header = {{ size: 'small', visible: true, data: 
        <> 
          <WebbHeader data={{name: metadata.name, home: '/', link:'account'}} /> 
        </> }}

      media = {{ size: 'medium', data: <></> }}

      content = {{ size: 'small', data: 
      <>
        <WebbDividerSmall />
        <AccountsCreateVirtualModule />
        
        <WebbDividerMedium />
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
      </> }}
    
    ></ContentFormat>


  </>
  )
}