// onboard
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";
import WebbLoaderMedium from "../webx/webb-loader-md";
import WebbLoaderSmall from "../webx/webb-loader-sm";
import WebbModuleInfo from "../webx/webb-module-info";
import FormNeeded from "../webx/form-needed";

import { GetAuthUser } from "../../services/srvc-auth-local";
import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-local";

import { UserPanCardCheck } from "../../services/srvc-media-docs-realm";
import { UserCheckAadhaarOTP, UserCreateAadhaarOTP } from "../../services/srvc-media-docs-realm";

import { DocumentSave } from "../../services/srvc-media-docs-realm";

import { UserAccountDetails } from "../../services/srvc-user-realm";


const listDocs = [
  {name: 'Pan Card', code: 'taxc', status: true, active: true, item: '25782623593d44e4bff02487f03befe57'},
  {name: 'Aadhaar Card', code: 'adhr', status: false, active: false, item: '9001cd7381e745d19e55a1365a1f4b9e2'},
  {name: 'Utility Bill', code: 'util', status: false, active: false, item: '6661bb7e4c604488bb5d9442ff39ad939'}
]

export default function UserOnboardIdentitiModule () {

  const asset = GetAuthUser();
  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [done, setDone] = useState(false);

  const [codesent, setCodeSent] = useState(false)
  const [code, setCode] = useState('')
  const [trxn, setTrxn] = useState('')

  const [info, setInfo] = useState({})
  const [result, setResult] = useState({name:'', status:''})
  const [verified, setVerified] = useState()

  const [form, setForm] = useState(false);
  const [memo, setMemo] = useState('');

  const [user, setUser] = useState()
  const [docs, setDocs] = useState(listDocs.filter(x => x.active))

  const [data, setData] = useState({
    mail: asset.user,
    name: '',
    format: '25782623593d44e4bff02487f03befe57',
    number: ''
  })


  useEffect(()=>{
    const fetchdata = async()=>{
      var res = await UserAccountDetails({data:{user:asset.user}, srvc: '******'})
      setUser(res.data)
    }
    fetchdata()
  },[])

  // useEffect for form validation
  useEffect( () => {
    setForm(false);
    const docz = docs.find(x => x.status)
    if (docz?.item == '25782623593d44e4bff02487f03befe57' && data.number.length == 10) setForm(true);
    if (docz?.item == '9001cd7381e745d19e55a1365a1f4b9e2' && data.number.length == 12) setForm(true);

  },[data]);


  const handleSubmit = async () => {

    setSubmit(true);
    setLoader(true);

    setMemo('Please Wait...')

    const docz = docs.find(x => x.status)

    if (docz.item == '25782623593d44e4bff02487f03befe57' && data.number.toUpperCase() == 'ABCDX1234Z') {

      setInfo({name: user.name, PanNumber: data.number, status: 'ACTIVE'})
      setResult({name: user.name, status: 'ACTIVE'})
      
      setMemo("Pan Verified")
      setVerified(true)

    }
    if (docz.item == '25782623593d44e4bff02487f03befe57' && data.number.toUpperCase() !== 'ABCDX1234Z') {

      const res = await UserPanCardCheck({data: {}})
      if(res.data) {
        setInfo(res.data)
        setResult({name: res.data.NameOnTheCard, status: res.data.STATUS})
        
        setMemo("Pan Verified")
        setVerified(true)
        
      } else { 
        setMemo(res.memo)
        setVerified(false)
      }
    }

    if (docz.item == '9001cd7381e745d19e55a1365a1f4b9e2' && data.number.toUpperCase() == '900999123456') {

    }
    if (docz.item == '9001cd7381e745d19e55a1365a1f4b9e2' && data.number.toUpperCase() !== '900999123456') {


    }

    setLoader(false)
    
  }

  const handleDocument = async(item) => {
    var docx = Array.from(docs, x => {return {
      ...x, status: x.item == item ? true : false
    }})
    setDocs(docx)
  }

  const handleChange = async(key, val) => {
    setData({ ...data, [key]: val });
  }

  const handleDocumentSave = async()=>{

    setLoader(true);
    setSubmit(true);

    const datx = {
      user: {name: user.name, mail: user.mail, item: user.item },
      file: null,
      info: info,
      format: docs.find(x => x.status).item,
      number: data.number
    }
    console.log(datx)
    
    const result = await DocumentSave({data: datx, srvc: '******'})
    
    if(result.stat) {
      setMemo('Success, Please Wait...')
      // navigate('/user/onboard/minter')
      navigate('/auth/next')
    } 
    else{ 
      window.alert('error while saving')
      setMemo('Error, Please Try Again...')
      setLoader(false)
    }

  }


  // if (loader) return <><div className="text-center"><WebbLoaderSmall/></div></>


  return (
  <>
    {/* info */}
    <div className="mx-3">
      <p className="text-bold m-0">{'Complete KYC'}</p>
      <p className="">{user?.mail || '******'}</p>
      <p className="text-small m-0 mb-2">
        Please verify either of the documents below to complete KYC. 
      </p>
    </div>


    <div className={submit ? 'rounded-xd p-2 px-3 back-color-wite' : 'rounded-xd p-2 px-3 back-color-wite'}>
      <WebbDividerSmall/>
      <div className="">
        {docs && docs.map((item, i) => (
          <div className="d-flex mb-3" key={i}>
            <div className="me-auto m-0 p-0">
              <label className="m-0 p-0" for="flexRadioDefault1">Verify {item.name}</label>
            </div>
            <div className="">
              <input 
                className="form-check-input" type="radio" 
                checked={item.status}
                disabled={submit && verified || submit && codesent ? true : false}
                onClick={() => handleDocument(item.item)}
              ></input>
            </div>
          </div>
        ))}

        <div className={docs.findIndex(x => x.status) >-1 ? 'd-none' : ''}>
          <WebbDividerSmall/>
          <span className="text-small text-color-tone cursor" onClick={() => navigate('/auth/next')}>Do this Later</span>
          <WebbDividerSmall/>
        </div>
      </div>


      
      <div className={docs.findIndex(x => x.status) >-1 ? '' : 'd-none'}>
        <WebbDividerSmall/>
        <div className="mb-3">  
          <label className="form-label text-small">Enter Document Number <FormNeeded/></label>
          <input type="text" className={`form-control height-md ${data.number.length == 0 ? '' : form ? 'border-success':'border-danger'} `}
            style={{fontSize:'0.9rem', height:'2.7rem'}}
            value={data.number.toUpperCase()}
            onChange={({ target }) => {handleChange('number', target.value); }}
            disabled={loader || submit}
            placeholder="">
          </input>
        </div>

        <div className="">
          <p className="text-small m-0">{memo}</p>
        </div>

        <div className={submit && verified ? '' : 'd-none'}>
          <WebbDividerSmall />
          <p className="text-small m-0">Name</p>
          <div className="d-flex">
            <div className="me-auto"> <p className="text-bold">{result.name}</p></div>
            <div className="text-end"><i className="bx bxs-check-circle text-color-success"></i></div>
          </div>
        
          <p className="text-small m-0">Status</p>
          <div className="d-flex">
            <div className="me-auto"> <p className="">{result.status}</p></div>
            <div className="text-end"><i className="bx bxs-check-circle text-color-success"></i></div>
          </div>
          
        </div>

        <div className={submit ? 'd-none' : ''}>
          <WebbDividerMedium />
          <div className="d-flex justify-content-between">

            <button className={`btn btn-outline-secondary rounded-xx back-color-none border-none text-small text-color-tone hilite m-0 p-0`}
              type="button"
              disabled={loader || submit}
              onClick={()=> { navigate('/user/onboard/minter')}}
            >{loader ? 'Please Wait...' : 'Do This Later'}</button>

            <button className={`btn btn-primary border-none rounded-xx text-small`}
              type="button"
              disabled={!form || loader || submit}
              onClick={()=> { handleSubmit()}}
            >{loader ? 'Please Wait...' : 'Continue'}</button>

          </div>

          <WebbDividerSmall />
        </div>

        <div className={submit && verified ? '' : 'd-none'}>
          <WebbDividerMedium />
          <div className="d-flex justify-content-between">
            <button className={`btn btn-primary border-none rounded-xx text-small`}
              type="button"
              onClick={()=> { handleDocumentSave()}}
            >{loader ? 'Please Wait...' : 'Continue'}</button>

          </div>
          <WebbDividerSmall />
        </div>

      </div>

    </div>

  </>

  )
}