// auth - firebase mail link
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./assets-unit.css";

import { NumberFormat } from "../../services/srvc-utilities";

import WebbDividerSmall from "../webx/webb-divider-sm";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-local";

import { UserOnboardStatus } from "../../services/srvc-user-realm";
import { AssetUnits, UnitDetails } from "../../services/srvc-assets-realm";
import { AccountsBaseBalance } from "../../services/srvc-accounts-realm";

import { TransfersAssetCredit } from "../../services/srvc-transfers-funds-realm";
import { TransfersAssetClaim, TransfersAssetCreate } from "../../services/srvc-transfers-assets-realm";
import {
  AssetsOffersStatusSet,
  AssetsOffersDecline,
} from "../../services/srvc-offers-realm";

export default function AssetResaleUnitOfferListModule(props) {
  var item = useParams().id;

  const usxx = GetUserForm();
  const usrx = GetLocalUser();
  const temx = GetLocalBusiness();
  const asset = usxx === "user" ? usrx : temx;
  const datx = props.data;
  const ratex = props.data.rate[0]?.rate.nmbr;
  const navigate = useNavigate();
  const id = props.data.assx.item;
  // console.log(props,"++",)
  const [loader, setLoader] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [success, setSuccess] = useState(false);
  const [done, setDone] = useState(false);

  const [data, setData] = useState();
  const [selectunit, setSelectedUnit] = useState(null);
  const [book, setBook] = useState({ number: 0, ticker: "***" });
  const [mint, setMint] = useState({ number: 0, ticker: "***" });

  const [balance, setBalance] = useState({ number: "0", ticker: "******" });
  const [balancestatus, setBalanceStatus] = useState(false);
  const [onboardstatus, setOnboardStatus] = useState(false);
  const [checkoutstatus, setCheckoutStatus] = useState(false);
  const [unitStatus, setUnitStatus] = useState(false);
  const [lock, setLock] = useState(false);

  const [count, setCount] = useState(props.data.size.nmbr);
  const [rate, setRate] = useState({ number: "0", ticker: "******" });
  const [order, setOrder] = useState({ number: "0", ticker: "******" });

  const [code, setCode] = useState("");
  const [memocode, setMemoCode] = useState();
 

  useEffect(() => {
    if (asset) {
      const fetchData = async () => {
        setLoader(true);
        // console.log (id)

        const result = await UnitDetails({
          data: { item: datx.unit.item, creator: "" },
          srvc: "******",
        });
        // console.log(result);

        if (result.stat) setData(result.data);

        // if (result.stat) {
        //   const bookx = result.data.list?.reduce(
        //     (a, c) => a + parseInt(c.units.book),
        //     0
        //   );
        //   const mintx = result.data.list?.reduce(
        //     (a, c) => a + parseInt(c.units.mint),
        //     0
        //   );

        //   setBook({ ...book, number: bookx });
        //   setMint({ ...mint, number: mintx });
        // }

        setLoader(false);
      };
      fetchData();
    } else {
    }
  }, [id]);

  useEffect(() => {
    if (asset) {
      const fetchData = async () => {
        setOnboardStatus(false);
        var result = await UserOnboardStatus({
          data: { user: asset.item },
          srvc: "******",
        });
        // console.log(result);
        if (result.stat)
          setOnboardStatus(
            result.data.taxx && result.data.adhr && result.data.mntr
          );
      };
      fetchData();
    } else {
    }
  }, []);

  useEffect(() => {
    if (asset) {
      const fetchData = async () => {
        setLoader(true);
        const result = await AccountsBaseBalance({
          data: { user: asset.item },
        });
        // console.log(result)
        if (result.stat) setBalance(result.data.balance);

        setLoader(false);
      };
      fetchData();
    } else {
    }
  }, [id]);

  useEffect(() => {
    if (asset) {
      const fetchData = async () => {
        setBalanceStatus(false);
        setOrder({
          number: count * (rate?.number / 100000 || 0),
          ticker: "******",
        });

        if (parseInt(balance?.number) > 0) {
          setBalanceStatus(true);
          setCheckoutStatus(false);
        }
        if (count == 0) setCheckoutStatus(false);

        if (balance.number < (count || 0) * parseInt(datx?.rate.nmbr || 0))
          setCheckoutStatus(false);
        if (balance.number > (count || 0) * parseInt(datx?.rate.nmbr || 0))
          setCheckoutStatus(true);
      };
      fetchData();
    } else {
    }
  }, [balance, count, rate.number]);


    const handleDecline = async (unit) => {
      var result = await AssetsOffersDecline({
        data: {
          item: item,
        },
        srvc: "******",
      });
      console.log(result);
      if (result.stat) {
        navigate("/user/home");
      }
    };

  const handleSubmit = async () => {
   
    setLoader(true);
    setSubmit(true);

    //console.log(selectunit);
    const unit = data;
    var datx = {
      debit: {
        name: props?.data?.cred?.name,
        mail: props?.data?.cred?.mail || "******",
        item: props?.data?.cred?.item,
      },
      credit: {
        name: props?.data?.debt?.name,
        mail: props?.data?.debt?.mail,
        item: props?.data?.debt?.item,
      },
      count: { number: count, ticker: unit?.units?.ticker || "BRX" },
      rate: {
        number: props?.data?.rate?.nmbr,
        ticker: props?.data?.rate?.tick || "INR",
      },
      meta: {
        name: "unit.sale",
        memo: `brx.unit.${props?.data?.unit?.nmbr || "000000"}.sale.${count}`,
      },
      asset: {
        name: unit?.asset?.name,
        memo: unit?.asset?.memo,
        number: unit?.asset?.number,
        item: id,
      },
      unit: {
        name: unit.meta.name,
        memo: unit.meta.memo,
        item: unit.item,
        number: unit?.number || "000000",
        media: unit.media,
      },
    };
    var result = await TransfersAssetCredit({ data: datx, srvc: "******" });

    if (result.data) {
      var datx = {
        debt: {
          name: props?.data?.debt?.name,
          mail: props?.data?.debt?.mail,
          item: props?.data?.debt?.item,
          account: "",
        },
        cred: {
          name: props?.data?.cred?.name,
          mail: props?.data?.cred?.mail,
          item: props?.data?.cred?.item,
          account: "",
        },
        sale: { number: count },
        rate: { number: props.data.rate.nmbr },
        asset: id,
        offer: item,
        unit: unit.item,
        mode: "resale",
      };
      console.log(datx);
      result = TransfersAssetClaim({data:datx}) //await TransfersAssetCreate({ data: datx });
      console.log(result);
      setCount("0");
      setRate({ number: "0", ticker: "******" });
      setOrder({ number: "0", ticker: "******" });
      setSelectedUnit(null);
      setDone(true);
      if(result.stat)
      {
        navigate("/user/home");
      }
      

    } else setDone(false);

    setSubmit(false);
    setLoader(false);

    // transfer asset
  };

  const balanceDifference =
    (balance.number || 0) - (count || 0) * parseInt(datx?.rate.nmbr || 0);

  // console.log("Balance diff---------->", balanceDifference);

  // console.log(selectunit);

  if (loader)
    return (
      <>
        <div className="p-3 back-color-wite rounded-xd border align-middle">
          <span className="align-middle text-lead">
            <i className="bx bxs-info-circle text-color-wait"></i>
          </span>
          <span className="ms-1 text-color-tone">Please Wait...</span>
        </div>
      </>
    );
  if (!loader && (!data || data.length === 0))
    return (
      <>
        <div className="p-3 back-color-wite rounded-xd border align-middle">
          <span className="align-middle text-lead">
            <i className="bx bxs-info-circle text-color-wait"></i>
          </span>
          <span className="ms-1 text-color-tone">No Units Listed</span>
        </div>
      </>
    );

  return (
    <>
      {/* info */}
      <div className="d-none">
        <p className="text-lead text-color-main m-0 mx-3">Units & Data</p>
      </div>

      {/* data */}
      <div className="rounded-xd back-color-wite border">
        <div>
          <div>
            <div className="d-flex rounded p-3 hitone">
              <div
                className="rounded-xx"
                style={{ width: "2.4rem", height: "2.4rem" }}
              >
                <div className="media-cube">
                  <img
                    src={data.media.link}
                    className="rounded-xx shadow-sm"
                    alt={data.name || ""}
                  ></img>
                </div>
              </div>

              <div className="ms-2 w-75">
                <p
                  className="text-bold m-0 text-sm"
                  style={{ lineHeight: "1.25rem" }}
                >
                  {data.meta.name}
                </p>
                <p
                  className="text-small m-0 text-sm"
                  style={{ lineHeight: "1  rem" }}
                >
                  <span className="">
                    {NumberFormat(
                      (data?.units?.mint || 0) - (data?.units?.book || 0),
                      "",
                      "0"
                    )}{" "}
                    SQFT
                  </span>
                  <span className="">{" @ "}</span>
                  <span className="">
                    {NumberFormat(
                      props?.data?.rate?.nmbr / 1000000 || 0,
                      "",
                      "0"
                    )}{" "}
                    {props?.data?.rate?.tick || "*"}/SQFT
                  </span>
                </p>
              </div>

              <div className="text-end w-25 d-none">
                <p className="m-0 text-sm d-none">
                  <span className="text-bold ">{data?.units?.book || 0}</span>
                  <span> </span>
                  <span className="text-small text-color-tone">{"SQFT"}</span>
                  <span className="text-small text-color-tone d-none">
                    {data?.units?.ticker || "**"}
                  </span>
                </p>
                <p className="m-0 text-sm">
                  <span className="">{data?.units?.mint || 0}</span>
                  <span> </span>
                  <span className="text-small text-color-tone">{"SQFT"}</span>
                  <span className="text-small text-color-tone d-none">
                    {data?.units?.ticker || "**"}
                  </span>
                </p>
              </div>

              <div
                className="ms-auto text-end align-middle d-none rounded-xx p-1"
                style={{ width: "2.4rem", height: "2.4rem" }}
              >
                <span className="text-small align-middle">
                  <i className="bx bxs-plus-circle text-icon-md text-primary"></i>
                </span>
              </div>

              <div className="ms-auto text-end d-none">
                <p className="text-bold m-0 text-sm">
                  <span>{data?.rate?.number / 1000000 || 0}</span>
                  <span> </span>
                  <span>{item?.rate?.ticker || "*"}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="modal-body m-0 p-0 ">
            {/* media */}
            <div className="media-banner">
              <img src={data?.media?.link} className="" alt={"..."}></img>
            </div>

            {/* info */}
            <div className="p-2 px-3">
              <p className="text-wd m-0 mb-2">{data?.meta?.memo || "******"}</p>
              <p className="text-bold m-0 mb-1">
                Rate:{" "}
                {NumberFormat(
                  parseFloat(datx?.rate?.nmbr) / 1000000 || "0",
                  "w",
                  2
                )}{" "}
                {(data?.rate?.ticker).toUpperCase() || "******"}
              </p>
              <p className="text-small text-bold m-0 d-none">
                {data?.number || Date.now().toString()}
              </p>
            </div>
            <div className="border-bottom mx-3 mb-2"></div>

            {/* onboard check */}
            <div className={`p-2 px-3 mb-3 ${onboardstatus ? "d-none" : ""}`}>
              <p className="m-0">
                <span className="text-bold text-color-error">
                  KYC & Onboarding Pending
                </span>
              </p>
              <p className="m-0">
                <span className="">
                  Please Visit Your Profile and complete Pending steps.
                </span>
              </p>
            </div>

            {/* balance check */}
            <div className={`p-2 px-3 pt-0 ${onboardstatus ? "" : "d-none"}`}>
              <p className="text-small m-0">Available Balance</p>
              <p className="text-small m-0">
                <span className="text-bold text-normal">
                  {NumberFormat((balance.number || 0) / 1000000, "", "2")}
                </span>
                <span> </span>
                <span className="text-small text-uppercase">
                  {data?.rate?.ticker || "*"}
                </span>
                <span> </span>
                <span
                  className={
                    balancestatus && checkoutstatus
                      ? "d-none"
                      : "text-color-error"
                  }
                >
                  (Low Balance)
                </span>
              </p>
            </div>
            <div className={`p-2 px-3 pt-0 ${data ? "d-none" : "d-none"}`}>
              <p className="m-0">
                <span className="text-bold text-color-error">Low Balance</span>
              </p>
              <p className="m-0">
                <span className="">
                  Please Add Funds to Your Miniland Account
                </span>
              </p>
            </div>

            <div className={data?.status?.book ? "d-none" : ""}>
              <p className="ms-3 text-danger">booking has not started</p>
            </div>

            {/* sale */}
            <div
              className={`p-2 px-3 ${
                onboardstatus && balancestatus && data?.status?.book
                  ? ""
                  : "d-none"
              }`}
            >
              <p className="text-bold m-0">Complete Purchase</p>
              <div className="">
                <p className="m-0">
                  <span className="text-bold text-lead">
                    {NumberFormat(
                      ((count || 0) * parseInt(datx?.rate.nmbr || 0)) / 1000000,
                      "",
                      "2"
                    )}
                  </span>
                  <span> </span>
                  <span className="text-small text-uppercase">
                    {data?.rate?.ticker || "*"}
                  </span>
                </p>
              </div>

              <div className="">
                <div className="d-flex justify-content-between">
                  <div className="">
                    <p className="text-color-next m-0">{"Select Units"}</p>
                  </div>
                  <div className="">
                    <p className="m-0">
                      <span className="text-color-next text-lead text-bold ">
                        {NumberFormat(count || 0, "", "0")}
                      </span>
                      <span>{"/"}</span>
                      <span className="text-small">
                        {datx?.size?.nmbr || "0"}
                      </span>
                    </p>
                  </div>
                </div>
                <div class="progress" style={{width: "100%", height:'10px'}}>
                  <div class="progress-bar" role="progressbar" style={{width: "100%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>

                
              </div>
              <div className="d-flex justify-content-between ">
                <div className="">0</div>
                <div className="">
                  <p className="m-0">{datx?.size?.nmbr}</p>
                </div>
              </div>

              <div className={`mb-3 d-none`}>
                <label className="form-label text-small ">
                  Or Enter Units here
                </label>
                <input
                  type="text"
                  className="form-control height-md"
                  style={{ fontSize: "0.9rem", height: "2.7rem" }}
                  value={count}
                  onChange={({ target }) => {
                    let inputValue = target.value;
                    if (inputValue.startsWith("0")) {
                      inputValue = inputValue.replace(/^0+/, "");
                    }
                    setCount(datx?.size?.nmbr);
                    //setCount(inputValue);
                  }}
                  onKeyPress={(event) => {
                    if (
                      (event.charCode < 48 || event.charCode > 57) &&
                      event.charCode !== 0
                    ) {
                      event.preventDefault();
                    }
                    // Check the threshold before updating the count state
                    const inputValue =
                      event.target.value + String.fromCharCode(event.charCode);
                    setUnitStatus(false);
                    const newValue = parseInt(inputValue, 10);
                    const threshold = datx?.size?.nmbr;
                    if (newValue > threshold) {
                      setUnitStatus(true);
                    }
                  }}
                  disabled={loader || submit || lock}
                  placeholder=""
                />
                {unitStatus && (
                  <div className="text-danger">
                    Warning: Input exceeds unit limit
                  </div>
                )}
              </div>
            </div>

            {/* coming soon */}
            <div
              className={`p-2 px-3 ${
                onboardstatus &&
                balancestatus &&
                checkoutstatus &&
                data?.status?.book &&
                !lock &&
                balanceDifference > 0
                  ? ""
                  : "d-none"
              }`}
            >
              <div className="d-flex align-items-center">
                <div className="">
                  <button
                    className="btn btn-outline-danger rounded-xx px-4 text-small w-100"
                    onClick={() => handleDecline()}
                  >
                    {"Cancel"}
                  </button>
                </div>

                <div className="ms-auto" style={{ width: "100px" }}>
                  <button
                    className="btn btn-primary rounded-xx text-small w-100"
                    disabled={count == 0 || balanceDifference < 0}
                    onClick={() => {
                      setLock(true);
                      handleSubmit();
                    }}
                  >
                    Buy
                  </button>
                </div>
              </div>

              <WebbDividerSmall />
            </div>

            {/* code + balance status ok */}
            <div
              className={`p-2 px-3 ${
                onboardstatus && balancestatus && checkoutstatus && lock
                  ? ""
                  : "d-none"
              }`}
            >
              {/* <p className="text-small m-0 mb-1">
                Please enter your account passkey to authorize
              </p>

              <div className={`mb-3`}>
                <input
                  type="text"
                  className="form-control height-md  "
                  style={{ fontSize: "0.9rem", height: "2.7rem" }}
                  value={code}
                  onChange={({ target }) => {
                    setCode(target.value);
                    setMemoCode("");
                  }}
                  disabled={loader || submit}
                  placeholder="******"
                ></input>
              </div> */}

              <div className="d-flex my-3">
                <div className="">
                  <button
                    className="btn btn-sm btn-outline-secondary px-4 rounded-xx"
                    onClick={() => setLock(false)}
                  >
                    {"Edit"}
                  </button>
                </div>

                <div className="ms-auto">
                  <button
                    className="btn btn-sm btn-primary px-4 rounded-xx text-small"
                    disabled={count == 0 || code == "" || code.length !== 6}
                    onClick={() => {
                      handleSubmit();
                      // closeModal();
                    }}
                  >
                    {"Authorize"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
