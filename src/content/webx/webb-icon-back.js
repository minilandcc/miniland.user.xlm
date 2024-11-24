// site icon

export default function WebbIconBack(props) {

  const data = props.data

  return (
  <>
    <div className="cursor">
      {/* <i className={`bx bx-chevron-left ${data.color} ${data.size}`}></i>     */}
      <i className={`bx bx-chevron-left text-color-tone text-icon-md`}></i>    
    </div>

  </>
  )
}