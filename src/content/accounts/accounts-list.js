// documents
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-local";

import listAccounts from '../../data.static/data-accounts.json'

import { AccountsList } from "../../services/srvc-accounts-realm";
import { AccountsOnboardStatus } from "../../services/srvc-accounts-realm";


export default function UserAccountsListModule () {

  const usxx = GetUserForm()
  const usrx = GetLocalUser()
  const temx = GetLocalBusiness()
  const asset = usxx === 'user' ? usrx : temx
  
  const navigate = useNavigate();

  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([])

  useEffect( () => {
    if (asset){

      const fetchData = async() => {
        setLoader(true);

        const result = await AccountsList({data: {user: asset.item}})
        const status = await AccountsOnboardStatus({data: {user: asset.item}})
        console.log (status)

        var list = listAccounts.data.filter(x => x.actv)
        var accountx = Array.from(list, x => { 
          var acnt = result?.data?.list.find( z => x.sort == z.meta.sort )
          return { 
            meta: x.meta, 
            account: { 
              name: acnt?.account.name || '******', 
              number: acnt?.account.number  || '******', 
              status: acnt?.account.status || false
            }, 
            bank: { name: acnt?.bank?.name || '******', branch: acnt?.bank?.branch || '******',  }, 
            icon: x.icon,
            text: x.text, link: x.link,
            active: acnt ? true : false,
          }
        })
        setData(accountx)
        setLoader(false);
      }
      fetchData()
    } else {}
  },[]);

  const handleClick = (item) => {
    if(item.active==true){}
    else navigate(`/${asset.role}/${item.link}`)
  }


  if (loader) return <><div className="mx-3 text-color-tone">Please Wait...</div></>
  if (!loader && data && data.length === 0) return <>
    <div className="mx-3">No Linked Accounts</div>
  </>

  return (
  <>
    {/* data */}
    <div className="back-color-wite rounded-xd border">
    {data && data.map((item, i) => (
      <div key={i}>
      <div className={`d-flex px-3 mt-3 mb-3`} >
          
      <div className="">
          <p className="m-0 ">
            <i className={`bx bxs-${item.account?.status ? 'check' : 'error'}-circle ${item.account?.status ? 'text-color-success' : 'text-color-error'}`}></i>
          </p>
        </div>

        <div className="ms-2" style={{maxWidth: '60%'}}>         
          <p className="m-0 text-sm">
            <span className="text-color-blue text-bold">{item?.meta?.name || '******'}</span>
          </p>
          <p className="m-0 text-wrap">
            <span className="text-small">{item?.meta?.memo || '******'}</span>
          </p>
          <p className="text-small m-0 text-truncate">
            <span className=" text-sm">Number: {item?.account?.number ||'******'}</span>
          </p>         
        </div>
    
        <div className="ms-auto text-end text-color-wite">           
          <div className="mb-1"></div>
          <span className={`p-2 px-3 back-color-success rounded-xx text-small align-middle ${item.active ? '': 'd-none'}`} 
            >
            {'Linked'}
          </span>           
          <span className={`p-2 px-3 back-color-error rounded-xx text-small align-middle cursor hidark   ${item.active ? 'd-none': ''}`} 
            onClick={() => handleClick(item)}>
            {'Pending'}
          </span>   
          
        </div>

      </div>
      <div className={i < data.length-1 ? 'border-bottom': ''}></div>
      </div>
    ))}
    </div> 

  </>

  )
}