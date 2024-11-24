// documents
import { Link, useParams } from "react-router-dom";

import WebbDividerSmall from "./webb-divider-sm";
import WebbDividerMedium from "./webb-divider-md";

const code = require("../../data.static/code-esin.json").data;

export default function ContractMembers(props) {
  const data = props.data;
  console.log(data);
  var admin = props.admin.filter((item) => {
    return item.role == "admin";
  });
  const { id } = useParams();

  if (data.length === 0)
    return (
      <>
        <span> No Parties. Please add</span>
        {/* <Link to={`/${asset.form}/documents/new/xxxx/${id}`}>add / upload a file</Link> */}
        <WebbDividerMedium />
      </>
    );

  //console.log(data)

  return (
    <>
      <div className={`rounded-wd back-color-wite `}>
        {data &&
          data.length > 0 &&
          data.map((item, i) => (
            <div key={i}>
              <div className="d-flex p-3">
                <div className="">
                  <p className="text-bold m-0 p-0">
                    <span>{i + 1}.</span>
                  </p>
                </div>

                <div className="ps-2 flex-fill">
                  <div className="d-flex justify-content-between">
                    <p className="text-bold m-0 p-0 text-sm">
                      <span>{item.name}</span>
                    </p>
                    <div className={`ms-auto text-end`}>
                      <div
                        className={`btn btn-sm px-3 rounded-wd border-none bg-${
                          code.find((x) => x.code == item?.status).colr
                        } `}
                        style={{ cursor: "auto" }}
                      >
                        <p className="small m-0 text-white text-uppercase">
                          {/* <small> {item.id == admin[0].usid? "Admin":""}</small> */}
                          <small>
                            {" "}
                            {code.find((x) => x.code == item?.status).text}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="small m-0 p-0 text-sm">{item.mail}</p>
                </div>
              </div>
              <div
                className={`border-bottom ${
                  i < data.length - 1 ? "" : "d-none"
                }`}
              ></div>
            </div>
          ))}
      </div>

      <WebbDividerSmall />
    </>
  );
}