// auth - firebase mail link
import "./assets-unit.css";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { NumberFormat } from "../../services/srvc-utilities";

import WebbDividerSmall from "../webx/webb-divider-sm";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-local";

import { UserOnboardStatus } from "../../services/srvc-user-realm";
import { AssetUnits } from "../../services/srvc-assets-realm";
import { AccountsBaseBalance } from "../../services/srvc-accounts-realm";

import { TransfersAssetCredit } from "../../services/srvc-transfers-funds-realm";
import { TransfersAssetClaim, TransfersAssetCreate } from "../../services/srvc-transfers-assets-realm";

export default function AssetUnitListModule() {
  const usxx = GetUserForm();
  const usrx = GetLocalUser();
  const temx = GetLocalBusiness();
  const asset = usxx === "user" ? usrx : temx;

  const navigate = useNavigate();
  const { id } = useParams();

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

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

  const [count, setCount] = useState(0);
  const [rate, setRate] = useState({ number: "0", ticker: "******" });
  const [order, setOrder] = useState({ number: "0", ticker: "******" });

  const [code, setCode] = useState("");
  const [codetrxn, setCodeTransfer] = useState();
  const [memocode, setMemoCode] = useState();

  useEffect(() => {
    if (asset) {
      const fetchData = async () => {
        setLoader(true);
        // console.log (id)

        const result = await AssetUnits({
          data: { asset: id, creator: "" },
          srvc: "******",
        });
        console.log(result);

        if (result.stat) setData(result.data.list);

        if (result.stat) {
          const bookx = result.data.list.reduce(
            (a, c) => a + parseInt(c.units.book),
            0
          );
          const mintx = result.data.list.reduce(
            (a, c) => a + parseInt(c.units.mint),
            0
          );

          setBook({ ...book, number: bookx });
          setMint({ ...mint, number: mintx });
        }

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
        console.log(result);
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

        if (balance.number < (count || 0) * parseInt(rate?.number || 0))
          setCheckoutStatus(false);
        if (balance.number > (count || 0) * parseInt(rate?.number || 0))
          setCheckoutStatus(true);
      };
      fetchData();
    } else {
    }
  }, [balance, count, rate.number]);

  const handleModal = async (unit) => {
    setSelectedUnit(data.find((x) => x.item == unit));
    setCount(0);
    setOrder({ ...order, number: "0" });
    setRate(
      data.find((x) => x.item == unit)?.rate || {
        number: "0",
        ticker: "******",
      }
    );
  };

  const handleSubmit = async () => {
    // check account balance
    // check account code
    // check unit claim
    // transfer funds
    setLoader(true);
    setSubmit(true);

    //console.log(selectunit);
    const unit = selectunit;
    var datx = {
      credit: {
        name: unit?.creator?.name,
        mail: unit?.creator?.mail || "******",
        item: unit?.creator?.item,
      },
      debit: { name: asset.name, mail: asset.mail, item: asset.item },
      count: { number: count, ticker: unit?.units?.ticker || "BRX" },
      rate: { number: unit?.rate?.number, ticker: unit?.rate?.ticker || "INR" },
      meta: {
        name: "unit.sale",
        memo: `brx.unit.${unit?.number || "000000"}.sale.${count}`,
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

    console.log(datx);
    var result = await TransfersAssetCredit({ data: datx, srvc: "******" });
    console.log(result);

    if (result.data) {
      var datx = {
        debt: {
          name: unit?.creator?.name,
          mail: unit?.creator?.mail || "******",
          item: unit?.creator?.item,
          account: "",
        },
        cred: {
          name: asset.name,
          mail: asset.mail,
          item: asset.item,
          account: "",
        },
        sale: { number: count },
        asset: id,
        unit: unit.item,
      };
      console.log(datx);
      result = await TransfersAssetClaim({data:datx}) // await TransfersAssetCreate({ data: datx });
      console.log(result);
      
      setCount("0");
      setRate({ number: "0", ticker: "******" });
      setOrder({ number: "0", ticker: "******" });
      setSelectedUnit(null);

      setDone(true);
    } else setDone(false);

    setSubmit(false);
    setLoader(false);

    // transfer asset
  };

  console.log(selectunit);

  if (loader)
    return (
      <>
        <div
          className="p-3 back-color-wite rounded-xd border align-middle"
          style={{}}
        >
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
        <div
          className="p-3 back-color-wite rounded-xd border align-middle"
          style={{}}
        >
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
        <div className="mx-3 mt-3 d-md-none d-block">
          <p className="m-0 p-0 text-bold">Unit Sales (Total)</p>
        </div>

        <div className="p-3 d-md-none d-block">
          <div className="d-flex mb-1">
            <div className="">
              <p className="p-0 m-0">
                <span>SOLD: {NumberFormat(book?.number || 0, "", "0")}</span>
                <span> </span>
                <span>{`(${((book.number / mint.number) * 100).toFixed(
                  0
                )}%)`}</span>
              </p>
            </div>
            <div className="ms-auto">
              <p className="p-0 m-0">
                <span>{NumberFormat(mint?.number || 0, "", "0")}</span>
                <span className="text-small text-color-tone ms-1">
                  {"SQFT"}
                </span>
              </p>
            </div>
          </div>

          <div className="mb-1">
            <div
              className="progress"
              role="progressbar"
              style={{ height: "0.27rem" }}
            >
              <div
                className="progress-bar progress-bar-striped progress-bar-animated back-color-success"
                style={{
                  width: `${(book.number / mint.number) * 100}%`,
                  height: "0.27rem",
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* <div className="p-3">
          <p className="m-0 p-0 text-bold"> Unit Available</p>
          <p className="m-0 p-0 text-small">
            Select Individual Unit to review details and buy
          </p>
        </div> */}
        {/* <div className="border-bottom"></div> */}

        {/* units */}
        <div className="">
          {data &&
            data.map((item, i) => (
              // <div className="cursor " key={i} onClick={() => handleClick(item.item)} >
              <div
                className="cursor"
                key={i}
                // data-bs-toggle="modal"
                // data-bs-target="#exampleModal"
                onClick={() => handleModal(item.item)}
              >
                <div className="d-flex rounded p-3 hitone">
                  <div
                    className="rounded-xx"
                    style={{ width: "2.4rem", height: "2.4rem" }}
                  >
                    <div className="media-cube">
                      <img
                        src={item.media.link}
                        className="rounded-xx shadow-sm"
                        alt={item.name || ""}
                      ></img>
                    </div>
                  </div>

                  <div className="ms-2 w-75">
                    <p
                      className="text-bold m-0 text-sm"
                      style={{ lineHeight: "1.25rem" }}
                    >
                      {item.meta.name}
                    </p>
                    <p
                      className="text-small m-0 text-sm"
                      style={{ lineHeight: "1  rem" }}
                    >
                      <span className="">
                        {NumberFormat(
                          (item?.units?.mint || 0) - (item?.units?.book || 0),
                          "",
                          "0"
                        )}{" "}
                        SQFT
                      </span>
                      <span className="">{" @ "}</span>
                      <span className="text-uppercase">
                        {NumberFormat(
                          item?.rate?.number / 1000000 || 0,
                          "",
                          "0"
                        )}{" "}
                        {item?.rate?.ticker || "*"}/SQFT
                      </span>
                    </p>
                  </div>

                  <div className="text-end w-25 d-none">
                    <p className="m-0 text-sm d-none">
                      <span className="text-bold ">
                        {item?.units?.book || 0}
                      </span>
                      <span> </span>
                      <span className="text-small text-color-tone">
                        {"SQFT"}
                      </span>
                      <span className="text-small text-color-tone d-none text-uppercase">
                        {item?.units?.ticker || "**"}
                      </span>
                    </p>
                    <p className="m-0 text-sm">
                      <span className="">{item?.units?.mint || 0}</span>
                      <span> </span>
                      <span className="text-small text-color-tone">
                        {"SQFT"}
                      </span>
                      <span className="text-small text-color-tone d-none text-uppercase">
                        {item?.units?.ticker || "**"}
                      </span>
                    </p>
                  </div>

                  <div className="ms-auto text-end mt-1">
                    <span
                      className="btn btn-primary px-4 rounded-xx text-small align-middle cursor"
                      // onClick={() => handleClick(item.link)}
                      onClick={openModal}
                    >
                      {"Buy"}
                    </span>
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
                    <p className="text-bold m-0 text-sm text-uppercase">
                      <span>{item?.rate?.number / 1000000 || 0}</span>
                      <span> </span>
                      <span>{item?.rate?.ticker || "*"}</span>
                    </p>
                  </div>
                </div>
                <div
                  className={i < data.length - 1 ? "border-bottom" : ""}
                ></div>
              </div>
            ))}
        </div>

        {/* modal view */}

        {isModalOpen && (
          <div className="modal-overlay">
            <div  className="modal-dialog modal-dialog-scrollable mt-0 pt-0 rounded-xd w-100">
              <div
                className="modal-content p-0"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-header text-lead m-0 p-0 mx-3 align-middle">
                  <p className="text-normal text-bold mt-3">
                    {selectunit?.meta?.name || "******"}
                  </p>
                  <button
                    type="button"
                    className="btn-close m-0 p-0"
                    onClick={closeModal}
                    style={{ fontSize: "1rem" }}
                    // data-bs-dismiss="modal"
                    //   aria-label="Close"
                  ></button>
                </div>
                <div
                  // className="modal-body m-0 p-0  "
                  className="scrollbar"
                  style={{ overflowY: "scroll", height: "450px" }}
                >
                  {/* media */}
                  <div className="media-banner">
                    <img
                      src={selectunit?.media?.link}
                      className=""
                      alt={selectunit?.meta?.name || "******"}
                    ></img>
                  </div>

                  {/* info */}
                  <div className="p-2 px-3">
                    <p className="text-wd m-0 mb-2">
                      {selectunit?.meta?.memo || "******"}
                    </p>
                    <p className="text-bold m-0 mb-1">
                      Rate: {NumberFormat(rate?.number / 1000000 || "0", "", 2)}{" "}
                      {(rate?.ticker).toUpperCase() || "******"}
                    </p>
                    <p className="text-small text-bold m-0 d-none">
                      {selectunit?.number || Date.now().toString()}
                    </p>
                  </div>
                  <div className="border-bottom mx-3 mb-2"></div>

                  {/* onboard check */}
                  <div
                    className={`p-2 px-3 mb-3 ${onboardstatus ? "d-none" : ""}`}
                  >
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
                  <div
                    className={`p-2 px-3 pt-0 ${onboardstatus ? "" : "d-none"}`}
                  >
                    <p className="text-small m-0">Available Balance</p>
                    <p className="text-small m-0">
                      <span className="text-bold text-normal">
                        {NumberFormat((balance.number || 0) / 1000000, "", "2")}
                      </span>
                      <span> </span>
                      <span className="text-small text-uppercase">
                        {selectunit?.rate?.ticker || "*"}
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
                  <div
                    className={`p-2 px-3 pt-0 ${
                      selectunit ? "d-none" : "d-none"
                    }`}
                  >
                    <p className="m-0">
                      <span className="text-bold text-color-error">
                        Low Balance
                      </span>
                    </p>
                    <p className="m-0">
                      <span className="">
                        Please Add Funds to Your Miniland Account
                      </span>
                    </p>
                  </div>

                  <div className={selectunit?.status?.book ? "d-none" : ""}>
                    <p className="ms-3 text-danger">booking has not started</p>
                  </div>

                  {/* sale */}
                  <div
                    className={`p-2 px-3 ${
                      onboardstatus && balancestatus && selectunit?.status?.book
                        ? ""
                        : "d-none"
                    }`}
                  >
                    <p className="text-bold m-0">Complete Purchase</p>
                    <div className="">
                      <p className="m-0">
                        <span className="text-bold text-lead">
                          {NumberFormat(
                            ((count || 0) *
                              parseInt(selectunit?.rate?.number || 0)) /
                              1000000,
                            "",
                            "2"
                          )}
                        </span>
                        <span> </span>
                        <span className="text-small text-uppercase">
                          {selectunit?.rate?.ticker || "*"}
                        </span>
                      </p>
                    </div>

                    <div className="">
                      <div className="d-flex justify-content-between">
                        <div className="">
                          <p className="text-color-next m-0">
                            {"Select Units"}
                          </p>
                        </div>
                        <div className="">
                          <p className="m-0">
                            <span className="text-color-next text-lead text-bold ">
                              {NumberFormat(count || 0, "", "0")}
                            </span>
                            <span>{"/"}</span>
                            <span className="text-small">
                              {NumberFormat(
                                selectunit?.units?.mint -
                                  selectunit?.units?.book,
                                "",
                                "0"
                              )}
                            </span>
                          </p>
                        </div>
                      </div>

                      <input
                        type="range"
                        className="form-range"
                        min="0"
                        max={selectunit?.units?.mint - selectunit?.units?.book}
                        value={count || 0}
                        onChange={({ target }) => {
                          setCount(target.value.toString());
                        }}
                        disabled={lock}
                        step="10"
                      ></input>
                    </div>
                    <div className="d-flex justify-content-between ">
                      <div className="">0</div>
                      <div className="">
                        <p className="m-0">
                          {NumberFormat(
                            selectunit?.units?.mint - selectunit?.units?.book,
                            "",
                            "0"
                          )}
                        </p>
                      </div>
                    </div>

                    <div className={`mb-3`}>
                      <label className="form-label text-small">
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
                          setCount(inputValue);
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
                            event.target.value +
                            String.fromCharCode(event.charCode);
                          setUnitStatus(false);
                          const newValue = parseInt(inputValue, 10);
                          const threshold =
                            selectunit?.units?.mint - selectunit?.units?.book;
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
                      selectunit?.status?.book &&
                      !lock
                        ? ""
                        : "d-none"
                    }`}
                  >
                    <div className="d-flex">
                      <div className="mt-2">
                        <span
                          className="btn btn-sm btn-outline-secondary rounded-xx border-none d-none"
                          data-bs-dismiss="modal"
                          // onClick={() => handleSubmit()}
                        >
                          {"Cancel"}
                        </span>
                      </div>

                      <div className="ms-auto">
                        <button
                          className="btn btn-sm btn-primary px-4 rounded-xx text-small"
                          disabled={count == 0}
                          onClick={() => setLock(true)}
                        >
                          {"Continue"}
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
                    <p className="text-small m-0 mb-1">
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
                    </div>

                    <div className="d-flex">
                      <div className="mt-2">
                        <span
                          className="btn btn-sm btn-outline-secondary rounded-xx border-none"
                          onClick={() => setLock(false)}
                        >
                          {"Edit"}
                        </span>
                      </div>

                      <div className="ms-auto">
                        <button
                          className="btn btn-sm btn-primary px-4 rounded-xx text-small"
                          disabled={
                            count == 0 || code == "" || code.length !== 6
                          }
                          onClick={() => {
                            handleSubmit();
                            closeModal();
                          }}
                        >
                          {"Authorize"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* modal footer */}
                <div className="modal-footer text-start border-none d-flex d-none">
                  <div className="">
                    <p className="text-small text-secondary text-start m-0">
                      {selectunit?.number || "******"}
                    </p>
                  </div>
                  <div className=""></div>
                </div>

                <WebbDividerSmall />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
