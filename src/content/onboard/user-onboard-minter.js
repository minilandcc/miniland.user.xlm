// auth - firebase mail link
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";
import WebbLoaderMedium from "../webx/webb-loader-md";
import WebbLoaderSmall from "../webx/webb-loader-sm";
import WebbModuleInfo from "../webx/webb-module-info";
import FormNeeded from "../webx/form-needed";

import { GetAuthUser } from '../../services/srvc-auth-local';
import { UserAccountDetails } from "../../services/srvc-user-realm";

import { CreateRandWallet } from '../../services/srvc-wallet-rand'
import { TextSecure, TextReverse } from '../../services/srvc-encr-node'

import { AccountsMinterCreate } from "../../services/srvc-accounts-minter-realm";
import { AccountsMinterInit } from "../../services/srvc-accounts-minter-realm";

export default function UserOnboardMinterModule () {

  const asset = GetAuthUser();
  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [done, setDone] = useState(false);
  const [memo, setMemo] = useState('');

  const [user, setUser] = useState()
  const [data, setData] = useState()

  const [accountstatus, setAccountStatus] = useState(false)
  const [accountinit, setAccountInit] = useState(false)
  const [account, setAccount] = useState({
    address: '******',
    mnemonic: '******',
  })

  const [secreta, setSecretA] = useState()
  const [secretb, setSecretB] = useState()

  useEffect(()=>{

    const fetchdata = async()=>{
    
      var res = await UserAccountDetails({data:{user:asset.user}})
      // console.log(res.data)
      setUser(res.data)
    }
    fetchdata()

  },[])

  useEffect(() => {
    if (asset) {
      const fetchData = async () => {
        account.address !== '******' ? setAccountStatus(true) : setAccountStatus (false)
        account.mnemonic !== '******' ? setAccountStatus(true) : setAccountStatus (false)
      }
      fetchData()
    }
  }, [account])

  const handleAccount = async () => {
    
    const accountx = await CreateRandWallet()
    console.log(accountx)

    setAccount({...account, address: accountx.data.address, mnemonic: accountx.data.mnemonic})

  }

  const handleMinterInit = async() => {
    
    // const datx = {user: asset.item, role: 'user', chain: '416001'}

    // const res = await fetch('/api/accounts-minter-init', {
    //   body: JSON.stringify({data: datx, srvc: '******'}),
    //   headers: { 'Content-Type': 'application/json' },
    //   method: 'POST'
    // })
    // var result = JSON.parse(await res.json());
    // console.log (result)
    return true // result.stat

  }

  const handleFundsClaim = async() => {
    
    // const datx = {
    //   user: asset.item, role: 'user', mnemonic: account.mnemonic,
    //   chain: '416001', asset: '1287092178'
    // }

    // const res = await fetch('/api/transfers-asset-claim', {
    //   body: JSON.stringify({data: datx, srvc: '******'}),
    //   headers: { 'Content-Type': 'application/json' },
    //   method: 'POST'
    // })
    // var result = JSON.parse(await res.json());
    // console.log (result)
    return true // result.stat

  }
  

  const handleSubmit = async() => {
    
    setLoader(true)
    setSubmit(true)
    handleSave()
    const mnemonix = await TextSecure( {text: account.mnemonic, secret: secreta})
    console.log(mnemonix)

    const datx = {
      account: {
        number: account.address,
        secret: mnemonix.data
      },
      auth: secreta, // we can hash secret before saving
      bank: { name: 'Algorand', code: '416001' },
      user: { name: user.name, mail: user.mail, mobile: user.mobile, item: user.item },
    }
    console.log(datx)
    // setAccount({...account, mnemonic: '******'})
    
    const result = await AccountsMinterCreate({data: datx, srvc: '******'})
    console.log (result)

    if (result.stat) {
      setMemo('Account Created')
      
      //minter init
      setAccountInit(true)

      setMemo('Account Initialize 1/2')
      const minterinit = await handleMinterInit()
      if (minterinit) setMemo('Account Initialize 1/2 - Success')

      //minter claim
      setMemo('Account Initialize 2/2')
      const minterclaim = await handleFundsClaim()
      if (minterclaim) setMemo('Account Initialize 2/2 - Success')

      // navigate('/auth/next')
    }
    else {
      setMemo('Account Creation Failed.')
      setSubmit(false)
    }

    setDone(true)
    setLoader(false)

    // reverse
    // const txt = await ReverseText({text: mnemonix.data, secret: '123'})
    // console.log(txt)

    // if (txt.data === account.mnemonic) console.log('pass') 
    // else console.log('fail')

  }

  function handleSave() {

    const content = '' + 
      '\n--------------------------------------------------\n' +
      '\nMiniland * Real Estate' + 
      '\nvisit: https://miniland.in' + 
      '\n\n--------------------------------------------------\n' +
      '\n\nDigital Asset Account Number\n> ' + account.address + 
      // '\n\nView Account on Mainnet\n> ' + `https://algoexplorer.io/address/${data.address}` +
      // '\n\nView Account on Testnet\n> ' + `https://testnet.algoexplorer.io/address/${data.address}` +
      '\n\n--------------------------------------------------\n' +
      '\n\nRecovery Phrase (Mnemonic/Secret)\n' + '*** DO NOT SHARE THIS WITH ANYONE ***\n> ' + account.mnemonic +
      '\n\n--------------------------------------------------\n' +
      '\nIf you lose your recovery phrase or private key, you will not be able to access your wallet or its funds. It is always a good idea to back it up either by writing down in private diary or printing it out.' + 
      '\n\n--------------------------------------------------\n'

    const blob = new Blob([content], {type: 'text/plain'});

    if(window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, `brx-account-${Date.now().toString()}`);
    }
    else{
        const elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = `brx-account-${Date.now().toString()}`;
        document.body.appendChild(elem);
        elem.click();  
        document.body.removeChild(elem);
    }
  }

  const handleChange = async(key, val) => {
    setData({ ...data, [key]: val });
  }



  // if (loader) return <><div className="text-center"><WebbLoaderSmall/></div></>


  return (
  <>
    {/* info */}
    <div className="mx-3">
      <p className='text-bold m-0'>Create Digital Assets Account</p>
      <p className="">{user?.mail || '******'}</p>
      <p className="text-small m-0 mb-2">
        You will need the account (blockchain) to own and manage your Fractional Real Estate assets.
      </p>
      <p className="text-small m-0">
        <span className="text-bold">Please create the account and secure the account with your own Passkey. </span>
        <br></br>Please remember or write down the passkey and store it somewhere safe, as it cannot be retrieved later.
      </p>
    </div>
    <WebbDividerSmall/>


    <div className='p-3 back-color-wite rounded-xd'>
      
      <p className='text-bold m-0'>Account Number</p>
      <p className='text-normal text-color-next m-0  text-break'>{account.address}</p>

      <WebbDividerMedium />
      <div className={accountinit ? 'd-none': ''}>
        <p className='text-bold m-0'>Mnemonic/Secret</p>   
        <p className='text-normal text-color-next m-0 text-break'>{account.mnemonic}</p>
      </div>


      <div className={accountinit ? 'd-none': ''}>
        <WebbDividerSmall />
        <p className="m-0">{memo}</p>
      </div>

      <div className={accountstatus || submit ? 'd-none' : ''}>
        <WebbDividerMedium />
        <button 
          className='btn btn-sm btn-primary rounded-xx text-small px-4' 
          style={{width:'auto'}}
          onClick={() => handleAccount()}
        >
          Create Account
        </button>
      </div>


      <div className={accountstatus && !accountinit ? '' : 'd-none'}>
        <WebbDividerSmall />

        <p className='m-0 mb-2'>Enter Encryption PassKey (6 digit)</p>
        <div className="mb-3">  
          <input type="password" className="form-control height-md  "
            style={{fontSize:'0.9rem', height:'2.7rem'}}
            value={secreta}
            onChange={({ target }) => {setSecretA(target.value); }}
            disabled={loader || submit}
            placeholder="123456">
          </input>
        </div>

        <p className='m-0 mb-2'>Re-Enter Encryption PassKey (6 digit)</p>
        <div className="mb-2">  
          <input type="password" className="form-control height-md  "
            style={{fontSize:'0.9rem', height:'2.7rem'}}
            value={secretb}
            onChange={({ target }) => {setSecretB(target.value); }}
            disabled={loader || submit}
            placeholder="123456">
          </input>
        </div>
        <div className={'text-small'}>
          {
            secreta && secretb 
              ? secreta === secretb ? 'Passkey OK' : 'Passkey Not Matched' 
              : 'Please Enter Passkey'
          }
        </div>

        <WebbDividerMedium />
        <div className={!loader && submit ? 'd-none' : ''}>
          <button 
            className='btn btn-sm btn-primary rounded-xx border-none text-small px-4' 
            disabled={loader || submit || (!secreta || !secretb || secreta !== secretb)}
            style={{width:'auto'}}
            onClick={() => handleSubmit()}
          >
            Encrypt and Link Account
          </button>
        </div>

      </div>



      {/* status */}
      <div className={!loader && submit && !accountinit ? '' : 'd-none'}>
        <div  className={done ? 'text-bold' : 'd-none'}>
          <span><i className='bx bxs-check-circle text-color-success'></i></span>
          <span className='ms-1'>Account Link Success</span>
        </div>
        <div  className={done ? 'd-none' : ''}>
          <span><i className='bx bxs-error-circle text-color-danger'></i></span>
          <span className='ms-1'>Account Link Failed</span>
        </div>
      </div>

      {/* account init */}
      <div className={!loader && submit && accountinit ? '' : 'd-none'}>
        <WebbDividerSmall />
        <div  className={done ? 'text-bold' : 'd-none'}>
          <span><i className='bx bxs-check-circle text-color-success'></i></span>
          <span className='ms-1'>{memo}</span>
        </div>

        <WebbDividerMedium />
        <span className="btn btn-sm btn-primary text-small border-none rounded-xx p-2 px-3"
          onClick={() => navigate('/auth/next')}
        >Continue</span>    

      </div>  

      <WebbDividerSmall />
    </div>


    {/* memo */}
    <div className={account.address === '******' ? 'd-none' : 'mx-3'}>
      <WebbDividerMedium />  
      <p className='text-color-main m-0 cursor' onClick={() => handleSave()}>
        <i className='bx bxs-info-circle'></i>
        <span className='ms-1text-bold'>Download Account Details</span>
      </p>
      <p className="text-small mt-1">Please write down the account details (address, secret) or download local copy</p>
    </div>

    {/* footer */}



  </>

  )
}