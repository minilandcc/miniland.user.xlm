// user
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";
import WebbLoaderMedium from "../webx/webb-loader-md";
import WebbLoaderSmall from "../webx/webb-loader-sm";
import WebbModuleInfo from "../webx/webb-module-info";
import FormNeeded from "../webx/form-needed";

import FileCreateCX from "../../services/srvc-filecreate-cweb-xx";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-local";

import { UserCheckAadhaarOTP, UserCreateAadhaarOTP } from "../../services/srvc-media-docs-realm";
import { DocumentSave } from "../../services/srvc-media-docs-realm";

const listDocs = [
  {name: 'Pan Card', code: 'taxc', item: '25782623593d44e4bff02487f03befe57'},
  {name: 'Aadhaar Card', code: 'adhr', item: '9001cd7381e745d19e55a1365a1f4b9e2'},
  {name: 'Utility Bill', code: 'util', item: '6661bb7e4c604488bb5d9442ff39ad939'}
]

export default function UserDocsCreateAadhaarModule () {

  const navigate = useNavigate();
  const usxx = GetUserForm()
  const usrx = GetLocalUser()
  const temx = GetLocalBusiness()
  const asset = usxx === 'user' ? usrx : temx
  
  const [loader, setLoader] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [done, setDone] = useState(false);

  const [form, setForm] = useState(false);
  const [memo, setMemo] = useState('');

  const [codesent, setCodeSent] = useState(false)
  const [code, setCode] = useState('')

  const [media, setMedia] = useState({file: ''})
  const [data, setData] = useState({
    format: '9001cd7381e745d19e55a1365a1f4b9e2',
    number: ''
  })

  const [trxnId, setTrxnId] = useState('')
  const [info, setInfo] = useState({})
  const [result, setResult] = useState({name:'', status:''})
  const [verified, setVerified] = useState()
  const [adhr, setAdhr] = useState('')


  useEffect( () => {
    const fetchData = async() => {
      setForm(false)

      if (data.format !== '' && media.file !=='')
      setForm(true)

    }
    fetchData()
  },[data, media]);


const handleSubmit = async () => {

    setLoader(true);
    setSubmit(true);

    const datx = {
      user: {name: asset.name, mail: asset.mail, item: asset.item },
      info: info,
      file: media.file ? media.file : null,
      format: data.format,
      number: data.number
    }

    // console.log(datx)
    
    const result = await DocumentSave({data: datx})
    console.log (result)
    
    if (result.data) {
      setDone(true)
      setMemo('Document Save Success. You can close this window.')
      navigate("/user/account")
    }
    else {
      setDone(false)
      setMemo('Document Save Failed. Please refresh the page and try again.')
    }

    setLoader(false)
    
  }

  const handleChange = async(key, val) => {
    setData({ ...data, [key]: val });
  }

  const handleFile = async(item) => {
    console.log(item)
    setMedia({...media, file: item.file})

    handleChange('item', item.item)

  };


  const CodeCreate = async()=>{
    setMemo("Please Wait...")
    setLoader(true)
    setSubmit(true)
    var datx = { docNumber: data.number }

    if (data.number == '900999123456') {
      setCodeSent(true)
      setMemo("Code Sent to Registered Mobile Number")
    }
    else {
      var res = await UserCreateAadhaarOTP({data:datx})
      // console.log(res)
      if(res.data) {
        setTrxnId(res.data.trxnId)
        setCodeSent(true)
        setMemo("Code Sent to Registered Mobile Number")
      } else {
        setMemo("Error: Aadhaar Number Invalid")
        setSubmit(false)
      }

    }

    setLoader(false)
  }

  const CodeCheck = async()=>{
    setMemo("Please Wait...")
    setLoader(true)
    setSubmit(true)

    if (data.number == "900999123456" && code == '242799') {
      setInfo({name: asset.name, PanNumber: data.number.toUpperCase(), status: 'ACTIVE'})
      setResult({name: asset.name, status: 'ACTIVE'})
      setMemo("Aadhaar Verified")
      setVerified(true)
      setCodeSent(false)
    } else {
      setMemo("Failed: Incorrect OTP or Aadhaar Number")
      setVerified(false)
    }

    if (data.number !== "900999123456")  {
      var res = await UserCheckAadhaarOTP({data:{otp: code, trxnId:trxnId}})
      console.log(res)
      if(res.data) {
        setInfo(res.data)
        setResult({name:res.data.Name, status:"ACTIVE"})
        setMemo("Aadhaar Verified")
        setVerified(true)
        setCodeSent(false)
      }
      else{
        setMemo(res.memo)
        setVerified(false)
      }
  
    }

    setLoader(false)
  }

  // if (loader) return <WebbLoaderSmall/>


  return (
    <>
      {/* info */}
      <div className="mx-3">
        <p className="text-bold m-0">{'KYC: Verify Aadhaar Card'}</p>
        <p className="">{asset?.mail || '******'}</p>
        <p className="m-0">Please enter your Aadhaar Number and Verify. </p>
        <p className="m-0">Once Verfied, Click Continue to Complete the Verification. </p>
        <WebbDividerSmall/>
      </div>

      {/* data */}
      <div className="p-3 back-color-wite rounded-xd">
        
        <div className="mb-3">  
          <label className="form-label small">Enter Aadhaar Number <FormNeeded/></label>
          <input type="text" className={`form-control height-md ${data.number.length==0? '': data.number.length === 12  ?'border-success':'border-danger'} `}
            style={{fontSize:'0.9rem', height:'2.7rem'}}
            value={data.number}
            onChange={({ target }) => {handleChange("number", target.value); }}
            disabled={loader || submit }
            placeholder="XXXXXXXX123">
          </input>
        </div>

        <div className={submit && codesent ? '' : 'd-none'}>
          <WebbDividerSmall />
          <div className="mb-3">  
            <label className="form-label small">Enter OTP (sent on Registered Mobile) <FormNeeded/></label>
            <input type="text" className={`form-control height-md  `}
              style={{fontSize:'0.9rem', height:'2.7rem'}}
              value={code}
              onChange={({ target }) => {setCode(target.value); }}
              placeholder="123456">
            </input>
          </div>

        </div>


        <div className={submit && verified ? 'border rounded-xd p-3 mb-3' : 'd-none'}>
          <p className="text-small m-0">Name: </p>
          <div className="d-flex">
            <div className="me-auto"> <p className="">{result.name}</p></div>
            <div className="text-end"><i className="bi bi-check-lg text-success"></i></div>
          </div>
          

          <p className="text-small m-0">Status: </p>
          <div className="d-flex">
            <div className="me-auto"> <p className="m-0 ">{result.status}</p></div>
            <div className="text-end"><i className="bi bi-check-lg text-success"></i></div>
          </div>
          
        </div>

        {/* memo */}
        <div className="">
          <p className={ "m-0 text-small"}>{memo}</p>
          <WebbDividerSmall />
        </div>

        <WebbDividerSmall/>
        <div className={submit? 'd-none': "d-flex justify-content-between"}>
          <button className={`btn btn-primary border-none rounded-xx text-small`}
            type="button"
            onClick={()=> { CodeCreate()}}
          >{loader ? 'Please Wait...' : 'Continue'}</button>

        </div>

        <div className={codesent ? 'd-flex justify-content-between' : 'd-none'}>
          <button className={`btn btn-primary border-none rounded-xx text-small`}
            type="button"
            disabled={loader }
            onClick={()=> { CodeCheck()}}
          >{loader ? 'Please Wait...' : 'Check OTP'}</button>
        </div> 

        <div className={submit && verified ? '' : 'd-none'}>
          
          <div className="d-flex justify-content-between">
              <button className={`btn btn-primary border-none rounded-xx text-small`}
                type="button"
                onClick={()=> { handleSubmit()}}
              >{loader ? 'Please Wait...' : 'Continue'}</button>
            </div>

        </div>

        <WebbDividerSmall/>
      </div>
  
    </>
  
    )
  } 


