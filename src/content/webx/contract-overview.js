// documents
const code = require('../../data.static/code-contracts.json').data

export default function ContractOverview(props) {

  const data = props.data;
  //  console.log (new Date(data.end_date).toDateString())
  return (
  <>
    <div className="rounded-wd back-color-wite">

      <div className="d-flex p-3">
        <div className="me-auto">
          <h1 className="lead fw-bold text-color-main">{data.name}</h1>
          <p className="text-color-tone">{data.number}</p>
          <p className="m-0">Memo: {data.memo}</p>
        </div>
        
        <div className="text-end">
          <div className="d-none"  style={{width:'2rem', height:'2rem'}}>
            <p className={`text-${code.find(item=>parseInt(item.code) == data.status).colr} `}
              style={{fontSize:'2rem', lineHeight:'1rem'}}>
              <i className={code.find(item=>parseInt(item.code) == data.status).icon}></i>
            </p>
          </div>

        </div>

      </div>

      <div className='border-bottom'></div>
      <div className="d-flex p-3">
        <div className="me-auto">
          <p className="">Start Date:</p>   
          <p className="m-0">End Date:</p>   
        </div>
        <div className="text-end">
          <p className="">{(new Date(data.created_date)).toLocaleString().substring(0,10)}</p>   
          <p className="m-0">{(new Date(data.end_date)).toLocaleString().substring(0,10)}</p>
        </div>
      </div>

      {/* <hr className='m-0'></hr>
      <div className="d-flex p-3">
        <div className="me-auto">   
          <p className="m-0">Status:</p>   
        </div>
        <div className="text-end">
          <p className="m-0">{code.find(item=>parseInt(item.code) == data.status).text}</p>
        </div>
      </div> */}

    </div>
    

    
  </>
  )
}