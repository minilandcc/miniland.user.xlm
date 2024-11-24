// transfers
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";
import WebbLoaderMedium from "../webx/webb-loader-md";
import WebbLoaderSmall from "../webx/webb-loader-sm";
import WebbModuleInfo from "../webx/webb-module-info";
import FormNeeded from "../webx/form-needed";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-local";

import { AccountsMinterCreate } from '../../services/srvc-accounts-minter-realm'

import { CreateRandWallet } from '../../services/srvc-wallet-rand'
import { TextSecure, TextReverse } from '../../services/srvc-encr-node'


export default function AccountsMinterCreateModule () {

  
  const {id} = useParams()
  const navigate = useNavigate();

  const usxx = GetUserForm()
  const usrx = GetLocalUser()
  const temx = GetLocalBusiness()
  const asset = usxx === 'user' ? usrx : temx

  const [loader, setLoader] = useState(false)
  const [submit, setSubmit] = useState(false);
  const [done, setDone] = useState(false);
  const [memo, setMemo] = useState('');

  const [data, setData] = useState()
  const [accountstatus, setAccountStatus] = useState(false)
  const [account, setAccount] = useState({
    address: '******',
    mnemonic: '******',
  })

  const [secreta, setSecretA] = useState()
  const [secretb, setSecretB] = useState()

  useEffect(() => {
    if (asset) {
      const fetchData = async () => {


        setLoader(false)
      }
      fetchData()
    }
  }, [])


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
      bank: { name: 'Algorand', code: '416002' },
      user: { name: asset.name, mail: asset.mail, item: asset.item },
      item: id
    }

    setAccount({...account, mnemonic: '******'})
    
    const result = await AccountsMinterCreate({data: datx, srvc: '******'})
    console.log(result)

    if (result.data) {
      setMemo('Account Created.')
      navigate("/user/account")
    }
    else {
      setMemo('Account Creation Failed.')
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
      '\nBRX * Real Estate Asset Tokenization & Exchange' + 
      '\nvisit: https://brx.mx' + 
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

  // if (loader) return <></>


  return (
  <>

    <div className="mx-3">
      <p className='text-normal text-bold m-0'>Create Digital Assets Account</p>
      <p className="">{asset?.mail || '******'}</p>
      <p className="m-0 mb-2">The Digital Asset Account is your account on blockchain. You will need the account to manage your fractional real-estate assets.</p>
      <p className="m-0">Please create the account and secure the account with your own Passkey. Please remember the passkey, as it cannot be retrieved later.</p>
    </div>
    <WebbDividerSmall/>
    
    <div className='p-3 back-color-wite rounded-xd'>
      
      <p className='text-bold m-0'>Account Number</p>
      <p className='text-normal text-color-next m-0  text-break'>{account.address}</p>

      <WebbDividerMedium />
      <p className='text-bold m-0'>Mnemonic/Secret</p>   
      <p className='text-normal text-color-next m-0 text-break'>{account.mnemonic}</p>

      <div className={accountstatus || submit ? 'd-none' : ''}>
        <WebbDividerMedium />
        <WebbDividerMedium />
        <button 
          className='btn btn-sm btn-primary rounded-xx text-small px-4' 
          style={{width:'auto'}}
          onClick={() => handleAccount()}
        >
          Create Account
        </button>
      </div>
      <WebbDividerMedium />


      <div className={accountstatus ? '' : 'd-none'}>

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
            className='btn btn-sm btn-primary rounded-xx text-small px-4' 
            disabled={loader || submit || (!secreta || !secretb || secreta !== secretb)}
            style={{width:'auto'}}
            onClick={() => handleSubmit()}
          >
            Encrypt and Link Account
          </button>
        </div>

      </div>



      {/* status */}
      <div className={!loader && submit ? '' : 'd-none'}>
        <div  className={done ? 'text-bold' : 'd-none'}>
          <span><i className='bx bxs-check-circle text-color-success'></i></span>
          <span className='ms-1'>Account Link Success</span>
        </div>
        <div  className={done ? 'd-none' : ''}>
          <span><i className='bx bxs-error-circle text-color-danger'></i></span>
          <span className='ms-1'>Account Link Failed</span>
        </div>
      </div>


      <WebbDividerSmall />
    </div>


    {/* memo */}
    <WebbDividerMedium />
    <div className={account.address === '******' ? 'd-none' : ''}>
      
      <p className='text-color-main m-0 cursor' onClick={() => handleSave()}>
        <i className='bx bxs-info-circle'></i>
        <span className='ms-1'>Click here to Download Account Details</span>
      </p>
    </div>


    {/* footer */}



  </>

  )
}