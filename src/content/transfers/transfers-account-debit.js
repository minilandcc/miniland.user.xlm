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
import { TransfersAccountDebit } from "../../services/srvc-transfers-funds-realm";
// import { TransfersAccountDebit } from "../../services/srvc-transfers-realm";


export default function TransfersAccountDebitModule () {

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

  const [checkoutstatus, setCheckoutStatus] = useState(false);

  const [data, setData] = useState({
    amount: '',
    memo: 'account withdraw'
  })


  useEffect( () => {
    if (asset){
      const fetchData = async() => {
        setLoader(true);
        const result = await AccountsBaseBalance({data: {user: asset.item}})
        // console.log(result)
        if (result.stat) {
          setBalance(result.data.balance)
          setAccount(result.data.account)
        }

        setLoader(false);
      }
      fetchData()
    } else {}
  },[]);


  // useEffect for form validation
  useEffect( () => {
    setForm(false);
    if (parseInt(balance.number) > 0 && parseInt(data.amount) > 0 && parseInt(data.amount) <= parseInt((balance?.number || 0)/1000000) )
      {setForm(true); setMemo('')}
    else {
      setForm(false);
      setMemo('Check Withdrawal Limits')
    }
    if (data.amount == 0) setMemo('')
  },[data.amount, balance.number]);

  useEffect( () => {
    if (asset){
      const fetchData = async() => {

        if (parseInt(balance?.number) <= 0) {setCheckoutStatus(false)}
        
        if (balance.number < parseInt(data?.amount || 0)) setCheckoutStatus(false)
        if (balance.number > parseInt(data?.amount || 0)) setCheckoutStatus(true)
        
      }
      fetchData()
    } else {}
  },[balance, data.amount]);  

  const handleSubmit = async () => {

    setMemo('Please Wait...')
    setLoader(true);
    setSubmit(true);
    var datx =  {
      credit: { name: asset.name,  mail: asset.mail, item: asset.item },
      debit: { name:asset.name, mail:asset.mail, item : asset.item },
      sale: { number: data.amount },
      meta: { name: "account.debit", memo: `account.debit.${data.amount}.miniland` }
    }

    const result = await TransfersAccountDebit({data:datx})
    //console.log (result)
    
    if (result.data) {
      setDone(true)
      setMemo('Transfer Success.')
    }
    else {
      setDone(false)
      setSubmit(false)
      setMemo('Transfer Failed.')
    }

    setLoader(false)
    
  }


  const handleChange = async(key, val) => {
    setData({ ...data, [key]: val });
  }


  if (loader) return <></>


  return (
  <>
    {/* info */}
    <div className="mx-3">
      <p className="text-bold m-0">{'Account Withdraw'}</p>
      <p className="">{asset?.mail || '******'}</p>
      
    </div>  

    <div className={`back-color-wite rounded-xd p-3 border`}>
      <div className="d-flex">
        <div className="">
          <p className="text-small m-0">Account Balance</p>
          
          <p className="m-0">
            <span className="text-bold text-lead">{NumberFormat((balance?.number/1000000 || 0), '', '2')}</span>
            <span className="text-small ms-1">{'INR'}</span>
          </p>
          <p className="m-0">A/c: {account?.number || '******'}</p>
        </div>
        <div className=""></div>
      </div>

      <WebbDividerSmall />
      <div className={`${balance.number > 0 ? '' : 'd-none'}`}>
        <div className="mb-3">  
          <label className="form-label small">Amount <FormNeeded/></label>
          <input type="text" className={`form-control height-md ${checkoutstatus ? '' : 'danger-outlined'}`}
            style={{fontSize:'0.9rem', height:'2.7rem'}}
            value={data.amount}
            onChange={({ target }) => {handleChange("amount", target.value); }}
            disabled={loader || submit || balance.number == 0}
            placeholder="">
          </input>
        </div>

        <div className="mb-3">  
          <label className="form-label small">Memo <FormNeeded/></label>
          <textarea type="text" className="form-control"
            style={{fontSize:'0.9rem'}}
            value={data.memo}
            onChange={({ target }) => {handleChange("memo", target.value); }}
            disabled={loader || submit || balance.number == 0}
            rows={2}
            placeholder="">
          </textarea>
        </div>
      </div>

      <div className={submit && done || balance.number == 0 ? 'd-none' : ''}>
        <WebbDividerMedium />
        <div className="d-flex justify-content-between">

          <button className={`btn btn-light border back-color-wite rounded-xx button text-small`}
            type="button"
            disabled={loader || submit}
            onClick={()=> { navigate(`/${usxx}/home`)}}
          >{loader ? 'Please Wait...' : 'Cancel'}</button>

          <button className={`btn btn-primary border-none rounded-xx text-small`}
            // disabled={!form || loader || submit}
            type="button"
            disabled={loader || submit || !form || !checkoutstatus}
            onClick={()=> { handleSubmit()}}
          >{loader ? 'Please Wait...' : 'Continue'}</button>

        </div>
      </div>
      
      <div className={`${balance.number == 0 ? '' : 'd-none'}`}>
        <WebbDividerSmall />
        <p className="m-0">Nil Balance in account. Withdrawal is not possible. </p>
      </div>

      
      <div className={loader && submit ? '' : 'd-none'}>
        <WebbDividerMedium />
        Please Wait...
      </div>

      <div className={!loader && submit && done ? '' : 'd-none'}>
        <WebbDividerMedium />
        <p className="m-0">{memo}</p>
        <p className="cursor text-color-blue m-0" onClick={() => window.location.reload()}>Make Another Transfer</p>
      </div> 

      <WebbDividerSmall />
    </div>

  </>

  )
}