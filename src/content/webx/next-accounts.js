// next

import { useState } from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

const form = [
  {name:'Personal', role:'user'},
  {name:'Team', role:'team'}
]

export default function NextAccounts(props) {

  console.log (props)
  const [accounts, setAccounts] = useState(props.data)

  const stat = (data) =>{
    
    if (!data.onboard) return {
      text: 'Profile Incomplete', 
      icon: 'bx bxs-error-circle', color:'error', 
      actn: true,
      name: 'Update'
    }    
    
    if (data.hold) return {
      text: 'Account In Review', 
      icon: 'bx bxs-error-circle', color:'wait', 
      actn: false,
      name: 'Select'
    }

    if (data.active) return {
      text: 'Active', 
      icon: 'bx bxs-check-circle', color:'success',
      actn: true,
      name: 'Select'
    }
    else return {
      text: 'In Review', 
      icon: 'bx bxs-error-circle', color:'wait',
      actn: false,
      name: 'Select'
    }
  }

  return (
  <>
    <div className={ accounts.length !== 0 ? '': 'd-none'}>
      <p className="m-0 mb-2 mx-3 text-small">{props.role} Account(s)</p>
        
      {accounts && accounts.length > 0 && accounts.map((item, i) => ( 
        item.role === form.find(item=>item.name === props.role).role ?

      <div className="" 
        style={{cursor:'pointer'}}
        onClick={async () => { props.user(item) }}
        disabled={!stat(item).actn}
        key={i}
      >

        <div className={`p-3 back-color-wite rounded-xd hidark cursor mb-2`} style={{height:'4.5rem'}}>

          <div className="d-flex">

            <div className="mt-1">
              <Jazzicon diameter={33} seed={jsNumberForAddress(item.item || Date.now())} /> 
            </div>

            <div className="ms-2 mt-1">
              <p className='p-0 m-0 text-bold text-sm' style={{lineHeight:'1.15rem'}}>{ item.name || 'User Name'}</p>
              <p className="p-0 m-0" style={{lineHeight:'1rem'}}>
                <span className={`text-color-${stat(item).color}`}>
                  <i className={`${stat(item).icon} text-small`}></i>
                </span>
                <span className='text-small text-uppercase'>{' '}{stat(item).text}</span>
              </p>
            </div>

            <div className="ms-auto py-1">
              <i className="bx bx-chevron-right text-color-tint m-0 p-0 text-icon-sm" ></i>
            </div>

          </div>

        </div>


      </div>
      
      : ''))}

    </div>
  </>
  )
}