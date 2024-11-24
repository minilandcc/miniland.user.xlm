// web navigation
import { useEffect, useState } from "react";
import { Link, Route, useLocation } from "react-router-dom";

import { GetUserForm, ActiveSiteLink } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-local";

const listNavs = require("../../data.static/navs-header-xw.json").data;

export default function WebbMenuMobile(props) {
  const location = useLocation();
  const linx = location.pathname.split("/")[2];
  const form = location.pathname.split("/")[1];
  // console.log (form)
  const data = listNavs.filter((item) => item.user.includes(form) && item.actv);
  // console.log (data)
  // GetEnvironment()

  return (
    <>
      {/* header-large */}
      <div className="back-color-wite p-1 d-md-none rounded-wd">
        {/* <div className={`row row-cols-${data.length} g-1`}> */}
        <div className="">
          {data &&
            data.map((item, i) => (
              <div className="col text-center" key={i}>
                <Link
                  to={`/${form}/${item.link}`}
                  style={{ pointerEvents: `${item.actv ? "" : "none"} ` }}
                  className={`w-100 h-100 border-none text-center
            text-decoration-none m-0 ${item.actv ? "" : "text-color-tone"}`}
                >
                  <div className="px-2 py-2 mb-0 rounded-wd back-color-wite hitone d-flex align-items-center justify-content-between">
                    <div className=" d-flex align-items-center gap-2">
                      <i
                        className={`m-0 p-0 ${item.icon} ${
                          item.link === linx
                            ? "text-color-next"
                            : "text-color-tone"
                        }`}
                        style={{ fontSize: "1.6em" }}
                      ></i>

                      <p
                        className={`m-0 p-0 text-dark text-nowrap`}
                        style={{ lineHeight: "0.25rem" }}
                      >
                        {item.name}
                      </p>
                    </div>
                    <i className="bx bx-chevron-right" style={{fontSize:"20px"}}></i>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
