// transfers
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";
import WebbLoaderMedium from "../webx/webb-loader-md";
import WebbLoaderSmall from "../webx/webb-loader-sm";

import WebbModuleInfo from "../webx/webb-module-info";
import FormNeeded from "../webx/form-needed";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-local";

import { AccountsBankCreate } from "../../services/srvc-accounts-realm";


export default function AccountsBankCreateModule () {

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

  const [data, setData] = useState({
    name: asset.name,
    bank: '',
    numbera: '',
    numberb: '',
    code: '',
    ticker: 'inr',
    mode: 'sandbox',
    default: false,
    active: true
  })

  useEffect( () => {
    const fetchData = async() => {
      setForm(false)

      if (data.number !== '' && data.code !== '')
      setForm(true)

    }
    fetchData()
  },[data]);


  const handleSubmit = async () => {

    setLoader(true);
    setSubmit(true);

    const datx = {
      user: {name: asset.name, mail: asset.mail, mmid: data.mmid, item: asset.item},
      account: {name: 'Settle Account', number: data.numbera, secret: '******'},
      bank: {name: data.code, code: data.code},
    }
    const result = await AccountsBankCreate({data: datx})
    console.log (result)
    
    if (result.data) {
      setDone(true)
      setMemo('Account Created.')
      navigate("/user/account")
    }
    else {
      setDone(false)
      setMemo('Account Creation Failed.')
    }

    setLoader(false)
    
  }

  const handleChange = async(key, val) => {
    setData({ ...data, [key]: val });
  }


  // if (loader) return <></>


  return (
  <>
    
    {/* info */}
    <div className="mx-3">
      <p className="text-bold m-0">{'Link Your Bank Account'}</p>
      <p className="">{asset?.mail || '******'}</p>
      <p className="">
        All Transfers (Direct, Automated) will be settled to this account.
        Please ensure this account is correct. Incorrect details may lead to loss of funds.
      </p>
    </div>    

    {/* data */}
    <WebbDividerSmall />
    <div className="p-3 back-color-wite rounded-xd">

      <div className="mb-3 d-none">  
        <label className="form-label small">Account Name / Nickname <FormNeeded/></label>
        <input type="text" className="form-control height-md  "
          style={{fontSize:'0.9rem', height:'2.7rem'}}
          value={data.name}
          onChange={({ target }) => {handleChange("name", target.value); }}
          disabled={true}
          placeholder="account name">
        </input>
      </div>   

      <div className="mb-3 d-none">  
        <label className="form-label text-small">Bank Name  <FormNeeded/></label>
        <input type="text" className="form-control height-md  "
          style={{fontSize:'0.9rem', height:'2.7rem'}}
          value={data.bank}
          onChange={({ target }) => {handleChange("bank", target.value); }}
          placeholder="account name">
        </input>
      </div> 

      <div className="mb-3">  
        <label className="form-label text-small">Enter Account Number <FormNeeded/></label>
        <input type="password" className="form-control height-md  "
          style={{fontSize:'0.9rem', height:'2.7rem'}}
          value={data.numbera}
          onChange={({ target }) => {handleChange("numbera", target.value); }}
          disabled={loader || submit}
          placeholder="9900000000000123">
        </input>
      </div>

      <div className="mb-3">  
        <label className="form-label text-small">Re-enter Account Number <FormNeeded/></label>
        <input type="text" className="form-control height-md  "
          style={{fontSize:'0.9rem', height:'2.7rem'}}
          value={data.numberb}
          onChange={({ target }) => {handleChange("numberb", target.value); }}
          disabled={loader || submit}
          placeholder="9900000000000123">
        </input>
        <div className={'text-small mt-1'}>
          {
            data.numbera && data.numberb 
              ? data.numbera === data.numberb ? 'Account Number Matched' : 'Account Number Not Matched' 
              : 'Please Enter Account Number'
          }
        </div>
      </div>      
      
      <WebbDividerSmall />
      <div className="mb-3 ">  
        <label className="form-label text-small">IFSC (Branch) Code <FormNeeded/></label>
        <input type="text" className="form-control height-md  "
          style={{fontSize:'0.9rem', height:'2.7rem'}}
          value={data.code}
          onChange={({ target }) => {handleChange("code", target.value); }}
          disabled={loader || submit}
          placeholder="ABCX1234567">
        </input>
      </div>


      <WebbDividerMedium />
      <div className={!loader && submit && done ? '' : 'd-none'}>
        <p>{memo}</p>
      </div>

      
      <div className={loader && submit || done ? 'd-none' : ''}>
        <div className="d-flex justify-content-between">

          <button className={`btn btn-light border back-color-wite rounded-xx text-small`}
            type="button"
            onClick={()=> { navigate(`/${asset.role}/home`)}}
          >{loader ? 'Please Wait...' : 'Cancel'}</button>

          <button className={`btn btn-primary border-none rounded-xx text-small`}
            disabled={!form || loader || submit}
            type="button"
            onClick={()=> { handleSubmit()}}
          >{loader ? 'Please Wait...' : 'Continue'}</button>

        </div>
      </div>
    

      <div className={loader && submit ? '' : 'd-none'}>
        Please Wait...
      </div>

    <WebbDividerSmall />
    </div>

  </>

  )
}