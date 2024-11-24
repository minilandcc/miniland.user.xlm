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

import { AccountsBaseCreate } from "../../services/srvc-accounts-realm";


export default function AccountsBaseCreateModule () {

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
    name: asset?.name || '******',
    mail: asset?.mail || '******',
    mmid: asset?.mobile || '******',
    item: asset?.item || '******',
    ticker: 'inr',
    mode: 'sandbox',
    default: false,
    active: true
  })

  
  const handleSubmit = async () => {

    setLoader(true);
    setSubmit(true);

    const datx = {
      user: {name: asset.name, mail: asset.mail, mmid: data.mmid, item: asset.item},
      account: {name: '******', number: '******', secret: '******'},
      bank: {name: data.code, code: data.code},
    }

    console.log(datx)

    const result = await AccountsBaseCreate({data: datx})
    console.log (result)
    
    if (result.data) {
      setMemo('Account Created.')
      navigate("/user/account")
    }
    else {
      setMemo('Account Creation Failed.')
    }
    setDone(true)
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
      <p className="text-bold m-0">{'Create Your Miniland Account'}</p>
      <p className="">{asset?.mail || '******'}</p>
      <p className="">
        All Transfers to projects, assets and returns will be via this account.
        You can add credit and withdraw from this account to your external bank account.
      </p>
    </div>

    {/* data */}
    <WebbDividerSmall/>
    <div className="p-3 back-color-wite rounded-xd border">

      <div className="mb-3">  
        <label className="form-label small">User Name <FormNeeded/></label>
        <input type="text" className="form-control height-md  "
          style={{fontSize:'0.9rem', height:'2.7rem'}}
          value={data.name}
          onChange={({ target }) => {handleChange("name", target.value); }}
          disabled={true}
          placeholder="account name">
        </input>
      </div>    

      <div className="mb-3">  
        <label className="form-label small">Email <FormNeeded/></label>
        <input type="text" className="form-control height-md  "
          style={{fontSize:'0.9rem', height:'2.7rem'}}
          value={data.mail}
          onChange={({ target }) => {handleChange("account", target.value); }}
          disabled={data.mail}
          placeholder="9900000000000123">
        </input>
      </div>

      <div className="mb-3">  
        <label className="form-label small">Mobile <FormNeeded/></label>
        <input type="text" className="form-control height-md  "
          style={{fontSize:'0.9rem', height:'2.7rem'}}
          value={data.mmid}
          onChange={({ target }) => {handleChange("mmid", target.value); }}
          disabled={data?.mmid || loader || submit}
          placeholder="99XXXXXXXX">
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
            disabled={data.mmid.length!= 10}
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