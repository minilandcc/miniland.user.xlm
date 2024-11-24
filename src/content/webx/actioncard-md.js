// cancel button
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GetLocalBusiness, GetLocalUser } from '../../services/srvc-auth-local';
import { GetUserForm } from '../../services/srvc-utilities';


export default function ActionCardMedium(props) {
  
    const navigate = useNavigate();
    const usxx = GetUserForm()
    const usrx = GetLocalUser()
    const temx = GetLocalBusiness()
    const asset = usxx === 'user' ? usrx : temx
    const data = props.data;
  //console.log(data)



  return (
  <>
    <Link 
      disabled={!data.actv}
      className="m-0 p-0"
      style={{ pointerEvents: data.actv ? '' : 'none' }}
      to={data.link}>

        <div className={`d-flex border rounded-wd back-color-wite p-3 mb-2 hitone`}>

          <div className="me-auto">
            <p className={ `text-bold m-0 p-0 ${!data.actv ? 'text-color-tone' : ''}`}>{data.name}</p>
            <p className="text-color-tone m-0">{data.text}</p>
          </div>

          <div className="py-2 mt-1">
            <i className={`m-0 p-0 text-color-tone bi-chevron-right`} >
            </i>
          </div>
        </div>
        
    </Link>

  </>
  )
}