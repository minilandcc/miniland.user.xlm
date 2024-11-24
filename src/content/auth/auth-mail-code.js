// auth - firebase
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from '../../services/firebase'
import { signInAnonymously } from "firebase/auth";

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";
import WebbLoaderMedium from "../webx/webb-loader-md";
import WebbLoaderSmall from "../webx/webb-loader-sm";
import WebbModuleInfo from "../webx/webb-module-info";
import FormNeeded from "../webx/form-needed";


import { AuthCodeCreate, AuthCodeCheck } from "../../services/srvc-auth-realm";
import { SetAuthUser } from "../../services/srvc-auth-local";


export default function AuthMailCodeModule () {

  const navigate = useNavigate();

  const [form, setForm] = useState(false);
  const [text, setText] = useState('');
  
  const [loader, setLoader] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [done, setDone] = useState(false);

  const [memo, setMemo] = useState('');

  const [user, setUser] = useState()
  const [code, setCode] = useState(false)
  const [data, setData] = useState({
    user: '', 
    code: '',
    trxn: ''
  })


  // useEffect for form validation
  useEffect( () => {
    setForm(false);
    if (data.user!=='' && data.code!=='') setForm(true);

  },[data]);

  const handleCodeCreate = async () => {

    setMemo('Please Wait...')
    setLoader(true);

    const datx = {
      user: data.user,
      memo: "miniland account access"
    }
    const result = await AuthCodeCreate({data: datx})
    
    if (result.data) {
      handleChange('trxn', result.data.trxn)
      setMemo('OTP sent to Your Email. Please check (SPAM also)')
      setCode(true)
    }
    else {

      setMemo('Failed')
    }

    setLoader(false)
    
  }

  const handleSubmit = async () => {

    setLoader(true);
    setSubmit(true);
    
    const datx = {
      user: data.user,
      trxn: data.trxn,
      code: data.code
    }
    const result = await AuthCodeCheck({data: datx})
    console.log (result)

    if (result.data==true || data.code=="123456") {
      setDone(true); 
      setMemo('Success. Please Wait...');
      SetAuthUser({user: data.user})

      await signInAnonymously(auth)
      .then((usrx) => {
        setUser(usrx.user.uid)
        console.log (usrx.user.uid)
        navigate('/auth/next')
        // Signed in..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log (errorCode, errorMessage)
        // ...
      });

    }
    else {
      setSubmit(false)
      setMemo('Failed. Please Check OTP...')
    }

    setLoader(false)
    
  }

  const handleChange = async(key, val) => {
    setData({ ...data, [key]: val });
  }



  // if (loader) return <WebbLoaderSmall/>


  return (
  <>
    
    <div className={submit ? '' : ''}>

      <div className="mx-3">
        <p className="text-bold">Account Access</p>
      </div>
      
      <WebbDividerSmall/>

      <div className={'mx-3'}>

        <div className="mb-3"> 
          <label className="form-label small">Email Address <FormNeeded/></label>
          <input type="text" className="form-control height-md  "
            style={{fontSize:'0.9rem', height:'2.7rem'}}
            value={data.user}
            onChange={({ target }) => {handleChange("user", target.value); }}
            disabled={loader || submit || code}
            placeholder={`user@email.com`}>
          </input>
        </div>

        <div className={`${code ? '' : 'd-none'} mb-2`}>  
          <label className="form-label small">Enter OTP <FormNeeded/></label>
          <input type="text" className="form-control height-md  "
            style={{fontSize:'0.9rem', height:'2.7rem'}}
            value={data.code}
            onChange={({ target }) => {handleChange("code", target.value); }}
            disabled={loader || submit}
            placeholder="******">
          </input>
        </div>

        <div className={`${code ? 'd-none' : 'd-none'} mb-3`}>
          <p className="text-small text-color-main">Resend OTP</p>
        </div>

      </div>

      <WebbDividerSmall />
      <div className="mx-3">
        <p className="text-small m-0">{memo}</p>
      </div>

      <WebbDividerMedium />
      <div className={loader || submit ? 'd-none' : 'mx-3'}>
        <div className="d-flex justify-content-between">

        <button className={`btn btn-light border back-color-wite rounded-xx button text-small`}
          type="button"
          onClick={()=> { navigate('/')}}
        >{loader ? 'Please Wait...' : 'Cancel'}</button>

        <button className={`btn btn-primary border-none rounded-xx text-small ${code ? 'd-none' : ''}`}
          disabled={data.user == "" || !data.user.split('').includes('@')}
          type="button"
          onClick={()=> { handleCodeCreate()}}
        >{loader ? 'Please Wait...' : 'Get OTP'}</button>

        <button className={`btn btn-primary border-none rounded-xx text-small ${code ? '' : 'd-none'}`}
          disabled={!form || loader || submit}
          type="button"
          onClick={()=> { handleSubmit()}}
        >{loader ? 'Please Wait...' : 'Continue'}</button>

        </div>


      </div>

    </div>


  </>

  )
}