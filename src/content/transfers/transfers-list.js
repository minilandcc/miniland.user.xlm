// auth - firebase mail link
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NumberFormat } from "../../services/srvc-utilities";

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";

import NavsButtonBack from "../webx/navs-button-back";
import NavsButtonNext from "../webx/navs-button-next";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-local";

import { TransfersFundListUser } from "../../services/srvc-transfers-funds-realm";
import { TransfersAssetListUser } from "../../services/srvc-transfers-assets-realm";
import TransfersActionsModule from "./transfers-actions";
import TransfersActionsMobileModule from "./transfers-action-mobile";

const list = [
  { code: 0, memo: "created", icon: "bx bxs-circle", color: "text-color-tint" },
  { code: 1, memo: "active", icon: "bx bxs-circle", color: "text-color-wait" },
  {
    code: 2,
    memo: "scheduled",
    icon: "bx bxs-info-circle",
    color: "text-color-wait",
  },
  {
    code: 3,
    memo: "locked / on-hold",
    icon: "bx bxs-minus-circle",
    color: "text-color-wait",
  },
  {
    code: 4,
    memo: "cancelled",
    icon: "bx bxs-x-circle",
    color: "text-color-error",
  },
  {
    code: 5,
    memo: "timeout",
    icon: "bx bxs-error-circle",
    color: "text-color-error",
  },
  {
    code: 6,
    memo: "closed (success)",
    icon: "bx bxs-check-circle",
    color: "text-color-success",
  },
  {
    code: 7,
    memo: "declined (user)",
    icon: "bx bxs-x-circle",
    color: "text-color-error",
  },
  {
    code: 8,
    memo: "revoked (user)",
    icon: "bx bxs-x-circle",
    color: "text-color-error",
  },
  {
    code: 9,
    memo: "declined (user)",
    icon: "bx bxs-right-arrow-circle",
    color: "text-color-next",
  },
];

export default function TransfersListModule(props) {
  // console.log(props.search)

  const usxx = GetUserForm();
  const usrx = GetLocalUser();
  const temx = GetLocalBusiness();
  const asset = usxx === "user" ? usrx : temx;

  const navigate = useNavigate();

  const [loader, setLoader] = useState(true);
  const [data, setData] = useState();

  const [search, setSearch] = useState();

  const [index, setIndex] = useState(1);
  const [items, setItems] = useState(5);

  const [curr, setCurrentIndex] = useState(1);
  const [next, setNextIndex] = useState();
  const [last, setLastIndex] = useState();

  const [count, setCount] = useState();
  const [total, setTotal] = useState();

  const [text, setText] = useState("");

  useEffect(() => {
    if (asset) {
      const fetchData = async () => {
        setLoader(true);
        // console.log ('transfers')

        const resFunds = await TransfersFundListUser({
          data: {
            user: asset.item,
            index: index,
            items: items,
            filters: {
              search: props.search,
              name: props.status,
              date: {
                fromDate: props.searchDates.startDate,
                toDate: props.searchDates.endDate,
              },
            },
          },
        });
        console.log(resFunds);

        const resAssets = await TransfersAssetListUser({
          data: {
            user: asset.item,
            index: index,
            items: items,
            filters: {
              search: props.search,
              name: props.status,
              date: {
                fromDate: props.searchDates.startDate,
                toDate: props.searchDates.endDate,
              },
            },
          },
        });
        console.log(resAssets);

        const result = [...resFunds.data.list, ...resAssets.data.list];
        // const result = resFunds.data.list
        result.sort((a, b) => b.created - a.created);

        if (resFunds.stat) {
          // && resAssets.stat
          setData(result);

          const resTotal = resFunds.data.count + resAssets.data.count;
          setTotal(resTotal);

          setText(
            `${(index - 1) * items * 2 + 1} - ${
              index * items * 2 < resTotal ? index * items * 2 : resTotal
            } of ${resTotal}`
          );
        }

        setLoader(false);
      };
      fetchData();
    } else {
    }
  }, [props.search, props.status, props.searchDates.endDate, index, items]);

  const NextIndex = async () => {
    if (data.length < items * 2) {
    } else {
      setNextIndex(curr + 1);
      setIndex(curr + 1);
      setCurrentIndex(curr + 1);
    }
  };

  const LastIndex = async () => {
    if (index == 1) {
    } else {
      setLastIndex(curr - 1);
      setIndex(curr - 1);
      setCurrentIndex(curr - 1);
    }
  };

  // console.log(data)

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
            <i className="bx bxs-info-circle text-color-tint"></i>
          </span>
          <span className="ms-1 text-color-tone">No Transfers</span>
        </div>
      </>
    );

  return (
    <>
      <div className="back-color-wite rounded-xd border">
        {data &&
          data.map((item, i) => (
            <div key={i}>
              <div className="d-flex px-3 mt-3">
                <div className="d-none">
                  <span className="">
                    <i className={`bx bx-credit-card`}></i>
                  </span>
                </div>

                <div className="">
                  <p className="m-0 text-sm">
                    <span className="text-color-next text-bold">
                      {item.user.name}
                    </span>
                  </p>
                </div>

                <div className="ms-auto text-end text-sm w-50">
                  <span>{item?.mode == "credit" ? "+" : "-"}</span>
                  <span className="text-bold">
                    {NumberFormat(
                      (item?.amount?.number || 0) / 1000000,
                      "",
                      "0"
                    )}
                  </span>
                  <span className="text-small ms-1 text-color-tone text-uppercase">
                    {item.amount.ticker}
                  </span>

                  <span
                    className={`text-small ms-1 ${
                      list.find((x) => x.code == item.status).color
                    }`}
                  >
                    <i
                      className={`small ${
                        list.find((x) => x.code == item.status).icon
                      }`}
                    ></i>
                  </span>
                </div>
              </div>
              <div className="px-3 mb-3">
                <p className="text-small m-0">{item.memo}</p>
                <p className="text-small text-color-tone m-0">
                  {new Date(item.created).toLocaleString()}
                </p>
              </div>
              <div className={i < data.length - 1 ? "border-bottom" : ""}></div>
            </div>
          ))}
      </div>

      {/* navs */}
      <WebbDividerSmall />
      <div className={data.length < items ? "" : ""}>
        <div className="d-flex justify-content-between">
          <div className="" onClick={() => LastIndex()}>
            <NavsButtonBack disabled={index === 1 ? true : false} />
          </div>

          <div className="">
            <p className="my-3">{text}</p>
          </div>

          <div className="" onClick={() => NextIndex()}>
            <NavsButtonNext disabled={data.length < items * 2 ? true : false} />
          </div>
        </div>
      </div>
      <TransfersActionsMobileModule />
    </>
  );
}
