import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { EsignPendingDocuments } from "../../services/srvc-contracts";
import { GetUserForm, NumberFormat } from "../../services/srvc-utilities";
import { GetLocalBusiness, GetLocalUser } from "../../services/srvc-auth-local";
import "./offers.css"
import {
  AssetsOffersDetails,
  AssetsOffersList,
  AssetsOffersResaleDetails,
  AssetsOffersStatusSet,
} from "../../services/srvc-offers-realm";
import { useNavigate, useParams } from "react-router-dom";
import WebbDividerMedium from "../webx/webb-divider-md";
import { UserOnboardStatus } from "../../services/srvc-user-realm";
import { AccountsBaseBalance } from "../../services/srvc-accounts-realm";
import { TransfersAssetCredit } from "../../services/srvc-transfers-funds-realm";
import AssetUnitOfferListModule from "../assets/assetx-offers-units";
import AssetResaleUnitOfferListModule from "../assets/assetx-offers-units-resale";

export const OffersResaleDetailsModule = () => {
  const usxx = GetUserForm();
  const usrx = GetLocalUser();
  const temx = GetLocalBusiness();
  const asset = usxx === "user" ? usrx : temx;

  const [loader, setLoader] = useState(true);
  const [data, setData] = useState();
  const [onboardstatus, setOnboardStatus] = useState(false);
  const [balance, setBalance] = useState(false);

  const navigate = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    setLoader(true);
    const fetchdata = async () => {
      var res = await AssetsOffersResaleDetails({ data: { item: id } });
      // console.log(res)
      if (res.stat) setData(res.data);
      setLoader(false);
      //    var filtered =  res.data.find(docx => docx.mmbr.item == asset.item && docx.mmbr.stat== 1)
      //    console.log(filtered)
    };

    fetchdata();
  }, []);

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
        if (result.stat) {
          setBalance(parseFloat(result?.data?.balance?.number) / 1000000);
        }
        // setBalance(result.data.balance);

        setLoader(false);
      };
      fetchData();
    } else {
    }
  }, []);

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
  if (!loader && !data)
    return (
      <>
        <div
          className="p-3 back-color-wite rounded-xd border align-middle"
          style={{}}
        >
          <span className="align-middle text-lead">
            <i className="bx bxs-info-circle text-color-success"></i>
          </span>
          <span className="ms-1 text-color-tone">No Pending Offers</span>
        </div>
      </>
    );

  //console.log(balance)

  return (
    <>
      {/* <div className="px-1 py-3 rounded-xd border">
        <div className="p-2 bg-white">
          <div className="p-2 bg-white  rounded mt-3 d-flex">
            <div className="me-auto text-center " style={{ width: "50%" }}>
              <h6 className="fw-bold mt-2">Offer Id</h6>
              <p
                className="text-small textWidth"
                style={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {data?.item}
              </p>
            </div>
            <div className="text-end text-center" style={{ width: "50%" }}>
              <h6 className="fw-bold mt-2">Assets Name</h6>
              <p>{data?.assx?.name || ""}</p>
            </div>
            <div className="text-end text-center" style={{ width: "50%" }}>
              <h6 className="fw-bold mt-2">Unit Name</h6>
              <p className="m-0">{data?.unit?.name}</p>
            </div>
          </div>
        </div>

        <div className="p-2 bg-white rounded">
          <div className="p-2 bg-white  rounded mt-3 d-flex">
            <div className="me-auto text-center " style={{ width: "50%" }}>
              <h6 className="fw-bold mt-2">Offer Rate</h6>
              <p>
                {NumberFormat(
                  parseFloat(data?.rate?.nmbr) / 1000000 || 0,
                  "w",
                  2
                )}{" "}
                {data?.rate?.tick}
              </p>
            </div>
            <div className="text-end text-center" style={{ width: "50%" }}>
              <h6 className="fw-bold mt-2">Sale Unit</h6>
              <p>
                {data?.size?.nmbr || ""} {data?.size?.tick}
              </p>
            </div>
            <div className="text-end text-center" style={{ width: "50%" }}>
              <h6 className="fw-bold mt-2">Total Cost</h6>
              <p className="m-0">
                {NumberFormat(
                  (parseFloat(data?.size?.nmbr) *
                    parseFloat(data?.rate?.nmbr)) /
                    1000000,
                  "w",
                  2
                )}{" "}
                {data?.rate?.tick}
              </p>
            </div>
          </div>
        </div>

        <div className="p-2 bg-white rounded">
          <div className="p-2 bg-white  rounded mt-3 d-flex">
            <div className="me-auto text-center " style={{ width: "50%" }}>
              <h6 className="fw-bold mt-2">Seller Name</h6>
              <p>{data?.debt?.name} </p>
            </div>
            <div className="text-end text-center" style={{ width: "50%" }}>
              <h6 className="fw-bold mt-2">Seller Mail</h6>
              <p
                style={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
                className="textWidth"
              >
                {data?.debt?.mail || ""}{" "}
              </p>
            </div>
            <div className="text-end text-center" style={{ width: "50%" }}>
              <h6 className="fw-bold mt-2">View Assets</h6>
              <p
                onClick={() => navigate(`/user/ax/${data?.assx?.item}`)}
                className="m-0 text-primary cursor"
              >
                click
              </p>
            </div>
          </div>
        </div>
      </div> */}

      {data ? (
        <>
          <AssetResaleUnitOfferListModule data={data} />
        </>
      ) : (
        <div></div>
      )}
    </>
  );
};
