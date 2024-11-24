// transfers - statement
import { useEffect, useState } from "react";
import { useHistory, useNavigate } from "react-router-dom";

import WebbLoaderMedium from "../webx/webb-loader-md";
import FormNeeded from "../webx/form-needed";
import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";
import WebbModuleInfo from "../webx/webb-module-info";

import { XLSXFileDownload } from "../webx/filesave-xlsx";
import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalBusiness, GetLocalUser } from "../../services/srvc-auth-local";
import { TransfersFundListUser } from "../../services/srvc-transfers-funds-realm";

export default function TransfersStatementModule() {
  const navigate = useNavigate();
  const usxx = GetUserForm();
  const usrx = GetLocalUser();
  const temx = GetLocalBusiness();
  const asset = usxx === "user" ? usrx : temx;

  const [data, setData] = useState({
    stts: new Date().toISOString().substr(0, 10),
    ents: new Date().toISOString().substr(0, 10),
  });

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(false);

  const [index, setIndex] = useState(1);
  const [items, setItems] = useState(10);

  // form validation
  // useEffect( () => {
  //   setForm(false)
  //   if (data.stts !=='' && data.ents !=='')
  //     setForm(true);
  // },[data]);

  const resetForm = async () => {
    setText("");
  };

  const handleChange = async (key, val) => {
    setData({ ...data, [key]: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const datx = {
      data: {
        user: asset.item,
        index: 1,
        items: 100,
        filters: {
          // search: props.search,
          // name: props.status,
          date: {
            fromDate: data.stts,
            toDate: data.ents,
          },
        },
      },
    };
    var result = await TransfersFundListUser(datx);
  console.log("Result70",result)
    // const result = (await TransferList(datx)).data
    var fileName = `statement-${new Date(data.stts)
      .toISOString()
      .substr(0, 10)
      .replace(/-/gi, "")}${"-"}${new Date(data.ents)
      .toISOString()
      .substr(0, 10)
      .replace(/-/gi, "")}`;
    XLSXFileDownload(result.data.list, fileName);
    setLoading(false);
  };

  if (loading) {
    return (
      <>
        {" "}
        <WebbLoaderMedium />{" "}
      </>
    );
  }

  return (
    <>
      {/* info */}
      <WebbDividerSmall />
      <WebbModuleInfo data={{ info: "Please Select Start and End Date" }} />

      {/* form */}
      <form onSubmit={handleSubmit}>
        <div className="">
          <div className="mb-3">
            <div className="form-group">
              <label className="form-label small">
                Report Start Date <FormNeeded />
              </label>
              <input
                type="date"
                className="form-control height-md rounded-none"
                style={{ fontSize: "0.9rem", height: "2.7rem" }}
                value={data.stts}
                onChange={({ target }) => {
                  handleChange("stts", target.value);
                  setText("");
                }}
                placeholder=""
              ></input>
            </div>
          </div>

          <div className="mb-3">
            <div className="form-group">
              <label className="form-label small">
                Report End Date <FormNeeded />
              </label>
              <input
                type="date"
                className="form-control height-md rounded-none"
                style={{ fontSize: "0.9rem", height: "2.7rem" }}
                value={data.ents}
                onChange={({ target }) => {
                  handleChange("ents", target.value);
                  setText("");
                }}
                placeholder=""
              ></input>
            </div>
          </div>
        </div>
        {/* text */}
        <div className="mb-3">
          <p className="small text-danger">
            {text}
            <span className="text-white">{"."}</span>
          </p>
        </div>

        {/* text */}
        <div className="mb-3">
          <small className="text-muted">
            Note: Scheduled and Pending Transactions are not included in the
            statements.
          </small>
        </div>

        {/* actn */}
        <WebbDividerMedium />
        <div className="">
          <div className="d-grid">
            <button
              className={`btn btn-primary back-color-main height-md rounded-none`}
            >
              <small>Download</small>
            </button>
          </div>
        </div>
      </form>
    </>
  );
}