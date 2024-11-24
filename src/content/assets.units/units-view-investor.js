// auth - firebase mail link
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./assets-investor.css";

import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

import { NumberFormat } from "../../services/srvc-utilities";

import WebbDividerMedium from "../webx/webb-divider-md";
import WebbDividerSmall from "../webx/webb-divider-sm";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-local";

import { UnitDetails } from "../../services/srvc-assets-realm";
import { TransfersFundAssetListUnits } from "../../services/srvc-transfers-funds-realm";
import { NAVSChangeList } from "../../services/srvc-navs-realm";
import NavLineChart from "../webx/dashboard-navs-chart";
import { AssetsOffersCreate } from "../../services/srvc-offers-realm";
import {
  TokensDetails,
  TokensUnitsUsersList,
} from "../../services/srvc-tokens-realm";
import AssetUnitOptionMobileModule from "../assets/asset-unit-options-mobile";
import AssetUnitOptionModule from "../assets/assets-unit-options";
import { OffersListUsers } from "../offers/my-offers-list";

export default function AssetUnitDetailsInvestorModule() {
  const usxx = GetUserForm();
  const usrx = GetLocalUser();
  const temx = GetLocalBusiness();
  const asset = usxx === "user" ? usrx : temx;

  const navigate = useNavigate();
  const { id } = useParams();

  const [loader, setLoader] = useState(true);

  const [data, setData] = useState();
  const [users, setUsers] = useState([]);

  const [myShare, setMyShare] = useState();

  const [saleUnit, setSaleUnit] = useState("");
  const [saleRate, setSaleRate] = useState("");
  const [purchaseRate, setPurchaseRate] = useState("");
  const [navRate, setNavRate] = useState("");
  const [saleUserMail, setSaleUserMail] = useState("");
  const [saleUserName, setSaleUserName] = useState("");
  const [submit, setSubmit] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  

  useEffect(() => {
    if (asset) {
      const fetchData = async () => {
        setLoader(true);

        const resUnit = await UnitDetails({
          data: { item: id },
          srvc: "******",
        });
        if (resUnit.stat) setData(resUnit.data);

        var resp = await NAVSChangeList({ data: { unit: id } });
        // console.log(resp)

        setLoader(false);
      };
      fetchData();
    } else {
    }
  }, [id]);

  useEffect(() => {
    setLoader(true);

    const fetchData = async () => {
      var res = await TokensDetails({
        data: {
          unit: id,
          user: asset.item,
        },
      });
      console.log("Res---td", res);
      setPurchaseRate(res?.data?.rate?.nmbr);
      setLoader(false);
    };

    fetchData();
  }, []);

  const getNavRate = (props) => {
    setNavRate(props.nmbr);
  };

  useEffect(() => {
    if (asset) {
      const fetchData = async () => {
        setLoader(true);

        const result = await TokensUnitsUsersList({
          data: { unit: id },
          srvc: "******",
        });
        console.log("Token--114", result.data.list);
        if (result.stat) {
          setUsers(result.data.list);
          setMyShare(
            result.data.list.find((entry) => entry.user.item == asset.item)
          );
        }
        // console.log (result)

        setLoader(false);
      };
      fetchData();
    } else {
    }
  }, [id]);

  useEffect(() => {
    setSaleUnit((parseFloat(myShare?.acbx?.mint || myShare?.balance?.number )- parseFloat(myShare?.acbx?.sale || 0) - parseFloat(myShare?.acbx?.burn || 0 ) ));
  }, [myShare]);
  // asset?.item === item?.user?.item

  const addFilteredUsersToFront = (users, asset) => {
    const filteredUsers = users.filter(
      (user) => asset?.item === user?.user?.item
    );

    const remainingUsers = users.filter(
      (user) => asset?.item !== user?.user?.item
    );

    return [...filteredUsers, ...remainingUsers];
  };
  const updatedUsers = addFilteredUsersToFront(users, asset);

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
      size: { number: saleUnit.toString(), ticker: "BRX" },
    };
    // console.log(datx)
    var res = await AssetsOffersCreate({ data: datx });
    console.log(res);
    if (res.stat) window.location.reload(true);
  };

  // console.log("D---------",data)
  // console.log(myShare);

  if (loader) return <>Please Wait...</>;

  return (
    <>
      {/* info */}
      <div className="">
        <p className="text-normal m-0"></p>
      </div>

      {/* asset */}
      <p className="text-bold mx-3 m-0">Details</p>
      <div className="px-3 mt-1">
        <p className="m-0">{data?.meta?.memo || "******"}</p>
      </div>
      <WebbDividerSmall />
      <div className="rounded-xd back-color-wite text-start">
        <div className="d-flex p-3 d-md-none">
          <div className="" style={{ width: "2.7rem", height: "2.7rem" }}>
            <div className="media-cube">
              <img
                src={data?.media?.link}
                className="rounded-xx"
                alt={data?.name || ""}
              ></img>
            </div>
          </div>

          <div className="ms-2">
            <p className="text-normal text-bold m-0 text-sm">
              {data?.meta?.name || "******"}
            </p>
            <p className="text-color-next m-0">
              ID: {data?.webx?.number || "******"}
            </p>
          </div>
        </div>

        {/* <div className="px-3 mt-md-3 mt-0">
          <p className="m-0 text-wd text-bold">
            {data?.meta?.memo || "******"}
          </p>
        </div> */}

        <div className="back-color-wite rounded-xd border p-0 m-0">
          <div className="row row-cols-3 row-cols-md-3 g-0">
            {/* {features &&
              features.map((item, i) => ( */}
            <div className="col">
              <div className="p-3">
                <p className="m-0" style={{ fontSize: "0.75rem" }}>
                  <span className="text-uppercase text-small text-color-tone text-bold text-sm">
                    Purchase Rate
                  </span>
                </p>
                <p className="m-0 text-uppercase">
                  <span className="text-normal">
                    {NumberFormat(
                      parseInt(purchaseRate || 0) / 1000000,
                      "w",
                      2
                    )}
                  </span>
                  <span className="ms-1 text-small text-uppercase">
                    {data?.rate?.ticker || "*"}
                  </span>
                </p>
              </div>
            </div>
            {/* 2 */}
            <div className="col">
              <div className="p-3">
                <p className="m-0" style={{ fontSize: "0.75rem" }}>
                  <span className="text-uppercase text-small text-color-tone text-bold text-sm">
                    Current NAV
                  </span>
                </p>
                <p className="m-0 text-uppercase">
                  <span className="text-normal">
                    {NumberFormat(parseInt(navRate || 0) / 1000000, "w", 2)}
                  </span>
                  <span className="ms-1 text-small text-uppercase">
                    {data?.rate?.ticker || "*"}
                  </span>
                </p>
              </div>
            </div>
            {/* 3 */}
            <div className="col">
              <div className="p-3">
                <p className="m-0" style={{ fontSize: "0.75rem" }}>
                  <span className="text-uppercase text-small text-color-tone text-bold text-sm">
                    Rate Growth (%)
                  </span>
                </p>
                <p className="m-0 text-uppercase">
                  <span className="text-normal">
                    {parseFloat(
                      ((parseFloat(navRate) / 1000000 -
                        parseFloat(purchaseRate) / 1000000) /
                        (parseFloat(purchaseRate) / 1000000)) *
                        100
                    ).toFixed(2)}
                    %
                  </span>
                </p>
              </div>
            </div>
            {/* 4 */}
            <div className="col">
              <div className="p-3">
                <p className="m-0" style={{ fontSize: "0.75rem" }}>
                  <span className="text-uppercase text-small text-color-tone text-bold text-sm">
                    My Units
                  </span>
                </p>
                <p className="m-0 text-uppercase">
                  <span className="text-normal">
                    {NumberFormat((parseFloat(myShare?.acbx?.mint || myShare?.balance?.number )- parseFloat(myShare?.acbx?.sale || 0) - parseFloat(myShare?.acbx?.burn || 0 ) ) || 0, "w", 2)}
                  </span>
                  {/* <span className="ms-1 text-small text-uppercase">
                    {data?.rate?.ticker || "*"}
                  </span> */}
                </p>
              </div>
            </div>
            {/* 5 */}
            <div className="col">
              <div className="p-3">
                <p className="m-0" style={{ fontSize: "0.75rem" }}>
                  <span className="text-uppercase text-small text-color-tone text-bold text-sm">
                    Current Rate
                  </span>
                </p>
                <p className="m-0 text-uppercase">
                  <span className="text-normal">
                    {NumberFormat(parseFloat(navRate) / 1000000, "w", 2)}
                  </span>
                  {/* <span className="ms-1 text-small text-uppercase">
                    {data?.rate?.ticker || "*"}
                  </span> */}
                </p>
              </div>
            </div>
            {/* 6 */}
            <div className="col">
              <div className="p-3">
                <p className="m-0" style={{ fontSize: "0.75rem" }}>
                  <span className="text-uppercase text-small text-color-tone text-bold text-sm">
                    Market Value
                  </span>
                </p>
                <p className="m-0 text-uppercase">
                  <span className="text-normal">
                    {NumberFormat(
                      parseFloat(
                        (parseFloat(navRate) / 1000000) *
                        (parseFloat(myShare?.acbx?.mint || myShare?.balance?.number )- parseFloat(myShare?.acbx?.sale || 0) - parseFloat(myShare?.acbx?.burn || 0 ) )
                      ),
                      "w",
                      2
                    )}
                  </span>
                  {/* <span className="ms-1 text-small text-uppercase">
                    {data?.rate?.ticker || "*"}
                  </span> */}
                </p>
              </div>
            </div>
            {/* ))} */}
          </div>
        </div>
        <WebbDividerSmall />
        <div className="px-3 d-none">
          <p
            className="m-0 text-wd mb-4 text-primary cursor"
            onClick={openModal}
          >
            Create Offer
          </p>
        </div>
      </div>
      {/* <WebbDividerSmall /> */}
      <AssetUnitOptionMobileModule />
      <div className="mt-2"></div>
      
      {/* Modle For Offer Create  */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-dialog modal-dialog-scrollable mt-0 pt-0 rounded-xd w-100">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h1 className="modal-title fs-5">Create Offer</h1>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body mt-3">
                <div className="">
                  <label className="text-small mb-1">Unit For Sale</label>
                  <input value={saleUnit} disabled className="form-control" />
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
                  <label className="text-small mb-1 mt-3">Client Email</label>
                  <input
                    value={saleUserMail}
                    onChange={(e) => setSaleUserMail(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="d-flex mt-3">
                <div className="me-auto">
                  <button
                    type="button"
                    className="btn btn-light text-small rounded-xx bg-body-tertiary"
                    onClick={closeModal}
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
                      saleUserMail == ""
                    }
                    onClick={() => handleOfferSubmit()}
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
      <p className="text-bold mx-3">Historical Rate (INR)</p>

      <div className="bg-white" style={{ height: "50%" }}>
        <NavLineChart
          unit={id}
          rate={(parseInt(data?.rate?.number || 0) / 1000000).toFixed(2)}
          getNavRate={getNavRate}
        />
      </div>
      <div className="mt-4">
        <p className="text-bold mx-3">My Offers</p>
        <OffersListUsers saleUnit={saleUnit} />
      </div>

      {/* sales */}
      <WebbDividerSmall />
      <div className="rounded-xd back-color-wite border p-3 d-md-none d-block">
        <div className="d-flex text-dark">
          <div className="">
            <p className="m-0">
              {`SOLD: ${(
                (data?.units?.mint !== "0"
                  ? data?.units?.book / data?.units?.mint
                  : 0) * 100
              ).toFixed(0)}%`}
            </p>
          </div>

          {/* <div className="ms-auto text-end">
            <span className="text-bold">
              {NumberFormat(data?.units?.book || "0", "www", "0")}
            </span>
            <span>{"/"}</span>
            <span>{NumberFormat(data?.units?.mint || "0", "www", "0")}</span>
            <span className="text-small">{" SQFT"}</span>
          </div> */}
        </div>

        <div className="">
          <div
            className="progress"
            role="progressbar"
            style={{ height: "0.27rem" }}
          >
            <div
              className="progress-bar progress-bar-striped progress-bar-animated back-color-success"
              style={{
                width: `${(data?.units?.book / data?.units?.mint) * 100}%`,
                height: "0.27rem",
              }}
            ></div>
          </div>
        </div>

        <div className="d-flex text-dark d-none">
          <div className="">
            <p className="text-small text-color-tone m-0 mb-1">
              Units: {data?.units?.ticker || "BRX"}
            </p>
          </div>
          <div className="ms-auto text-end">
            {NumberFormat(data?.units?.mint || "0", "www", "0")}
          </div>
        </div>
      </div>
      {/* my share scale */}
      <div className="rounded-xd back-color-wite border p-3 mt-3 d-none">
        <div className="d-flex text-dark">
          <div className="">
            <p className="m-0">
              {`MY SHARE: ${(
                (data?.units?.mint !== "0"
                  ? myShare?.balance?.number / data?.units?.mint
                  : 0) * 100
              ).toFixed(0)}%`}
            </p>
          </div>

          <div className="ms-auto text-end">
            <span className="text-bold">
              {NumberFormat(myShare?.balance?.number || "0", "www", "0")}
            </span>
            <span>{"/"}</span>
            <span>{NumberFormat(data?.units?.mint || "0", "www", "0")}</span>
            <span className="text-small">{" SQFT"}</span>
          </div>
        </div>

        <div className="">
          <div
            className="progress"
            role="progressbar"
            style={{ height: "0.27rem" }}
          >
            <div
              className="progress-bar progress-bar-striped progress-bar-animated back-color-success"
              style={{
                width: `${
                  (myShare?.balance?.number / data?.units?.mint) * 100
                }%`,
                height: "0.27rem",
              }}
            ></div>
          </div>
        </div>

        <div className="d-flex text-dark d-none">
          <div className="">
            <p className="text-small text-color-tone m-0 mb-1 text-uppercase">
              Units: {data?.units?.ticker || "BRX"}
            </p>
          </div>
          <div className="ms-auto text-end">
            {NumberFormat(data?.units?.mint || "0", "www", "0")}
          </div>
        </div>
      </div>

      {/* users */}
      {/* <WebbDividerMedium /> */}
      <WebbDividerSmall />
      <div className="mx-3">
        <p className="text-bold m-0">Holders (Users)</p>
      </div>

      <WebbDividerSmall />
      <div className="rounded-xd back-color-wite border">
        {updatedUsers &&
          updatedUsers.map((item, i) => (
            <div key={i}>
              <div className="d-flex rounded p-3">
                <div
                  className="me-auto"
                  style={{
                    width: "60%",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  <p className="m-0 text-sm">
                    <span className="align-middle">
                      <Jazzicon
                        diameter={20}
                        seed={jsNumberForAddress(
                          item?.user?.item || Date.now().toString()
                        )}
                      />
                    </span>
                    <span className="ms-2 align-middle">
                      {item?.user?.item}{" "}
                      {asset?.item === item?.user?.item ? (
                        <span className="text-bold text-color-next">
                          (Self)
                        </span>
                      ) : (
                        ""
                      )}
                    </span>
                    <span>
                      <div className="d-none">
                        <div
                          className="progress"
                          role="progressbar"
                          style={{ height: "0.27rem" }}
                        >
                          <div
                            className="progress-bar progress-bar-striped progress-bar-animated back-color-success"
                            style={{
                              width: `${
                                ((parseFloat(item?.acbx?.mint || item?.balance?.number)-parseFloat(item?.acbx?.sale || 0)-parseFloat(item?.acbx?.burn || 0)  )/ data?.units?.mint) *
                                100
                              }%`,
                              height: "0.27rem",
                            }}
                          ></div>
                        </div>
                      </div>
                    </span>
                  </p>
                </div>
                <div className="">
                  <p className="m-0 text-sm">
                    <span className="">{item?.balance?.number || 0}</span>
                    <span> </span>
                    <span className="text-small text-color-tone">{"SQFT"}</span>
                  </p>
                </div>
              </div>
              <div className="border-bottom"></div>
            </div>
          ))}
      </div>
    </>
  );
}
