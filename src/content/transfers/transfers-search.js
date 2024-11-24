import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import WebbDividerSmall from "../webx/webb-divider-sm";
import FormNeeded from "../webx/form-needed";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-local";

import { updateTransferData } from "../actions/transferActions";

export default function TransferSearchModule() {
  const usxx = GetUserForm();
  const dispatch = useDispatch();
  const transferData = useSelector((state) => state.transfer);

  const usrx = GetLocalUser();
  const temx = GetLocalBusiness();
  const asset = usxx === "user" ? usrx : temx;

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (asset) {
      const fetchData = async () => {
        setLoader(true);
        // Perform any necessary actions
        setLoader(false);
      };
      fetchData();
    }
  }, []);

  const handleCheckboxChange = (key, val) => {
    let newData;

    if (key === "success") {
      newData = {
        ...transferData,
        success: true,
        pending: false,
        failed: false,
        all: false,
        end: "",
        start: "",
        page: 1,
      };
    } else if (key === "pending") {
      newData = {
        ...transferData,
        success: false,
        pending: true,
        failed: false,
        all: false,
        end: "",
        start: "",
        page: 1,
      };
    } else if (key === "all") {
      newData = {
        ...transferData,
        success: false,
        pending: false,
        failed: false,
        all: true,
        end: "",
        start: "",
        page: 1,
      };
    } else if (key === "failed") {
      newData = {
        ...transferData,
        success: false,
        pending: false,
        failed: true,
        all: false,
        end: "",
        start: "",
        page: 1,
      };
    } else if (key === "start") {
      newData = { ...transferData, start: val };
    } else {
      newData = { ...transferData, [key]: val, page: 1 };
    }
    dispatch(updateTransferData(newData));
  };

  return (
    <>
      {/* info */}
      {/* <div className="">Search</div> */}

      {/* dates */}
      <WebbDividerSmall />
      <div className="back-color-wite p-2 px-3 rounded-xd">
        <div className="mb-3">
          <label className="form-label text-small">
            Start Date <FormNeeded />
          </label>
          <input
            type="date"
            className="form-control height-md rounded-wd"
            style={{ fontSize: "0.9rem", height: "2.7rem" }}
            value={transferData?.start}
            onChange={({ target }) =>
              handleCheckboxChange("start", target.value)
            }
            disabled={loader}
          ></input>
        </div>

        <div className="mb-3">
          <label className="form-label text-small">
            End Date <FormNeeded />
          </label>
          <input
            type="date"
            className="form-control height-md rounded-wd"
            style={{ fontSize: "0.9rem", height: "2.7rem" }}
            value={transferData?.end}
            onChange={({ target }) => handleCheckboxChange("end", target.value)}
            disabled={loader}
          ></input>
        </div>
      </div>

      {/* format */}
      <WebbDividerSmall />
      {/* <div className="back-color-wite p-2 px-3 rounded-xd">
        <div className="">
          <label className="form-label text-small">
            Transfers <FormNeeded />
          </label>

          <div className="d-flex form-check form-switch m-0 p-0 mb-2">
            <div className="">
              <p className="m-0 p-0">Funds</p>
            </div>
            <div className="ms-auto">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                style={{ height: "1.2rem", width: "2rem" }}
                checked={transferData.funds}
                onChange={() =>
                  handleCheckboxChange("funds", !transferData.funds)
                }
              ></input>
            </div>
          </div>
        </div>
      </div> */}

      {/* status */}
      {/* <WebbDividerSmall />
      <div className="back-color-wite p-2 px-3 rounded-xd">
        <div className="">
          <label className="form-label text-small">
            Status <FormNeeded />
          </label>

          <div className="d-flex form-check form-switch m-0 p-0 mb-2">
            <div className="">
              <p className="m-0 p-0">Success</p>
            </div>
            <div className="ms-auto">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                style={{ height: "1.2rem", width: "2rem" }}
                checked={transferData.success}
                onChange={() =>
                  handleCheckboxChange("success", !transferData.success)
                }
              ></input>
            </div>
          </div>

          <div className="d-flex form-check form-switch m-0 p-0 mb-2">
            <div className="">
              <p className="m-0 p-0">Pending</p>
            </div>
            <div className="ms-auto">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                style={{ height: "1.2rem", width: "2rem" }}
                checked={transferData.pending}
                onChange={() =>
                  handleCheckboxChange("pending", !transferData.pending)
                }
              ></input>
            </div>
          </div>

          <div className="d-flex form-check form-switch m-0 p-0 mb-2">
            <div className="">
              <p className="m-0 p-0">Failed</p>
            </div>
            <div className="ms-auto">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                style={{ height: "1.2rem", width: "2rem" }}
                checked={transferData.failed}
                onChange={() =>
                  handleCheckboxChange("failed", !transferData.failed)
                }
              ></input>
            </div>
          </div>

          <div className="d-flex form-check form-switch m-0 p-0 mb-2">
            <div className="">
              <p className="m-0 p-0">All</p>
            </div>
            <div className="ms-auto">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                style={{ height: "1.2rem", width: "2rem" }}
                checked={transferData.all}
                onChange={() => handleCheckboxChange("all", !transferData.all)}
              ></input>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
