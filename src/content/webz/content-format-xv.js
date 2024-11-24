// //format


// export default function ContentFormat ({header, sidebar, media, content, actionbar, footer, name}) {

//   // console.log (header, content, footer, name)

//   return (
//     <>
//       <div className="sticky-top d-none d-md-block">
//         <div className="container-fluid" style={{height:'100vh'}}>
//         <div className="row">
//           {/* header */}
//           <div className="p-0 d-none d-lg-block border-end" style={{width:'4.2rem'}}>
//             <div className="d-flex align-items-center flex-column" style={{height:'100vh'}}>
//               <div className="">
//                 <div className="p-3 pb-2">{header.header}</div>
//                 <div className="mx-1 mb-2 border-bottom"></div>
//               </div>

//               <div className="p-3 pt-0" style={{overflowY:'auto'}}>
//                 {header.data}
//               </div>

//               <div className="mt-auto p-3">
//                 {header.footer}
//               </div>
//             </div>
//           </div>

//           {/* sidebar */}
//           <div className="p-0 d-none d-md-block bg-body-tertiary border-end border-light" style={{width:'21%'}}>
//             <div className="d-flex flex-column" style={{height:'100vh'}}>
//               <div className="p-3" >
                
//                 <div className="" style={{height:'1.4rem'}}>
//                   {sidebar.header}
//                 </div>
//               </div>

//               <div className="p-3" style={{overflowY:'auto'}}>
//                 {sidebar.data}
//               </div>

//               <div className="mt-auto p-3"> 
//                 {sidebar.footer}
//               </div>

//             </div>
//           </div>

//           {/* content */}
//           <div className="col p-0 back-color-wite">
//             <div className="d-flex flex-column" style={{height:'100vh'}}>
//               <div className="p-3 align-self-stretch border-bottom border-light">
                
//                 <div className=""  style={{height:'1.4rem'}}>
//                   {content.header}
//                 </div>
//               </div>
              
//               <div className="p-3" style={{overflowY:'auto'}}>
//                 {content.data}
//               </div>

//             </div>
//           </div>


//           {/* actionbar */}
//           <div className="p-0 d-none d-md-block bg-body-tertiary border-start border-light" style={{width:'24%'}}>

//             <div className="d-flex flex-column" style={{height:'100vh'}}>
              
//               <div className="p-3 border-bottom border-light">
//                 <div className="" style={{height:'1.4rem'}}>
//                   {actionbar.header}
//                 </div>
//               </div>
              
//               <div className="p-3" style={{overflowY:'auto'}}>
//                 {actionbar.data}
//               </div>

//             </div>

//           </div>

//         </div>
//         </div>
//       </div>

//       {/* media */}
//       <div className="">
//       </div>

//       {/* footer */}


//     </>
//     )
//   }


//format
// import styles from "@/content/utils/cfxv.module.css";
import "../utils/cfxv.css"

export default function ContentFormat({
  header,
  sidebar,
  media,
  content,
  actionbar,
  footer,
  name,
}) {
  // console.log (header, content, footer, name)

  return (
    <>
      <div className="sticky-top">
        <div className="container-fluid" style={{ height: "100vh" }}>
          <div className="row">
            {/* header */}
            <div
              className={`col p-0 d-none d-xl-block border-end column1`}
              // style={{ maxWidth: "5%" }}
            >
              <div
                className="d-flex align-items-center flex-column"
                style={{ height: "100vh" }}
              >
                <div className="">
                  <div className="p-3 pb-2">{header.header}</div>
                  <div className="mx-3 mb-2 border-bottom"></div>
                </div>

                <div className="p-3 pt-0" style={{ overflowY: "auto" }}>
                  {header.data}
                </div>

                <div className="mt-auto p-3">{header.footer}</div>
              </div>
            </div>

            {/* sidebar */}
            <div
              className={`col p-0 bg-body-tertiary d-none d-md-block border-end column2`}
              // style={{ maxWidth: "20%" }}
            >
              <div className="d-flex flex-column" style={{ height: "100vh" }}>
                <div className="p-3">
                  <div className="" style={{ height: "1.4rem" }}>
                    {sidebar.header}
                  </div>
                </div>

                <div className="p-3" style={{ overflowY: "auto" }}>
                  {sidebar.data}
                </div>

                <div className="mt-auto p-3">{sidebar.footer}</div>
              </div>
            </div>

            {/* content */}
            <div
              className={`col p-0 back-color-wite column3`}
              // style={{ maxWidth: "50%" }}
            >
              <div className="d-flex flex-column" style={{ height: "100vh" }}>
                <div className="p-3 align-self-stretch border-bottom">
                  <div className="" style={{ height: "1.4rem" }}>
                    {content.header}
                  </div>
                </div>

                <div className="px-3 pt-3" style={{ overflowY: "auto" }}>
                  {content.data}
                </div>
              </div>
            </div>
            {/* </div> */}

            {/* actionbar */}
            <div
              className={`col p-0 d-none d-xl-block bg-body-tertiary column4`}
              // style={{ maxWidth: "25%" }}
            >
              <div className="d-flex flex-column" style={{ height: "100vh" }}>
                <div className="p-3 border-bottom">
                  <div className="" style={{ height: "1.4rem" }}>
                    {actionbar.header}
                  </div>
                </div>

                <div className="p-3" style={{ overflowY: "auto" }}>
                  {actionbar.data}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}

      {/* media */}
      <div className=""></div>

      {/* footer */}
    </>
  );
}
