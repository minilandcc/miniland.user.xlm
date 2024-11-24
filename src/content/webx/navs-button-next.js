/// navs

export default function NavsButtonNext({disabled}) {

   
  return (
    <>
      <div className="back-color-wite rounded-xx">
        <span
          className={`btn btn-sm border-0 rounded-xx p-2 ${
            disabled ? "disabled" : "hidark"
          }`}
          style={{ height: "2.4rem", width: "2.4rem" }}
        >
          <i className="bx bx-chevron-right text-lead"></i>
        </span>
      </div>
    </>
  );
}