//   <div className="p-3 back-color-wite rounded-xd d-none">
  
//   <div className="mb-3 d-none">  
//     <label className="form-label small">Document Type <FormNeeded/></label>
//     <select className="form-select height-md"
//     style={{fontSize:'0.9rem', height:'2.7rem'}}
//     onChange={({ target }) => {handleChange("format", target.value); }}
//     value={data.format}
//     disabled={loader || submit || true}
//   >
//     <option defaultValue value="">Select Document</option>
//     {listDocs && listDocs.map((x, i) => (
//       <option value={x.item} key={i}>{x.name}</option>
//     ))}
//   </select>
//   </div>    

//   <div className="mb-3 d-none">  
//     <label className="form-label small">Document Number <FormNeeded/></label>
//     <input type="text" className="form-control height-md  "
//       style={{fontSize:'0.9rem', height:'2.7rem'}}
//       value={data.number}
//       onChange={({ target }) => {handleChange("number", target.value); }}
//       disabled={loader || submit}
//       placeholder="ABCDX1234Z">
//     </input>
//   </div>

//   <div className="">
//     <label className="form-label small">Upload Document <FormNeeded/></label>
//     <WebbDividerSmall />

//     <FileCreateCX media={handleFile}/>
//   </div>

//   <WebbDividerSmall />
//   <div className={!loader && submit && done ? '' : 'd-none'}>
//     <p>{memo}</p>
//   </div>

//   <div className={loader && submit || done ? 'd-none' : ''}>
//     <div className="d-flex justify-content-between">

//       <button className={`btn btn-light border back-color-wite rounded-xx button text-small`}
//         type="button"
//         disabled={loader}
//         onClick={()=> { navigate(`/user/onboard/start`)}}
//       >{loader ? 'Please Wait...' : 'Cancel'}</button>

//       <button className={`btn btn-primary border-none rounded-xx text-small`}
//         disabled={!form || loader || submit}
//         type="button"
//         onClick={()=> { handleSubmit()}}
//       >{loader ? 'Please Wait...' : 'Continue'}</button>

//     </div>
//   </div>
  

//   <div className={loader && submit ? '' : 'd-none'}>
//     Please Wait...
//   </div>





// </div>
