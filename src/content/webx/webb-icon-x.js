// site logo

export default function WebbIconX(props) {

  const data = props.data

  return (
  <>
    <div className="" >
      <i className={`bx bx-x ${data?.color || 'text-color-tone'} ${data?.size || 'text-icon-md'}`}></i>      
    </div>

  </>
  )
}