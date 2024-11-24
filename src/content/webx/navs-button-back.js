// navs

export default function NavsButtonBack({ disabled }) {
  return (
    <>
      <div className="back-color-wite border-0 rounded-xx">
        <span
          className={`btn btn-sm border-0 rounded-xx p-2 ${
            disabled ? "disabled" : "hidark"
          }`}
          style={{ height: "2.4rem", width: "2.4rem" }}
        >
          <i className="bx bx-chevron-left text-lead"></i>
        </span>
      </div>
    </>
  );
}
