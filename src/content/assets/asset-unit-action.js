import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AssetsUnitsDetail } from "../../services/srvc-assets-realm";
import { resolve } from "chart.js/helpers";
import { TokensDetails } from "../../services/srvc-tokens-realm";
import { GetLocalBusiness, GetLocalUser } from "../../services/srvc-auth-local";
import { GetUserForm } from "../../services/srvc-utilities";

export default function AssetUnitActionModules() {
  const usxx = GetUserForm();
  const usrx = GetLocalUser();
  const temx = GetLocalBusiness();
  const asset = usxx === "user" ? usrx : temx;
  const { id } = useParams();

  const [currentItems, setCurrentItems] = useState([]);
  const [rate, setRate] = useState("");
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(true);

    const fetchData = async () => {
      var res = await AssetsUnitsDetail({
        data: {
          item: id,
        },
      });
      console.log("Res---30",res)
      setCurrentItems(res?.data);
      setLoader(false);
    };

    fetchData();
  }, []);


  if (loader == true) {
    return <p>Please wait ....</p>;
  }
  if (!loader && currentItems?.length == 0) {
    return <p>No items found</p>;
  }
  return (
    <>
      {/* <div
        key={currentItems?.item || ""}
        className="bg-white rounded-xd position-relative"
        style={{ width: "100%", marginBottom: "20px" }}
      >
        <img
          src={currentItems?.media?.link || ""}
          style={{
            width: "100%",
            height: "150px",
            // borderTopLeftRadius: "0.375rem",
            // borderTopRightRadius: "0.375rem",
            objectFit: "cover",
          }}
          className="border"
          alt="img"
        />
        <p className="px-4 m-0 mt-4">{currentItems?.creator?.name || ""}</p>
        <p
          className="px-4 fw-bold"
          style={{ fontSize: "20px", color: "slateblue" }}
        >
          {currentItems?.meta?.name || ""}
        </p>
        <p
          className="px-4 m-0 mb-4"
          style={{
            maxHeight: "100px",
            overflowY: "scroll",
          }}
        >
          {currentItems?.meta?.memo || ""}
        </p>
      </div> */}
      <div className="back-color-wite rounded-xd">
        <div
          className="media-banner d-none d-md-block"
          style={{ height: "150px" }}
        >
          <img
            src={currentItems?.media?.link || ""}
            className="w-100 rounded-xd"
          ></img>
          <div className="btn back-color-dark text-color-wite text-mini text-uppercase rounded-xx px-3">
            {currentItems?.meta?.format || ""}
          </div>
        </div>

        {/* <div className="media-standard d-md-none">
          <img src={data?.media?.link} className="w-100 rounded-xd"></img>
          <div className="btn back-color-dark text-color-wite text-mini text-uppercase rounded-xx px-3">
            {data?.meta?.sort || "asset"}
          </div>
        </div> */}
      </div>

      {/* <div className=" my-3">
        <div className="bg-white my-2 p-3 rounded-xd">
          <p className="fw-bold">Detail</p>
          <div className="d-flex flex-column gap-2">
            <div className="d-flex justify-content-between">
              <p className="m-0"> Rate</p>
              <p
                style={{
                  minWidth: "50px",
                  marginLeft: "40px",
                  wordWrap: "break-word",
                }}
                className="text-uppercase m-0"
              >
                {currentItems.rate.number / 1000000} {currentItems.rate.ticker}
              </p>
            </div>{" "}
            <div className="d-flex justify-content-between">
              <p className="m-0"> Book</p>
              <p
                style={{
                  minWidth: "50px",
                  marginLeft: "40px",
                  wordWrap: "break-word",
                }}
                className="m-0"
              >
                {currentItems.units.book}
              </p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="m-0"> Mint</p>
              <p
                style={{
                  minWidth: "50px",
                  marginLeft: "40px",
                  wordWrap: "break-word",
                }}
                className="m-0"
              >
                {currentItems.units.mint}
              </p>
            </div>
            <div className="d-flex justify-content-between d-none">
              <p> Sale</p>
              <p
                style={{
                  minWidth: "50px",
                  marginLeft: "40px",
                  wordWrap: "break-word",
                }}
              >
                {currentItems.units.sale} {currentItems.units.ticker}
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
