// web navigation
import { Link, useNavigate } from "react-router-dom";

// import WebbIcon from "../webx/webb-icon"
import WebbIconBack from "../webx/webb-icon-back"
import WebbIconX from "../webx/webb-icon-x";
// import WebbIconUser from "../webx/webb-icon-user"
// import UserWebb from "../webx/user-webb"
// import UserAvatar from "../webx/user-avatar";

import { GetLocalUser } from "../../services/srvc-auth-local";

export default function WebbHeader(props) {

  const asset = GetLocalUser();
  const navigate = useNavigate();
  const data = props.data;

  return (
    <>
    {/* header-large */}
    <div className="mx-3 d-none d-md-block">
      <div className="d-flex justify-content-between py-1">
        
        <div className="py-1 cursor" onClick={() => navigate(-1)}>
          <WebbIconBack data={{color: 'text-color-tone', size: 'text-icon-md'}}/>
        </div>
        
        <div className="py-1">
          <p className="m-0 mt-1">{data.name}</p>
        </div>
        
        <div className="py-1">
          <Link to={data.home == '***' ? `${data.link}`: `/${asset.role}/${data.link}`}><WebbIconX /></Link>
        </div>
      </div>
    </div>
  
    {/* header-small */}
    <div className="mx-3 d-md-none">
      <div className="d-flex justify-content-between py-1">
        
        <div className="py-1" onClick={() => navigate(-1)}>
          <WebbIconBack data={{color: 'text-color-tint', size: 'text-icon-md'}}/>
        </div>
        
        <div className="py-1">
          <p className="m-0 mt-1">{data.name}</p>
        </div>
        
        <div className="py-1">
          <Link to={data.home == '***' ? `${data.link}`: `/${asset.role}/${data.link}`}><WebbIconX /></Link>
        </div>
      </div>
    </div>
  
    </>
    )
}