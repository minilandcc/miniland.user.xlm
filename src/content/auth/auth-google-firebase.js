import React from 'react'
import {auth, provider } from '../../services/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import { SetAuthUser } from '../../services/srvc-auth-local'
import googlelogo from '../../data.media/google-icon.png'


const GoogleAuth = () => {

    const [mail,setMail] = useState()

    const navigate=useNavigate()

    const handleClick = async()=>{
        signInWithPopup(auth, provider).then((data)=>{
            console.log(data)
            setMail(data.user.email)
            // window.localStorage.setItem('authmail', data.user.email  );
            SetAuthUser({user: data.user.email})
            navigate('/auth/next')
        })
        
    }



  return (
    <div>
      <div className={`d-flex p-2 px-3 back-color-wite rounded-xd hitone cursor`}
        onClick={()=>handleClick()}
      >
        
        <div className="align-middle mt-1">
          <img style={{width:'20px', height:'20px'}} src={googlelogo} />
        </div>

        <div className="ms-2">
          <p className="m-0 p-0 mt-1">Login with Google</p>
        </div>
              
        <div className="ms-auto text-end">
          <i className="bx bx-chevron-right text-color-tone m-0 text-icon-sm" ></i>
        </div>
      </div>

    </div>
  )
}

export default GoogleAuth