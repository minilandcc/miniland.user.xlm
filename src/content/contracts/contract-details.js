import React, { useEffect, useState } from 'react'
import ContractOverview from '../webx/contract-overview'
import WebbDividerSmall from '../webx/webb-divider-sm'
// import ContractActions from '../webx/contract-actions'
import ContractMembers from '../webx/contract-members'
import DocumentFiles from '../webx/docx-files'
import { GetSignedDocuments, GetSignedStatus } from '../../services/srvc-contracts-realm'
import { useParams } from 'react-router-dom'
import WebbLoaderSmall from '../webx/webb-loader-sm'
import WebbDividerMedium from '../webx/webb-divider-md'

const ContractDetailsModule = (props) => {

  const {id} = useParams()
  const info= props.data 
  const mmbr = props.data.members
  const file = props.data.files

//   console.log(props)

  const [loading, setLoading] = useState(false)
  const [members, setMembers] = useState(mmbr)
  const [filelist, setFilelist] = useState(file)


  useEffect(()=>{
   
    if(info.status == "2" || info.status=="6")
    {
      setLoading(true) 
      const fetchdata = async()=>{

      var res = await GetSignedStatus({data:{item:id}})
      var list = Array.from(res.data.members, item => {return ({name:item.name, mail:item.mail,id:item.id, rank: item.rank, status: item.status=="pending"?"2":"6"})})
      setMembers(list)

      
      
      var res = await GetSignedDocuments({data:{item:id}})
      // console.log(res.data.list)
      setFilelist(res.data.list)
      setLoading(false)
     

    }
    fetchdata()
    
  }
  else {

  }

  },[])
  console.log(members)
  console.log(filelist)

  return (
    <div>
        <ContractOverview data={info}/>
        <WebbDividerSmall />
        {/* <ContractActions data={{docx: info, mmbr: members, file:file }} /> */}
        <WebbDividerSmall />
        <WebbDividerSmall />
        {
          loading?
          <>
          <WebbLoaderSmall />
          </>
          :
          <>
             <h6 className=''>Members</h6>
             <ContractMembers data={members} admin= {info.user} />
             <WebbDividerSmall />
             <h6 className=''>Files</h6>
             <DocumentFiles status = {filelist.length} data={filelist}/>
             
          </>
        }
    </div>
  )
}

export default ContractDetailsModule