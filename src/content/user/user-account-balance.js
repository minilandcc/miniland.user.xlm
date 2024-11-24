// user account
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { NumberFormat } from "../../services/srvc-utilities";

import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-local";

import { AccountsBaseBalance } from "../../services/srvc-accounts-realm";
import { Link } from "react-router-dom";

const media =
  "https://img.freepik.com/premium-photo/3d-rendering-futuristic-cyberpunk-city-with-blue-pink-light-trail_138734-808.jpg?w=996";
// https://img.freepik.com/free-photo/optical-fiber-background_23-2149301561.jpg?w=826&t=st=1704099957~exp=1704100557~hmac=b5b62fd30c2ab65d76844ebe4cd98c699d6d4643a33cda7bc735c90ec1158568

export default function UserAccountBalance() {
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
    
//   console.log(asset);

  return (
    <>
      {/* <div className="rounded-xd">
        <div className="">
          <div className=""> */}
            <div className="back-color-wite p-3 rounded-xd w-100">
              <p className="text-small m-0">Account Balance</p>
              <p className="m-0">
                <span className="text-lead text-bold">
                  {NumberFormat(balance?.number / 1000000 || "0", "", "2")}
                </span>
                <span className="ms-1"></span>
                <span className="text-small">{balance?.ticker || "***"}</span>
              </p>
            <Link
              to="/user/account/credit"
              className="mt-1 text-decoration-underline text-small d-md-none d-block"
            >
              Add Funds
            </Link>
            </div>

          {/* </div>
        </div>
      </div> */}
    </>
  );
}
