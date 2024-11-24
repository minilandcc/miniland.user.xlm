import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import WebbDividerSmall from "../webx/webb-divider-sm";

import ListNoData from "../webx/list-nodata";
import NavsButtonBack from "../webx/navs-button-back";
import NavsButtonNext from "../webx/navs-button-next";

import { GetUserForm, UserForm } from "../../services/srvc-utilities";
import { ContractDetailsRead, ContractLists } from "../../services/srvc-contracts-realm";
import WebbSpinText from "../webx/webb-spintext";
import { GetLocalBusiness, GetLocalUser } from "../../services/srvc-auth-local";


export default function ContractListModule(props) {



  const usxx = GetUserForm();
  const usrx = GetLocalUser();
  const temx = GetLocalBusiness();
  const asset = usxx === "user" ? usrx : temx;
 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [data, setData ] = useState([]);
  const search = props.data;
  

  const [index, setIndex] = useState(1)
  const [items, setItems] = useState(5)

  const [curr, setCurrentIndex] = useState(1)
  const [next, setNextIndex] = useState()
  const [last, setLastIndex] = useState()

  const [count, setCount] = useState()
  const [total, setTotal] = useState()

  const [text, setText] = useState('')


  useEffect( () => {

    if (asset){
      const fetchData = async() => {
        setLoading(true);
        const datx = {
          data: { user: asset.item, index:index, items: items, filters: {name:''} },
          user: asset.item
        }
        
        var result = await ContractLists(datx)
        // console.log (result)
        setData(result.data.list)
        
        setCount(result.data.count)
        setTotal(Math.ceil(result.data.count/ items))
        setText(`${(index-1)*items+1} - ${index*items < result.data.count ? index*items : result.data.count} of ${result.data.count}`)

        setLoading(false);
      }
      fetchData()
    } else {}
  },[index, items, search]);


  const NextIndex = async() =>{
    if(total == index) {}
    else {
      setNextIndex(curr+1)
      setIndex(curr+1)
      setCurrentIndex(curr+1)
    }
  }

  const LastIndex = async()=>{
    if(index == 1) {}
    else{
      setLastIndex(curr-1)
      setIndex(curr-1)
      setCurrentIndex(curr-1)
    }
  }


  const handleClick = (item) => {
    console.log(item)
   navigate(`/user/contracts/${item}`)
  }

  if (loading){ return ( <> <WebbSpinText /> </> ) }
  if (!loading && (!data || data.length === 0)) { return ( <> <ListNoData /> </> ) }

  return (
  <>
    {/* data */}
    <div className="back-color-wite border rounded-wd shadow-sm">
    {data && data.length > 0 && data.map((item, i) => (
      <div className={i < data.length-1 ? 'border-bottom' : ''} key={i}>
        <div className="p-3 hilite" onClick={() => handleClick(item.item)}>
          <div className="d-flex cursor">

            <div className="">
              <p className="m-0">
                <span className={`${item.actv ? 'text-color-success' : 'text-color-warning'}`}><i className="bx bxs-circle text-small"></i></span>
                <span className="text-normal text-bold m-0 text-primary ms-1">{item.meta.name}</span>
              </p>
              <p className="m-0 text-sm">{item.meta.memo}</p>
              <p className="m-0 text-color-tone">Created: {(new Date(item.crts)).toLocaleDateString()}</p>
              <p className="m-0 text-small text-color-tone d-none">ID: {item.enid}</p>
            </div>

            <div className="ms-auto py-2">
              <i className="bi bi-chevron-right text-lead text-color-tint"></i>            
            </div>

          </div>

        </div>
      </div>

    ))}
    </div>


    {/* navs */}
    <WebbDividerSmall />
    <div className="">
      <div className="d-flex justify-content-between">

        <div className="" onClick={()=>LastIndex()}>
          <NavsButtonBack />
        </div>

        <div className="">
          <p className="my-2 text-color-tone">{text}</p>
        </div>

        <div className="" onClick={()=>NextIndex()}>
          <NavsButtonNext />
        </div>

      </div>
    </div>
    
    
  </>
  )
}