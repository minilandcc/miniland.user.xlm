//format
const wide = {
  xtra: ["", ""],
  fluid: ["", ""],
  wide: ["", ""],
  medium: ["col-2 d-none d-md-block", "col"],
  small: ["col-3 d-none d-md-block", "col"],
  mini: ["col-4 d-none d-md-block", "col"],
}

const wix = {xtra: [], fluid: [], wide: [], medium: [], small: [], mini: []}


export default function ContentFormat ({header, media, content, footer, name}) {

  // console.log (header, content, footer, name)

  return (
    <>
      {/* header */}
      <div className="sticky-top" style={{backgroundColor: '#B3DFFF', }}>
        
        <div className="py-1">
          
          <div className={header.size === "xtra" ? '': header.size === "fluid" ? 'container-fluid' : 'container'}>
            <div className={header.size === "xtra" ? '' : "row"}>
              <div className={header.size === "xtra" ? '' : wide[header.size][0]}></div>
              <div className={header.size === "xtra" ? '' : wide[header.size][1]}>{header.data}</div>
              <div className={header.size === "xtra" ? '' : wide[header.size][0]}></div>
            </div>
          </div>

        </div>

      </div>


      {/* media */}
      <div className="">
      </div>


      {/* content */}
      <main>
        <div className=""
          style={{
            minHeight:'100vh', 
            backgroundColor: '#8EC5FC', 
            backgroundImage: 'linear-gradient(0deg, #ECCFFF 0%, #B3DFFF 100%)'
          }}
        >
          
        <div className={content.size === "xtra" ? '': content.size === "fluid" ? 'container-fluid' : 'container'}>
            <div className={content.size === "xtra" ? '' : "row"}>
              <div className={content.size === "xtra" ? '' : wide[content.size][0]}></div>
              <div className={content.size === "xtra" ? '' : wide[content.size][1]}>{content.data}</div>
              <div className={content.size === "xtra" ? '' : wide[content.size][0]}></div>
            </div>
          </div>

        </div>
      </main>

      {/* footer */}
      <footer className={`${footer.show ? '' : 'd-none'}`} style={{backgroundColor:'#ECCFFF'}}>
        <div className=""></div>
      </footer>      

    </>
    )
  }