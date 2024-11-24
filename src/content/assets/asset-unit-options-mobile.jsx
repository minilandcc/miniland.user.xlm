import { useEffect, useState } from "react";
import "./assets-unit.css";
import { Link, useNavigate, useParams } from "react-router-dom";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-local";
import FormNeeded from "../webx/form-needed";
import {
  AssetsOffersCreate,
  CreateIndividualOffers,
} from "../../services/srvc-offers-realm";
import { TransfersFundAssetListUnits } from "../../services/srvc-transfers-funds-realm";
import { AssetUnits, UnitDetails } from "../../services/srvc-assets-realm";
import { UserOnboardStatus } from "../../services/srvc-user-realm";
import { AccountsBaseBalance } from "../../services/srvc-accounts-realm";

import { TransfersAssetCredit } from "../../services/srvc-transfers-funds-realm";
import { TransfersAssetCreate } from "../../services/srvc-transfers-assets-realm";
import { NumberFormat } from "../../services/srvc-utilities";
import WebbDividerSmall from "../webx/webb-divider-sm";
import { TokensUnitsUsersList } from "../../services/srvc-tokens-realm";
import { signedDocuments } from "../../services/srvc-contracts";

const listactions =
  require("../../data.static/data-units-asset-details.json").data;

export default function AssetUnitOptionModule() {
  const { id } = useParams();
  const navigate = useNavigate();
  const usxx = GetUserForm();
  const usrx = GetLocalUser();
  const temx = GetLocalBusiness();
  const asset = usxx === "user" ? usrx : temx;

  const [loader, setLoader] = useState(true);
  const [data, setData] = useState();

  // const [actions, setActions] = useState();
  const [memo, setMemo] = useState("");
  // const [units, setUnits] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [myShare, setMyShare] = useState();

  // const [mail, setMail] = useState("");
  // const [rate, setRate] = useState("");
  const [count, setCount] = useState("");
  const [isUnitModalOpen, setUnitModalOpen] = useState(false);
  const [isOffersModalOpen, setOffersModalOpen] = useState(false);
  const [saleUnit, setSaleUnit] = useState("");
  const [OfferSaleUnit, setOfferSaleUnit] = useState();
  const [saleRate, setSaleRate] = useState("");
  const [saleUserMail, setSaleUserMail] = useState("");
  const [saleUserName, setSaleUserName] = useState("");
  const [users, setUsers] = useState();
  const [selectunit, setSelectUnit] = useState();
  //inseted
  const [done, setDone] = useState(false);

  const [book, setBook] = useState({ number: 0, ticker: "***" });
  const [mint, setMint] = useState({ number: 0, ticker: "***" });
  const [unitWarning, setUnitWarning] = useState("");
  const [balance, setBalance] = useState({ number: "0", ticker: "******" });
  const [balancestatus, setBalanceStatus] = useState(false);
  const [onboardstatus, setOnboardStatus] = useState(false);
  const [checkoutstatus, setCheckoutStatus] = useState(false);
  const [unitStatus, setUnitStatus] = useState(false);
  const [lock, setLock] = useState(false);

  const [rate, setRate] = useState({ number: "0", ticker: "******" });
  const [order, setOrder] = useState({ number: "0", ticker: "******" });

  const [code, setCode] = useState("");
  const [codetrxn, setCodeTransfer] = useState();
  const [memocode, setMemoCode] = useState();

  // inserted

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
    // setSelectedUnit(data.find((x) => x.item == unit));
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
      rate: {
        number: unit?.rate?.number,
        ticker: unit?.rate?.ticker || "INR",
      },
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
      result = await TransfersAssetCreate({ data: datx });
      console.log(result);
      setCount("0");
      setRate({ number: "0", ticker: "******" });
      setOrder({ number: "0", ticker: "******" });
      //  setSelectedUnit(null);

      setDone(true);
    } else setDone(false);

    setSubmit(false);
    setLoader(false);

    // transfer asset
  };

  const openUnitModal = () => {
    setUnitModalOpen(true);
  };

  const closeUnitModal = () => {
    setUnitModalOpen(false);
  };

  const openOffersModal = () => {
    setOffersModalOpen(true);
  };

  const closeOffersModal = () => {
    setOffersModalOpen(false);
  };

  // console.log(listactions.filter(x => x.user.includes(asset.role)))

  useEffect(() => {
    if (asset) {
      const fetchData = async () => {
        const resUnit = await UnitDetails({
          data: { item: id },
          srvc: "******",
        });
        if (resUnit.stat) setSelectUnit(resUnit.data);
      };
      fetchData();
    } else {
    }
  }, [id]);

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

  useEffect(() => {
    if (asset) {
      const fetchData = async () => {
        setLoader(true);

        const result = await TokensUnitsUsersList({
          data: { unit: id },
          srvc: "******",
        });
        //console.log(result)
        if (result.stat) {
          setUsers(result.data.list);
          setMyShare(
            result.data.list.find((entry) => entry.user.item == asset.item)
          );
        }

        setOfferSaleUnit(
          result.data.list.find((entry) => entry.user.item == asset.item)
            ?.balance?.number
        );
        // console.log (result)

        setLoader(false);
      };
      fetchData();
    } else {
    }
  }, [id]);

  const handleClick = (live, link) => {
    //if (live) navigate(`/${asset.role}/${link}`)
  };

  const handleOfferSubmit = async () => {
    setSubmit(true);

    var datx = {
      cred: { name: saleUserName, mail: saleUserMail, item: "" },
      debt: { name: asset.name, mail: asset.mail, item: asset.item },
      asset: { item: "" },
      unit: { item: id },
      rate: {
        number: (parseFloat(saleRate) * 1000000).toString(),
        ticker: "INR",
      },
      size: { number: OfferSaleUnit.toString(), ticker: "BRX" },
    };
    console.log(datx);
    var res = await AssetsOffersCreate({ data: datx });
    console.log(res);
    if (res.stat) closeOffersModal();
  };

  useEffect(() => {
    setSaleUnit(parseFloat(myShare?.balance?.number));
    // setOfferSaleUnit(parseFloat(myShare?.balance?.number) );
  }, [myShare]);

  const ResetState = async () => {
    setSaleUserMail("");
    setMemo("");
    saleRate("");
    setSubmit(false);
  };
  if (loader) return <></>;

  const handleDownload = async () => {
    const res = await signedDocuments({
      data: { unit: id, user: asset.item },
    });
    if (res.stat == true) {
      window.open(res.data.file.list[0].link);
    }
  };

  const balanceDifference =
    parseInt(balance?.number) - count * parseInt(selectunit?.rate?.number);

  const functions = [openUnitModal, openOffersModal, handleDownload];

  return (
    <>
      <div className="rounded-xd mt-1 d-md-none d-flex flex-wrap justify-content-between">
        {data &&
          data.map((item, i) =>
            item.actv ? (
              <div
                className={`d-flex p-2 align-middle border mb-2
        ${item.live ? "cursor hidark rounded-wd" : "text-color-tint"}`}
                style={{ height: "2.4rem", width: "49%" }}
                key={i}
                onClick={functions[i]}
              >
                <div className="">
                  <i
                    className={`m-0 p-0 ${item.icon} `}
                    style={{ fontSize: "1.35rem" }}
                  ></i>
                </div>
                <div className="ms-2">
                  <p className={`m-0 p-0 text-nowrap`}>
                    <span className="text-small align-middle">{item.name}</span>
                  </p>
                </div>
                <div className="ms-auto ">
                  <i
                    className={`m-0 p-0 bx bx-chevron-right`}
                    style={{ fontSize: "1.35rem" }}
                  ></i>
                </div>
              </div>
            ) : (
              ""
            )
          )}
      </div>
      {/* <div className="back-color-wite rounded-xd p-1">
        {data &&
          data.map((item, i) =>
            item.actv ? (
              <div
                className={`d-flex p-2 align-middle 
        ${item.live ? "cursor hidark rounded-wd" : "text-color-tint"}`}
                style={{ height: "2.4rem" }}
                key={i}
                onClick={() => {
                  functions[i]();
                  handleModal(item.item);
                }}
              >
                <div className="">
                  <i
                    className={`m-0 p-0 ${item.icon} `}
                    style={{ fontSize: "1.35rem" }}
                  ></i>
                </div>
                <div className="ms-2">
                  <p className={`m-0 p-0 text-nowrap`}>
                    <span className="text-small align-middle">{item.name}</span>
                  </p>
                </div>
                <div className="ms-auto ">
                  <i
                    className={`m-0 p-0 bx bx-chevron-right`}
                    style={{ fontSize: "1.35rem" }}
                  ></i>
                </div>
              </div>
            ) : (
              ""
            )
          )}
      </div> */}

      {isOffersModalOpen && (
        <div className="modal-overlay">
          <div className="modal-dialog modal-dialog-scrollable mt-0 pt-0 rounded-xd w-100">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h1 className="modal-title fs-5">Create Offer</h1>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeOffersModal}
                ></button>
              </div>
              <div className="modal-body mt-3">
                <div className="">
                  <label className="text-small mb-1 ">Client Email</label>
                  <input
                    value={saleUserMail}
                    onChange={(e) => setSaleUserMail(e.target.value)}
                    className="form-control"
                  />
                  <label className="text-small mb-1 mt-3">Unit For Sale</label>
                  <input
                    value={OfferSaleUnit}
                    // disabled
                    onChange={(e) => {
                      if (e.target.value <= saleUnit) {
                        setOfferSaleUnit(e.target.value);
                        setUnitWarning(``);
                      } else {
                        setOfferSaleUnit(saleUnit);
                        setUnitWarning(`Max unit : ${saleUnit}`);
                      }
                    }}
                    className="form-control"
                  />
                  {unitWarning !== "" ? (
                    <p className="text-mini text-danger m-0 mx-2">
                      {unitWarning}
                    </p>
                  ) : (
                    ""
                  )}
                  <label className="text-small mb-1 mt-3">
                    Unit Rate @Sqft
                  </label>
                  <input
                    value={saleRate}
                    onChange={(e) => setSaleRate(e.target.value)}
                    className="form-control"
                  />
                  {/* <label className="text-small mb-1 mt-3">Client Name</label>
                      <input value={saleUserName} onChange={(e)=> setSaleUserName(e.target.value) } className="form-control"/> */}
                </div>
              </div>
              <div className="d-flex mt-3">
                <div className="me-auto">
                  <button
                    type="button"
                    className="btn btn-light text-small rounded-xx bg-body-tertiary"
                    onClick={closeOffersModal}
                  >
                    Close
                  </button>
                </div>
                <div className="text-end">
                  <button
                    disabled={
                      submit ||
                      saleRate == "" ||
                      saleRate < 1 ||
                      saleUnit == "" ||
                      saleUnit < 1 ||
                      saleUserMail == "" ||
                      OfferSaleUnit == ""
                    }
                    onClick={() => {
                      handleOfferSubmit();
                      closeOffersModal();
                    }}
                    type="button"
                    className="btn btn-outline-primary text-small rounded-xx"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isUnitModalOpen && (
        <div className="modal-overlay">
          <div className="modal-dialog modal-dialog-scrollable mt-0 pt-0 rounded-xd w-100">
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
                  onClick={closeUnitModal}
                  style={{ fontSize: "1rem" }}
                ></button>
              </div>
              <div
                className="scrollbar"
                style={{ overflowY: "scroll", height: "450px" }}
              >
                <div className="media-banner">
                  <img
                    src={selectunit?.media?.link}
                    className=""
                    alt={"..."}
                  ></img>
                </div>
                <div className="p-2 px-3">
                  <p className="text-wd m-0 mb-2">
                    {selectunit?.meta?.memo || "******"}
                  </p>
                  <p className="text-bold m-0 mb-1">
                    Rate:{" "}
                    {NumberFormat(
                      selectunit?.rate?.number / 1000000 || "0",
                      "",
                      2
                    )}{" "}
                    {(selectunit?.rate?.ticker).toUpperCase() || "******"}
                  </p>
                  <p className="text-small text-bold m-0 d-none">
                    {selectunit?.number || Date.now().toString()}
                  </p>
                </div>
                <div className="border-bottom mx-3 mb-2"></div>
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
                    <span
                      className={
                        balancestatus && checkoutstatus && balanceDifference > 0
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
                        <p className="text-color-next m-0">{"Select Units"}</p>
                      </div>
                      <div className="">
                        <p className="m-0">
                          <span className="text-color-next text-lead text-bold ">
                            {NumberFormat(count || 0, "", "0")}
                          </span>
                          <span>{"/"}</span>
                          <span className="text-small">
                            {NumberFormat(
                              selectunit?.units?.mint - selectunit?.units?.book,
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
                <div
                  className={`p-2 px-3 ${
                    onboardstatus &&
                    balancestatus &&
                    checkoutstatus &&
                    selectunit?.status?.book &&
                    balanceDifference > 0 &&
                    !lock
                      ? ""
                      : "d-none"
                  }`}
                >
                  <div className="d-flex">
                    <div className="mt-2">
                      <span className="btn btn-sm btn-outline-secondary rounded-xx border-none d-none">
                        {"Cancel"}
                      </span>
                    </div>

                    <div className="ms-auto">
                      <button
                        className="btn btn-sm btn-primary px-4 rounded-xx text-small"
                        disabled={count == 0 || balanceDifference < 0}
                        onClick={() => setLock(true)}
                      >
                        {"Continue"}
                      </button>
                    </div>
                  </div>
                  <WebbDividerSmall />
                </div>
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
                          count == 0 ||
                          balanceDifference < 0 ||
                          code == "" ||
                          code.length !== 6
                        }
                        onClick={() => {
                          handleSubmit();
                          closeUnitModal();
                        }}
                      >
                        {"Authorize"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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
    </>
  );
}
