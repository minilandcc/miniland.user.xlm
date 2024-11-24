// firebase file upload
import { useState, useEffect, useRef } from "react";
import { toBase64 } from "./srvc-utilities";

import { DocumentCreate } from "./srvc-media-docs-realm";

const basemedia = require('../data.media/filesave.jpg')

const listMime = [
  {mime: 'image/png', name: 'IMAGE'},
  {mime: 'image/jpg', name: 'IMAGE'},
  {mime: 'image/jpeg', name: 'IMAGE'},
  {mime: 'application/pdf', name: 'PDF'}
]

export default function FileCreateCX (props) {

  const [link, setLink] = useState(basemedia);
  const [file, setFile] = useState();
  const [name, setName] = useState();
  const [size, setSize] = useState();
  const [mime, setMime] = useState();

  const [stat, setStatus] = useState('Select Document...');
  const [done, setDone] = useState(0);

  let inputFile = useRef(null);

  const handleFile = async (e) => {
    const { files } = e.target;
    if (files && files.length) {
  
      setDone(0)
      setName(files[0].name)
      setSize(files[0].size)
      
      handleLink(files[0]);      
      handleMime(files[0]);
      handleSave(files[0]);

      setDone(100)
    }
  };

  const handleLink = async(file) => {
    // set local file link
    setLink(URL.createObjectURL(file));
  }

  const handleMime = async(item) => {
    // console.log(item.type)
    // set local file link
    setMime(item.type);
  }

  const handleSave = async(item) => {

    const filedata = await toBase64(item)
    props.media({file: filedata})
    setDone(100)
    setStatus('Document Ready to Upload')
    // console.log(filedata)

    // setDone(50)
    // setStatus('Please Wait... ')

    // const datx = {file: filedata}
    // const result = await DocumentCreate({data: datx})
    // console.log (result)

    // if (result.data) {
    //   setDone(100)
    //   setStatus('Document Upload Success')
      
    //   // send data
    //   props.media(result.data)

    // } else {
    //   setDone(0)
    //   setStatus('Document Upload Failed')
    // }

  }

  const uploadProgress = (event, server) => {
    

  }


  const onButtonClick = () => {
    inputFile.current.click();
    
  };

  return (
  <>

    <div className={`back-color-wite border rounded-xd`}>
      <div className={`${props.size} cursor p-3`} 
        onClick={() => onButtonClick()}>
        <p className="m-0 p-0 d-none">{name || 'select file'}</p>
        <p className="text-small text-color-tone m-0 p-0 d-none">
          <span>{mime ? listMime.find(x => x.mime === mime).name : ''}</span>
          <span>{' - '}</span>
          <span>{size ? (size/1024).toFixed(0) : '******'} {size ? 'KB' : ''}</span>
        </p>
        <p className="m-0 d-none">{file || 'Click here to upload file'}</p>

        <div className="mb-2 d-none"></div>
        <p className="text-color-none m-0 mb-1">
          <span><i className={`bx bxs-circle small text-color-${ done == 100 ? 'success' : (done<100 && done>0) ? 'warning': 'danger'}`}></i></span>
          <span className="ms-1">{stat}</span>
        </p>

        {/* <WebbStatusBar stat={done}/> */}
      
        <div className="mb-3"></div>
        <div className="media-standard">
          <img className="w-100 rounded-xd" src={link}></img>
        </div>

      </div>

    </div>



    <div className="mb-3">
      <input 
        type="file" accept="image/png, image/jpg, image/jpeg, " id="file"
        ref={inputFile}
        onChange= {handleFile} 
        style={{display: "none"}}
      ></input>
    </div>

  </>
  )
}
