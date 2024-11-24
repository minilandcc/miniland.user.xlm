import React, { useState, useEffect } from "react";
import { TokensUserUnitStat } from "../services/srvc-tokens-realm";
import { GetUserForm } from "../services/srvc-utilities";
import { GetLocalBusiness, GetLocalUser } from "../services/srvc-auth-local";
import "./stock.css";

const StockMarketGrowth = () => {
  const usxx = GetUserForm();
  const usrx = GetLocalUser();
  const temx = GetLocalBusiness();
  const asset = usxx === "user" ? usrx : temx;
  const [data, setData] = useState(0);
  const stockName = "Current Growth";
  const absoluteChange =
    parseFloat(data?.investment?.current_value) -
    parseFloat(data?.investment?.total);
  const growth =
    absoluteChange == 0
      ? "0.00"
      : ((absoluteChange / parseFloat(data?.investment?.total)) * 100).toFixed(
          2
        );

  const isPositive = growth >= 0;

  useEffect(() => {
    const fetchdata = async () => {
      var res = await TokensUserUnitStat({ data: { user: asset.item } });
      if (res.stat) setData(res.data);
    };

    fetchdata();
  }, []);

  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  };

  return (
    <div className="row mx-0 cardContainer">
      <div className="rounded-xd border mb-1 p-2 cards">
        <div className="d-flex justify-content-between align-items-start">
          <div className={`growth-icon`}>
            <h6 className="mt-1">Total Investment</h6>
            <div className="d-flex align-items-center">
              <i
                className={`bx bx-rupee bx-sm`}
                style={{ fontSize: "1.25rem", color: "blue" }}
              ></i>
              <span
                className={`card-text text-color-next
             mb-0`}
                style={{ fontSize: "1.25rem", fontWeight: "bold" }}
              >
                {formatNumber(parseFloat(data?.investment?.total) / 1000000)}
              </span>
            </div>
          </div>

          <i class="bx bx-coin-stack bx-sm p-2 rounded-circle bg-body-tertiary"></i>
        </div>
      </div>
      <div className="rounded-xd border mb-1 p-2  cards">
        <div className="d-flex justify-content-between align-items-start">
          <div className={`growth-icon`}>
            <h6 className="mt-1">Current Value</h6>
            <div className="d-flex align-items-center">
              <i
                className={`bx bx-rupee bx-sm`}
                style={{ fontSize: "1.25rem", color: "blue" }}
              ></i>
              <span
                className={`card-text text-color-next
             mb-0`}
                style={{ fontSize: "1.25rem", fontWeight: "bold" }}
              >
                {formatNumber(
                  parseFloat(data?.investment?.current_value) / 1000000
                )}
              </span>
            </div>
          </div>

          <i class="bx bx-home bx-sm p-2 rounded-circle bg-body-tertiary"></i>
        </div>
      </div>
      <div className="rounded-xd border mb-1 p-2  cards">
        <div className="d-flex justify-content-between align-items-start">
          <div className={`growth-icon`}>
            <h6 className="mt-1">{stockName}</h6>
            <div className="d-flex align-items-center">
              <div
                className={`growth-icon d-flex align-items-center ${
                  isPositive ? "text-success" : "text-danger"
                }`}
              >
                <i
                  className={`bx bx-sm ${
                    isPositive ? "bx-up-arrow-alt" : "bx-down-arrow-alt"
                  } `}
                  style={{ fontSize: "1.25rem" }}
                ></i>
                <span
                  className={`card-text ${
                    isPositive ? "text-success" : "text-danger"
                  } mb-0 `}
                  style={{ fontSize: "1.25rem", fontWeight: "bold" }}
                >
                  {isPositive ? `+${growth}%` : `${growth}%`}
                </span>
              </div>
            </div>
          </div>
          <i class="bx bx-trending-up bx-sm p-2 rounded-circle bg-body-tertiary" />
        </div>
      </div>
    </div>
  );
};

export default StockMarketGrowth;
