import React from 'react'
import { Link } from "react-router-dom";

const MenuButtons = () => {
  return (
    <>
      <Link
        to={"/user/account"}
        className="px-2 py-2 mb-0 mt-2 rounded-wd back-color-wite hitone d-flex align-items-center justify-content-between"
      >
        <div className=" d-flex align-items-center gap-2">
          <i
            className={`m-0 p-0 bx bx-wallet`}
            style={{ fontSize: "1.6em" }}
          ></i>

          <p
            className={`m-0 p-0 text-dark text-nowrap`}
            style={{ lineHeight: "0.25rem" }}
          >
            Account details
          </p>
        </div>
        <i className="bx bx-chevron-right" style={{ fontSize: "20px" }}></i>
      </Link>
      <Link
        to={"/auth/x"}
        className="px-2 py-2 mb-0 mt-2 rounded-wd back-color-wite hitone d-flex align-items-center justify-content-between"
      >
        <div className=" d-flex align-items-center gap-2">
          <i
            className={`m-0 p-0 bx bx-user-circle`}
            style={{ fontSize: "1.6em" }}
          ></i>

          <p
            className={`m-0 p-0 text-dark text-nowrap`}
            style={{ lineHeight: "0.25rem" }}
          >
            Logout
          </p>
        </div>
        <i className="bx bx-chevron-right" style={{ fontSize: "20px" }}></i>
      </Link>
    </>
  );
}

export default MenuButtons;