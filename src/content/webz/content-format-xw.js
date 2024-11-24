//format
const wide = {
  xtra: ["", ""],
  fluid: ["", ""],
  wide: ["col-1 d-none d-md-block", "col"],
  medium: ["col-2 d-none d-md-block", "col"],
  small: ["col-3 d-none d-md-block", "col"],
  mini: ["col-4 d-none d-md-block", "col"],
}


export default function ContentFormat ({header, media, content, footer, name}) {

  // console.log (header, content, footer, name)

  return (
    <>
      {/* header */}
      <div className={`sticky-top ${header.show ? '' : 'd-none'}`}  style={{backgroundColor: '#B3DFFF', }}>
        
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
        <div className={`${content.show ? '' : 'd-none'}`}
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
        <div className="" style={{  }}>
          
          <div className={footer.size === "xtra" ? '': footer.size === "fluid" ? 'container-fluid' : 'container'}>
            <div className={footer.size === "xtra" ? '' : "row"}>
              <div className={footer.size === "xtra" ? '' : wide[footer.size][0]}></div>
              <div className={footer.size === "xtra" ? '' : wide[footer.size][1]}>{footer.data}</div>
              <div className={footer.size === "xtra" ? '' : wide[footer.size][0]}></div>
            </div>
          </div>

        </div>

      </footer>     

    </>
    )
  }