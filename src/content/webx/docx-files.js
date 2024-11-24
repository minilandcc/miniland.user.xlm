// documents
import { Link, useParams } from "react-router-dom";

import WebbDividerMedium from "./webb-divider-md";

export default function DocumentFiles(props) {
;
  const { smid,id } = useParams();
  
  const data = props.data
  // console.log(data)
  // console.log (props.status)

  function DownloadDocx(item) {
    const linkSource = item;
    const downloadLink = document.createElement("a");
    const fileName = Date.now().toString();
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  if (props.status!== 0 && data.length===0) {
    return (
      <> 
        <span>Files in Process</span>
        <WebbDividerMedium/>
      </>
      )    
  }  

  if (data.length === 0) 
  return (
  <> 
    <span> No Files Attached. Please  </span>
    <Link to={`/documents/new/xxxx/${smid}/${id}`}>add / upload a file</Link>
    <WebbDividerMedium/>
  </>
  )

  return (
  <>
    <div className={`rounded-wd back-color-wite mb-3`}>
    {data && data.length > 0 && data.map((item, i) => (
      <div key={i}>
      <div className="d-flex p-3">
        <div className="me-auto">
          <p className="text-bold m-0 p-0 text-sm">{item.name}</p>
          <p className="m-0 p-0 text-color-tone text-sm">ID: {item?.number || Date.now().toString()}</p>
          <p className="m-0 p-0 text-color-tone text-sm">{'Created: '}{(new Date().toLocaleString())}</p>
        </div>

        <div className={item.link? `text-end py-2` :'d-none'}>
          <a href={item.link} target="_blank">
          <div 
            className="btn btn-sm btn-light border hidark border-none rounded-wd p-1 px-3"
            ><small>Download</small>
          </div>
          </a>
        </div>

        <div className={item.base? `text-end py-2` :'d-none'}>
          
          <div onClick={()=> DownloadDocx(item.base)} 
            className="btn btn-sm btn-light border hidark border-none rounded-wd p-1 px-3"
            ><small>Download</small>
          </div>
          
        </div>

      </div>
      
      <div className={`border-bottom ${i < data.length-1 ? '' :'d-none'}`}></div>
      </div>
    ))}
    </div>
   

    {/* replace option */}
 
  </>
  )
}