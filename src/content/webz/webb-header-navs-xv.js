// web nav
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-local";

const listNavs = require("../../data.static/navs-header-xw.json").data;

export default function WebbHeaderNavs(props) {
  const usxx = GetUserForm();
  const usrx = GetLocalUser();
  const temx = GetLocalBusiness();
  const asset = usxx === "user" ? usrx : temx;

  const location = useLocation();
  const linx = location.pathname.split("/")[2];
  const form = location.pathname.split("/")[1];

  const data = listNavs.filter(
    (item) => item.user.includes(form) && item.actv && item.show.main
  );

  return (
    <>
      {/* header-large */}
      <nav className="nav flex-column text-center">
        {data &&
          data.map((item, i) =>
            item.actv ? (
              <Link
                to={`/${asset.role}/${item.link}`}
                key={i}
                className={`nav-link m-0 p-0 ${
                  item.code === linx
                    ? "back-color-next text-color-wite"
                    : "text-dark"
                }`}
              >
                <div
                  className={`p-3 pb-2 ${
                    item.code === linx
                      ? "back-color-next text-color-wite"
                      : "hidark"
                  }`}
                >
                  <i
                    className={`${item.icon}${item.code === linx ? "" : ""}`}
                    style={{ fontSize: "1.5rem", lineHeight: "0rem" }}
                  ></i>

                  <p className="m-0 p-0 text-mini">{item.name}</p>
                </div>
              </Link>
            ) : (
              ""
            )
          )}
      </nav>
    </>
  );
}
