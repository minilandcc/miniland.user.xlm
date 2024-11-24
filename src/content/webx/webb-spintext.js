//loader
export default function WebbSpinText() {
 
    return (
    <>
      {/* spinner */}
      <div className="spinner-border spinner-border-sm text-color-tone" role="status" style={{borderWidth:'0.06rem'}}>
          <span className="visually-hidden">Loading...</span>
        </div>
      <span className="ms-2"></span>
      <span className="text-color-tone">Please Wait...</span>
    </>
    )
  }