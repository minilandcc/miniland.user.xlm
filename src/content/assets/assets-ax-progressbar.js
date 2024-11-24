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
import { TransfersAssetCreate } from "../../services/srvc-transfers-assets-realm";

export default function AssetUnitListProgressBarModule() {
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
      result = await TransfersAssetCreate({ data: datx });
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


      {/* data */}
      <div className="rounded-xd back-color-wite border">
        <div className="mx-3 mt-3">
          <p className="m-0 p-0 text-bold">Unit Sales (Total)</p>
        </div>
        <div className="px-3 mb-3 mt-2">
          <div className="d-flex">
            <div className="">
              <p className="p-0 m-0">
                <span>SOLD: {NumberFormat(book?.number || 0, "", "0")}</span>
                <span> </span>
                <span>{`(${((book.number / mint.number) * 100).toFixed(
                  0
                )}%)`}</span>
              </p>
            </div>
            {/* <div className="ms-auto">
              <p className="p-0 m-0">
                <span>{NumberFormat(mint?.number || 0, "", "0")}</span>
                <span className="text-small text-color-tone ms-1">
                  {"SQFT"}
                </span>
              </p>
            </div> */}
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

        {/* units */}

        {/* modal view */}
      </div>
    </>
  );
}
