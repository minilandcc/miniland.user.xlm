// auth - firebase mail link
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";
import WebbLoaderMedium from "../webx/webb-loader-md";
import WebbLoaderSmall from "../webx/webb-loader-sm";
import WebbModuleInfo from "../webx/webb-module-info";
import FormNeeded from "../webx/form-needed";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-local";

const listactions = require("../../data.static/data-user-actions.json").data;

export default function UserActionsMobileModule() {
  const navigate = useNavigate();
  const usxx = GetUserForm();
  const usrx = GetLocalUser();
  const temx = GetLocalBusiness();
  const asset = usxx === "user" ? usrx : temx;

  const [loader, setLoader] = useState(true);
  const [data, setData] = useState();

  // console.log(listactions.filter(x => x.user.includes(asset.role)))

  useEffect(() => {
    if (asset) {
      const fetchData = async () => {
        setLoader(true);

        const result = listactions.filter((x) => x.user.includes(asset.role));
        setData(result);

        setLoader(false);
      };
      fetchData();
    } else {
    }
  }, []);

  const handleClick = (live, link) => {
    if (live) navigate(`/${asset.role}/${link}`);
  };

  if (loader) return <></>;

  return (
    <>
      <div className="back-color-wite rounded-wd">
        <div className="container-fluid">
          <div className="row">
            {data &&
              data.slice(0, 1).map((item, i) =>
                item.actv ? (
                  <div className="col text-center" key={i}>
                    <div
                      className={`w-100 h-100 border-none text-center text-decoration-none m-0 p-0            
            ${item.live ? "text-color-next" : "text-color-tint"} ${
                        item.live ? "hirich cursor" : ""
                      }`}
                      onClick={() => handleClick(item.live, item.link)}
                    >
                      <div className="py-2 w-100 mb-0 rounded-wd back-color-wite hitone d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-2">
                          <i
                            className={`m-0 p-0 ${item.icon} ${
                              item.live ? "text-color-next" : "text-color-tone"
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
                        <i
                          className="bx bx-chevron-right"
                          style={{ fontSize: "20px" }}
                        ></i>
                      </div>
                      {/* </div> */}
                    </div>

                    {/* <Link
                      to={`/${asset.role}/${item.link}`}
                      style={{ pointerEvents: `${item.actv ? "" : "none"} ` }}
                      className={`w-100 h-100 border-none text-center
            text-decoration-none m-0 p-0 ${
              item.actv ? "text-color-next" : "text-color-tone"
            }`}
                    ></Link> */}
                  </div>
                ) : (
                  ""
                )
              )}
          </div>
        </div>
      </div>
    </>
  );
}
