// auth - firebase mail link
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { NumberFormat } from "../../services/srvc-utilities";

import WebbDividerSmall from "../webx/webb-divider-sm";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-local";

import { UnitDetails } from "../../services/srvc-assets-realm";
import { TransfersFundAssetListUnits } from "../../services/srvc-transfers-funds-realm";
import { NAVSChangeList } from "../../services/srvc-navs-realm";

export default function AssetUnitProgressBarModule() {
  const usxx = GetUserForm();
  const usrx = GetLocalUser();
  const temx = GetLocalBusiness();
  const asset = usxx === "user" ? usrx : temx;
  const { id } = useParams();

  const [loader, setLoader] = useState(true);

  const [data, setData] = useState();
  const [users, setUsers] = useState();
  const [myShare, setMyShare] = useState();
  const [saleUnit, setSaleUnit] = useState("");

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
    if (asset) {
      const fetchData = async () => {
        setLoader(true);

        const result = await TransfersFundAssetListUnits({
          data: { item: id },
          srvc: "******",
        });
        //console.log(result)
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
    setSaleUnit(parseFloat(myShare?.sale?.number) / 1000000);
  }, [myShare]);

  if (loader) return <>Please Wait...</>;

  return (
    <>
      {/* sales */}
      <WebbDividerSmall />
      <div className="rounded-xd back-color-wite border p-3">
        <div className="mb-2">
          <p className="m-0 p-0 text-bold">Unit Sales (Total)</p>
        </div>
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
    </>
  );
}
