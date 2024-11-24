import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";
import WebbModuleInfo from "../webx/webb-module-info";
import WebbLoaderMedium from "../webx/webb-loader-md";
import WebbLoaderSmall from "../webx/webb-loader-sm";

import NextIntro from "../webx/next-intro";
import NextAccounts from "../webx/next-accounts";
import NextDivider from "../webx/next-divider";
import NextUser from "../webx/next-user";
import NextBusiness from "../webx/next-business";
import NextLogout from "../webx/next-logout";


import { UserAccountList } from "../../services/srvc-user-realm";

import { GetAuthUser, SetLocalUser, SetLocalBusiness } from '../../services/srvc-auth-local';
import { SetNewUser, SetNewBusiness } from '../../services/srvc-auth-local';


export default function AuthNextModule () {

  const asset = GetAuthUser();
  // console.log(asset) // asset.user = authenticated email

  const [onboard, setOnboard] = useState(false);
  const [user, setUser] = useState();
  const [loader,setLoader] = useState(true);

  const [gotoOnboarding, setGoToOnboarding] = useState(false)

  const navigate = useNavigate()

  const [list, setList] = useState()

  useEffect( () => {
    if (asset){
      const fetchData = async() => {
        setLoader(true);

        var result = {data: {user: '******'}}
        // user roles
        var user = []
        if (result.data) {
          setOnboard (true);
          user = await UserAccountList({ data: { user: asset.user } })
          // console.log(user)
         
        } else {
          setOnboard (false);
        }
        
        setUser(user.data.list)
        setLoader(false);

      }
      fetchData()
    } else {}
  },[]);


  const newUser = () => {
    SetNewUser({user:''})
    if (user) {
      SetNewUser({user:user[0].item})
      // console.log(user[0].item)
    }
    navigate(`/user/onboard`)
  }

  const newBusiness = () => {
    SetLocalUser(user[0]);
    SetNewBusiness({user: ''})
    navigate(`/team/onboard`)
  }

  const onboardUser = (usxx) => {

    if (usxx.role === 'user'){
      SetNewUser({user:usxx.item});
      console.log(usxx.item);
    }

    if (usxx.role === 'team'){
      SetLocalUser(user[0]);
      SetNewBusiness({user: usxx.item});
      console.log(usxx.item);
    }
    
    const base = usxx.role === 'user' ? `onboard` : `business`
    
    if (!usxx.onbd.obnm)  navigate(`/${base}/name`)
    else {
      if (!usxx.onbd.obcr) navigate(`/${base}/docs`)
      else {
        if (!usxx.onbd.obdc) navigate(`/${base}/docs`)
        else {
          if (!usxx.onbd.obcm) navigate(`/${base}/contact`)
          else {
            if (!usxx.onbd.oblc) navigate(`/${base}/location`)
            else {
              if (!usxx.onbd.obtr) navigate(`/${base}/terms`)
            }
          }
        }
      }
    }

  }

  const nextuseraction = (usxx) => {
    if (usxx.active) {
      usxx.role === 'user' 
        ? SetLocalUser (usxx)
        : SetLocalBusiness (usxx)
    }
    else onboardUser (usxx)
    console.log(usxx)
    console.log(onboard)

    if (usxx.role === 'user' && !onboard) {
      navigate (`/user/onboard/start`)
      return
    }
    if (usxx.role === 'user' && usxx.hold) {
      navigate (`/user/onboard/hold`)
      return
    }
    if (usxx.role === 'user') {
      navigate (`/user/home`)
      return
    }
    
    // if (usxx.form === 'user') {}
      // navigate (`${gotoOnboarding ? '/user/onboard/start':  `/${usxx.form}/onboard/launch`  } `) 
    
    
      // if (usxx.form === 'team') navigate (`/${usxx.form}/home`) 

  }

  if (loader) return <>
    <div className="text-center">
      <WebbDividerMedium />
      <WebbLoaderSmall />
    </div>
  </>
  
  // user does not exist or user was added contact or refer
  if (!(user && user[0].self)) {
    return (
      <>
        <div className="mx-3">
          <NextIntro stat={'new'} />
          <WebbDividerSmall />
          <div className="" onClick={() => { newUser(); }}>
            <NextUser/>
          </div>

          {/* create a new user here and then onboard */}
          <WebbDividerSmall />
          {/* <NextDivider /> */}
          <NextLogout />
        </div>

      </>
    )
  }

  // // user has incomplete onboarding steps
  // if (!(user && user[0].onbx)) {
  //   return (
  //     <>
  //       <WebbDividerSmall />
  //       <NextIntro stat={'incomplete'} />
  //       <WebbDividerMedium />
  //       <div className="text-center">
  //         <button onClick={async ()=> { onboardUser(user[0]) }} 
  //           className="btn btn-primary back-color-next border-none rounded-pill px-3">
  //           <small>Update Account</small>
  //         </button>
  //       </div>
  //       <WebbDividerSmall />
  //       <NextDivider />
  //       <NextLogout />
  //     </>
  //   )
  // }

  // if (!(user && user[0].actv)) {
  //   return (
  //     <>
  //       <WebbDividerSmall />
  //       <NextIntro stat={'review'} />
  //       <WebbDividerSmall />
  //       <NextDivider />
  //       <NextLogout />
  //     </>
  //   )
  // }


  // if ((user && user[0].hold)) {
  //   return (
  //     <>
  //       <div className="mx-3">
  //       <NextIntro stat={'hold'} />
  //       <WebbDividerSmall />
  //       <NextDivider />
        
  //       <NextLogout />
  //       </div>

        
  //     </>
  //   )
  // }
  
  
  return (
    <>
    {/* info  */}
    <div className="mx-3">
      <p className="text-bold text-small m-0">Select Account to continue</p>
    </div>
    <WebbDividerSmall />

    {/* personal */}
    <NextAccounts 
      data={user.filter(item => item.role==='user')}
      role={'Personal'}
      user={nextuseraction}
    />
    
    <WebbDividerMedium />
    {/* business */}
    <NextAccounts
      data={user.filter(item => item.role==='team')} 
      role={'Team'}
      user={nextuseraction}
    />

    {/* actions */}
    {/* <WebbDividerSmall />
    <NextDivider />
    <div className="" onClick={() => { newBusiness(); }}>
      <NextBusiness/>
    </div> */}

    <WebbDividerMedium />
    <div className="mx-3">
      <NextLogout />
    </div>

    
  </>
  )
  
}