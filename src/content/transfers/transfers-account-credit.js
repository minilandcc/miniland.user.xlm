// transfers
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NumberFormat } from "../../services/srvc-utilities";

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";
import WebbLoaderMedium from "../webx/webb-loader-md";
import WebbLoaderSmall from "../webx/webb-loader-sm";
import WebbModuleInfo from "../webx/webb-module-info";
import FormNeeded from "../webx/form-needed";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-local";

import { AccountsBaseBalance } from "../../services/srvc-accounts-realm";
import { AccountsTransitDetails } from "../../services/srvc-accounts-realm";

import { AccountsList } from "../../services/srvc-accounts-realm";
import { TransfersAccountCredit } from "../../services/srvc-transfers-funds-realm";
// import { TransfersAccountCredit } from "../../services/srvc-transfers-realm";



export default function TransfersAccountCreditModule () {

  const usxx = GetUserForm()
  const usrx = GetLocalUser()
  const temx = GetLocalBusiness()
  const asset = usxx === 'user' ? usrx : temx

  const navigate = useNavigate();
  
  const [loader, setLoader] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [done, setDone] = useState(false);

  const [form, setForm] = useState(false);
  const [memo, setMemo] = useState('');

  const [balance, setBalance] = useState({number: '0', ticker: '******'})
  const [account, setAccount] = useState()
  const [transit, setTransit] = useState()
  const [link, setLink] = useState('')
  const [wait, setWait] = useState(false)

  const [data, setData] = useState({
    amount: ''
  })

  useEffect( () => {
    if (asset){
      const fetchData = async() => {
        setLoader(true);
        const result = await AccountsBaseBalance({data: {user: asset.item}, srvc: '******'})
        // console.log(result)
        if (result.stat) {
          setBalance(result.data.balance)
          setAccount(result.data.account)
        }

        const transitx = await AccountsTransitDetails({data: {user: asset.item}, srvc: '******'})
        // console.log (transitx)
        if (transitx.stat) setTransit(transitx.data)

        setLoader(false);
      }
      fetchData()
    } else {}
  },[]);


  // useEffect for form validation
  useEffect( () => {
    setForm(false);
    if (data.amount > 0) setForm(true);

  },[data]);


  const handleSubmit = async () => {

    setWait(true);
    setSubmit(true);

    var datx =  {
      credit: { name: asset.name,  mail: asset.mail, item: asset.item },
      debit: { name:asset.name, mail:asset.mail, item : asset.item },
      sale: { number: data.amount },
      mode:'stripe',
      meta: { name: "account.credit", memo: `account.credit.${data.amount}.miniland` }
    }

    const result = await TransfersAccountCredit({data: datx})
    console.log (result)
    
    if (result.data) {
      setDone(true)
      setMemo('Transfer Link Created.')
      setLink(result.data.link)
    }
    else {
      setDone(false)
      setSubmit(false)
      setMemo('Transfer Failed.')
    }

    setWait(false)    
  }

  const handleChange = async(key, val) => {
    setData({ ...data, [key]: val });
  }

  if (loader) return <>
    Please Wait...
  </>


  return (
  <>
    {/* info */}
    <div className="mx-3">
      <p className="text-bold m-0">{'Account Topup'}</p>
      <p className="">{asset?.mail || '******'}</p>
      
    </div>

    <div className="back-color-wite rounded-xd p-3 border">
      <div className="d-flex">
        <div className="">
          <p className="text-small m-0">Account Balance</p>
          
          <p className="m-0">
            <span className="text-bold text-lead">{NumberFormat((balance?.number/1000000 || 0), '', '2')}</span>
            <span className="text-small ms-1">{'INR'}</span>
          </p>
          <p className="m-0">A/C: {account?.number || '******'}</p>
        </div>
        <div className=""></div>
      </div>

      <WebbDividerMedium/>

      <div className="">
        <p className="text-bold">Option 1: To Recharge via Bank Transfer, Please use Netbanking and transfer funds via NEFT to following account</p>
        <p className="text-normal m-0">Ac Number: {transit?.account?.number}</p>
        <p className="text-normal m-0">Bank Name: {transit?.bank?.name}</p>
        <p className="text-normal m-0">Branch IFSC Code: {transit?.bank?.code}</p>

        <WebbDividerMedium/>
        <div className="border-bottom"></div>
        <WebbDividerMedium/>

        <p className="text-bold m-0">Option 2: Recharge via UPI</p>
        <p className="m-0">Coming Soon</p>

        <WebbDividerMedium/>
        <div className="border-bottom"></div>
        <WebbDividerMedium/>

        <p className="text-bold m-0">Option 3: Recharge Credit & Debit Card</p>
        <p className="m-0">Coming Soon</p>
        <p className="text-bold d-none">Option 2: To Recharge via Credit Card, Enter Amount and Generate Payment Link</p>
        <div className="mb-3 d-none">  
          <label className="form-label text-small">Enter Amount <FormNeeded/></label>
          <input type="text" className="form-control height-md"
            style={{fontSize:'0.9rem', height:'2.7rem'}}
            value={data.amount}
            disabled={loader || submit}
            onChange={({ target }) => {handleChange("amount", target.value); }}
            placeholder="">
          </input>
        </div>

        <div className={wait ? 'd-none':'d-none'}>
        <p className="text-dark text-center">Please Wait......<br/> We are processing your request.</p>
        </div>

        <div className={submit && done ? 'd-none': 'd-none'}>
          <WebbDividerMedium/>
          <div className="d-flex justify-content-between">

            <button className={`btn btn-light border rounded-xx text-small`}
              type="button"
              disabled={loader || submit}
              onClick={()=> { navigate(`/${usxx}/home`)}}
            >{loader ? 'Please Wait...' : 'Cancel'}</button>

            <button className={`btn btn-primary border-none rounded-xx text-small`}
              type="button"
              disabled={!form || loader || submit}
              onClick={()=> { handleSubmit()}}
            >{loader ? 'Please Wait...' : 'Submit'}</button>

          </div>
        </div>

      
      </div>

      <WebbDividerMedium />

      
      
      <div className="" >
      <div className={!loader && submit && done ? '' : 'd-none'}>
        <div className="d-flex">
          <div className="me-auto"> <p className="">{memo}</p></div>
          <div className="text-end"> <button className="btn rounded-xx cursor text-small btn-primary " style={{width:'auto'}} onClick={()=>window.open(link)} >Click To pay</button></div>
        </div>        
        <p className="cursor text-color-blue m-0" onClick={() => window.location.reload()}>Make Another Transfer</p>
      </div>
      </div>    

    </div>



  </>

  )
}