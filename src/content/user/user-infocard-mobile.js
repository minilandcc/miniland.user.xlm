// user account
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

import { NumberFormat } from "../../services/srvc-utilities";

import WebbDividerMedium from "../webx/webb-divider-md";
import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbIcon from "../webx/webb-icon";

import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-local";

import { AccountsBaseBalance } from "../../services/srvc-accounts-realm";
import { UserAccountDetails } from "../../services/srvc-user-realm";

const media =
  "https://img.freepik.com/premium-photo/3d-rendering-futuristic-cyberpunk-city-with-blue-pink-light-trail_138734-808.jpg?w=996";
// https://img.freepik.com/free-photo/optical-fiber-background_23-2149301561.jpg?w=826&t=st=1704099957~exp=1704100557~hmac=b5b62fd30c2ab65d76844ebe4cd98c699d6d4643a33cda7bc735c90ec1158568

export default function UserInfocardMobileModule() {
  const navigate = useNavigate();
  const asset = GetLocalUser();
  const team = GetLocalBusiness();
  // console.log(asset)

  const [loader, setLoader] = useState(true);

  const [balance, setBalance] = useState({
    number: "000000",
    ticker: "******",
  });
  const [data, setData] = useState();

  useEffect(() => {
    if (asset) {
      const fetchData = async () => {
        setLoader(true);
        const result = await AccountsBaseBalance({
          data: { user: asset.item },
          srvc: "******",
        });
        //  console.log (result)

        //  const res = await UserAccountDetails({data:{user:asset.item}})
        //  console.log(res)

        if (result.stat) {
          setBalance(result.data.balance);
          setData(result.data);
        }

        setLoader(false);
      };
      fetchData();
    } else {
    }
  }, []);

  // if (loader) return <WebbLoaderSmall/>
  // console.log(asset);

  return (
    <>
      {/* info */}
      {/* <div className="mb-3 d-none">
        <h2 className="text-lead m-0 mx-3">{"Account Details"}</h2>
        <p className="text-normal m-0"></p>
      </div> */}

      {/* data */}
      <div
        className="rounded-xd text-color-wite shadow"
        style={{
          backgroundImage: `url(${media})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          // minHeight: '100vh'
          // height:'100vh'
        }}
      >
        <div
          className="rounded-xd p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="d-flex" style={{}}>
            <div className="me-auto">
              <p className="text-small m-0 d-none">Account Balance</p>
              <p className="m-0 d-none">
                <span className="text-lead text-bold">
                  {NumberFormat(balance?.number / 1000000 || "0", "", "2")}
                </span>
                <span className="ms-1"></span>
                <span className="text-small">{balance?.ticker || "***"}</span>
              </p>
              {/* <p className="m-0 d-md-none">
                <span className="text-lead text-bold">
                  {NumberFormat(balance?.number / 1000000 || "0", "", "2")}
                </span>
                <span className="ms-1"></span>
                <span className="text-small">{balance?.ticker || "***"}</span>
              </p> */}
              <p className="m-0">{asset?.number || "***"}</p>
            </div>

            <div
              className="rounded-xx back-color-wite d-flex justify-content-center align-items-center"
              style={{ height: "1.6rem", width: "1.6rem" }}
            >
              {/* <Jazzicon diameter={33} seed={jsNumberForAddress(asset.item ??= Date.now().toString())} />  */}
              {/* <WebbIcon
                data={{ color: "text-color-next", size: "text-icon-sm" }}
              /> */}
              <i className={`bx bxs-crown text-color-next`}></i>
            </div>
          </div>

          {/* <WebbDividerMedium /> */}
          <WebbDividerSmall />
          <div className="">
            <p className="text-lead text-sm text-bold m-0 d-none d-md-block">
              {asset?.name || "******"}
            </p>
            <p className="text-normal text-sm text-bold m-0 d-md-none">
              {asset?.name || "******"}
            </p>
            {/* <p
              className="m-0"
              style={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {asset?.mail || "******"}
            </p>
            <p className="m-0">{asset?.mobile || "******"}</p> */}
            <p className="text-small m-0">
              Status: {asset?.active ? "Active" : "Inactive"}
            </p>
          </div>
        </div>
      </div>

      <div className="text-small mt-1 d-xl-block d-none text-color-lite">
        {asset?.item || "******"}
      </div>
    </>
  );
}
