// // assets
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { GetUserForm } from "../../services/srvc-utilities";
// import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-local";

// import { AssetList } from "../../services/srvc-assets-realm";
// import { AssetsCurrentNav } from "../../services/srvc-navs-realm";

// export default function AssetsListMarketModule({ list, search, filter }) {
//   const usxx = GetUserForm();
//   const usrx = GetLocalUser();
//   const temx = GetLocalBusiness();
//   const asset = usxx === "user" ? usrx : temx;
//    const [currentNav, setCurrentNav] = useState(0);

//   const navigate = useNavigate();

//   const [loader, setLoader] = useState(true);
//   const [data, setData] = useState();

//   const GetAssetCurrentNav = async (assetId) => {
//     const res = await AssetsCurrentNav({
//       data: { asset: assetId },
//     });
//     console.log("CCCCCNNNNN", res);
//     if (res.stat) {
//       return res?.data?.navx;
//     }
//     return 0;
//   };

//   useEffect(() => {
//     if (search.length === 0) {
//       const fetchData = async () => {
//         setLoader(true);

//         const result = await AssetList({
//           data: {
//             creator: "",
//             search: search,
//             user: asset.item,
//             type: filter,
//             index: 1,
//             items: 25,
//             filters: { name: {} },
//           },
//         });
//         if (result.stat) setData(result.data.list);

//         setLoader(false);
//       };
//       fetchData();
//     } else {
//       setData(list);
//     }
//   }, [list, search, filter]);

//   const handleClick = async (item) => {
//     navigate(`/${asset.role}/ax/${item}`);
//   };

//   if (loader)
//     return (
//       <>
//         <div
//           className="p-3 back-color-wite rounded-xd border align-middle"
//           style={{}}
//         >
//           <span className="align-middle text-lead">
//             <i className="bx bxs-info-circle text-color-wait"></i>
//           </span>
//           <span className="ms-1 text-color-tone">Please Wait...</span>
//         </div>
//       </>
//     );
//   if (!loader && (!data || data.length === 0))
//     return (
//       <>
//         <div
//           className="p-3 back-color-wite rounded-xd border align-middle"
//           style={{}}
//         >
//           <span className="align-middle text-lead">
//             <i className="bx bxs-info-circle text-color-wait"></i>
//           </span>
//           <span className="ms-1 text-color-tone">No Assets Listed</span>
//         </div>
//       </>
//     );

//   return (
//     <>
//       {/* data */}
//       <div className="mb-3">
//         {/* options */}
//         <div className="row row-cols-1 row-cols-md-3 g-2">
//           {data &&
//             data.map((item, i) => (
//               <div className="col m-0 mb-3" key={i}>
//                 <div
//                   className="card h-100 rounded-xd border p-0 m-0 back-color-wite cursor"
//                   onClick={() => handleClick(item.item)}
//                 >
//                   {/* asset media */}
//                   <div className="media-standard rounded-xd rounded-bottom-none">
//                     <img
//                       src={item.media.link} // Route of the image file
//                       layout="fill"
//                       className="img-fluid w-100 rounded-none shadow rounded-bottom-none"
//                       alt="..."
//                     />
//                     <div className="btn back-color-main rounded-xx text-mini">
//                       {item.meta.sort}
//                     </div>
//                   </div>

//                   {/* asset details */}
//                   <div className="card-body m-0 px-3 mb-2">
//                     <div className="mb-0">
//                       <p
//                         className="text-bold text-color-tone text-uppercase text-sm m-0"
//                         style={{ fontSize: "0.7rem" }}
//                       >
//                         {item?.creator?.name || "******"}
//                       </p>
//                     </div>

//                     <h4 className="text-bold text-normal text-color-next d-none d-md-block">
//                       {item.meta.name}
//                     </h4>
//                     <h4 className="text-color-next text-normal d-md-none">
//                       {item.meta.name}
//                     </h4>

//                     <div className="text-small d-none d-md-block">
//                       <p className="text-md m-0">{item.meta.memo}</p>
//                     </div>
//                     <div className="d-md-none">
//                       <p className="text-md m-0">{item.meta.memo}</p>
//                     </div>
//                     <div className="">
//                       <p className="text-md m-0">
//                         Current Nav :{GetAssetCurrentNav(item.item)}
//                       </p>
//                     </div>
//                   </div>

//                   {/* asset units */}
//                   <div className="card-footer border-none back-color-none m-0 p-0 mx-3 mb-2">
//                     <div
//                       className={`d-flex text-dark text-small mb-1 ${
//                         item?.status?.live ? "d-none" : ""
//                       }`}
//                     >
//                       COMING SOON !
//                     </div>
//                     <div
//                       className={`d-flex text-dark text-small mb-1 ${
//                         item?.status?.live && item?.units?.mint > 0
//                           ? ""
//                           : "d-none"
//                       }`}
//                     >
//                       <div className="">
//                         <p className="m-0">
//                           {`SOLD: ${
//                             item?.units?.mint > 0
//                               ? (
//                                   ((item?.units?.book || "0") /
//                                     item?.units?.mint) *
//                                   100
//                                 ).toFixed(0)
//                               : "0"
//                           }%`}
//                         </p>
//                       </div>
//                       <div className="ms-auto text-end">
//                         {item?.units?.mint || "0"}
//                       </div>
//                     </div>
//                     <div className="">
//                       <div
//                         className="progress"
//                         role="progressbar"
//                         style={{ height: "0.27rem" }}
//                       >
//                         <div
//                           className="progress-bar progress-bar-striped progress-bar-animated back-color-success"
//                           style={{
//                             width: `${
//                               (item?.units?.book / item?.units?.mint) * 100
//                             }%`,
//                             height: "0.27rem",
//                           }}
//                         ></div>
//                       </div>
//                     </div>
//                     <div className="d-flex text-dark d-none">
//                       <div className="">
//                         <p className="text-small text-color-tone m-0 mb-1">
//                           Units: {item?.units?.ticker || "BRX"}
//                         </p>
//                       </div>
//                       <div className="ms-auto text-end">
//                         {item?.units?.mint || "0"}
//                       </div>
//                     </div>

//                     <div className="mb-2"></div>
//                   </div>

//                   {/* market stats */}
//                   <div className="d-flex mx-3 mb-3 text-small">
//                     <div className="">
//                       <span
//                         className={`align-middle`}
//                         style={{ fontSize: "0.9rem", lineHeight: "0.9rem" }}
//                       >
//                         <i className={`bx bxs-like text-color-tone`}></i>
//                       </span>
//                       <span className={`ms-1 text-small`}>
//                         {item?.count?.likes || 0}
//                       </span>
//                     </div>

//                     <div className="ms-3"></div>
//                     <div className="">
//                       <span
//                         className={`align-middle`}
//                         style={{ fontSize: "0.9rem", lineHeight: "0.9rem" }}
//                       >
//                         <i className={`bx bxs-show text-color-tone`}></i>
//                       </span>
//                       <span className={`ms-1 text-small`}>
//                         {item?.count?.views || 0}
//                       </span>
//                     </div>

//                     <div className="ms-auto">
//                       <span
//                         className={`align-middle`}
//                         style={{ fontSize: "0.9rem", lineHeight: "0.9rem" }}
//                       >
//                         <i className={`bx bxs-user text-color-tone`}></i>
//                       </span>
//                       <span className={`ms-1 text-small`}>
//                         {item?.count?.users || 0}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-local";

import { AssetList } from "../../services/srvc-assets-realm";
import { AssetsCurrentNav } from "../../services/srvc-navs-realm";

export default function AssetsListMarketModule({ list, search, filter }) {
  const usxx = GetUserForm();
  const usrx = GetLocalUser();
  const temx = GetLocalBusiness();
  const asset = usxx === "user" ? usrx : temx;

  const navigate = useNavigate();

  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);
  const [navValues, setNavValues] = useState({});

  const GetAssetCurrentNav = async (assetId) => {
    const res = await AssetsCurrentNav({
      data: { asset: assetId },
    });
    console.log("CCCCCNNNNN", res);
    if (res.stat) {
      return res?.data?.navx;
    }
    return 0;
  };

   const formatUnit = (number) => {
     return new Intl.NumberFormat("en-IN", {
       minimumFractionDigits: 0,
       maximumFractionDigits: 0,
     }).format(number);
  };
  
  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      let result;

      if (search.length === 0) {
        result = await AssetList({
          data: {
            creator: "",
            search: search,
            user: asset.item,
            type: filter,
            index: 1,
            items: 25,
            filters: { name: {} },
          },
        });
      } else {
        result = { stat: true, data: { list: list } };
      }

      if (result.stat) {
        setData(result.data.list);

        // Fetch NAV values for each asset
        const navFetchPromises = result.data.list.map(async (item) => {
          const nav = await GetAssetCurrentNav(item.item);
          return { id: item.item, nav };
        });

        const navResults = await Promise.all(navFetchPromises);
        const navMap = navResults.reduce((acc, { id, nav }) => {
          acc[id] = nav;
          return acc;
        }, {});
        setNavValues(navMap);
      }

      setLoader(false);
    };

    fetchData();
  }, [list, search, filter, asset.item]);

  const handleClick = (item) => {
    navigate(`/${asset.role}/ax/${item}`);
  };

  if (loader)
    return (
      <div className="p-3 back-color-wite rounded-xd border align-middle">
        <span className="align-middle text-lead">
          <i className="bx bxs-info-circle text-color-wait"></i>
        </span>
        <span className="ms-1 text-color-tone">Please Wait...</span>
      </div>
    );

  if (!loader && (!data || data.length === 0))
    return (
      <div className="p-3 back-color-wite rounded-xd border align-middle">
        <span className="align-middle text-lead">
          <i className="bx bxs-info-circle text-color-wait"></i>
        </span>
        <span className="ms-1 text-color-tone">No Assets Listed</span>
      </div>
    );

  return (
    <div className="mb-3">
      <div className="row row-cols-1 row-cols-md-3 g-2">
        {data.map((item, i) => (
          <div className="col m-0 mb-3" key={i}>
            <div
              className="card h-100 rounded-xd border p-0 m-0 back-color-wite cursor"
              onClick={() => handleClick(item.item)}
            >
              <div className="media-standard rounded-xd rounded-bottom-none">
                <img
                  src={item.media.link}
                  className="img-fluid w-100 rounded-none shadow rounded-bottom-none"
                  alt="..."
                />
                <div className="btn back-color-main rounded-xx text-mini">
                  {item.meta.format}
                </div>
              </div>

              <div className="card-body m-0 px-3 mb-2">
                <p
                  className="text-bold text-color-tone text-uppercase text-sm m-0"
                  style={{ fontSize: "0.7rem" }}
                >
                  {item?.creator?.name || "******"}
                </p>

                <h4 className="text-bold text-normal text-color-next d-none d-md-block">
                  {item.meta.name}
                </h4>
                <h4 className="text-color-next text-normal d-md-none">
                  {item.meta.name}
                </h4>

                <p className="text-md m-0">{item.meta.memo}</p>
              </div>

              <div className="card-footer border-none back-color-none m-0 p-0 mx-3 mb-2">
                <div
                  className={`d-flex text-dark text-small mb-1 ${
                    item?.status?.live ? "d-none" : ""
                  }`}
                >
                  COMING SOON !
                </div>
                <div>
                  <p className="text-small text-color-next m-0 my-1">
                    Rate{" "}
                    <span className="float-end">
                      {/* {navValues[item.item] || "0.00"} INR */}
                      {formatNumber(
                        parseFloat(navValues[item?.item] || "0.00")
                      )}{" "}
                      INR
                    </span>
                  </p>
                </div>
                <div
                  className={`d-flex text-dark text-small mb-1 ${
                    item?.status?.live && item?.units?.mint > 0 ? "" : "d-none"
                  }`}
                >
                  <p className="m-0">
                    {`SOLD: ${
                      item?.units?.mint > 0
                        ? (
                            ((item?.units?.book || "0") / item?.units?.mint) *
                            100
                          ).toFixed(0)
                        : "0"
                    }%`}
                  </p>
                  <div className="ms-auto text-end">
                    {/* {item?.units?.mint || "0"} */}
                    {formatUnit(parseFloat(item?.units?.mint))}
                  </div>
                </div>
                <div
                  className="progress"
                  role="progressbar"
                  style={{ height: "0.27rem" }}
                >
                  <div
                    className="progress-bar progress-bar-striped progress-bar-animated back-color-success"
                    style={{
                      width: `${
                        (item?.units?.book / item?.units?.mint) * 100
                      }%`,
                      height: "0.27rem",
                    }}
                  ></div>
                </div>
                <div className="d-flex text-dark d-none">
                  <p className="text-small text-color-tone m-0 mb-1">
                    Units: {item?.units?.ticker || "BRX"}
                  </p>
                  <div className="ms-auto text-end">
                    {item?.units?.mint || "0"}
                  </div>
                </div>

                <div className="mb-2"></div>
              </div>

              <div className="d-flex mx-3 mb-3 text-small">
                <div className="">
                  <span
                    className={`align-middle`}
                    style={{ fontSize: "0.9rem", lineHeight: "0.9rem" }}
                  >
                    <i className={`bx bxs-like text-color-tone`}></i>
                  </span>
                  <span className={`ms-1 text-small`}>
                    {item?.count?.likes || 0}
                  </span>
                </div>

                <div className="ms-3"></div>
                <div className="">
                  <span
                    className={`align-middle`}
                    style={{ fontSize: "0.9rem", lineHeight: "0.9rem" }}
                  >
                    <i className={`bx bxs-show text-color-tone`}></i>
                  </span>
                  <span className={`ms-1 text-small`}>
                    {item?.count?.views || 0}
                  </span>
                </div>

                <div className="ms-auto">
                  <span
                    className={`align-middle`}
                    style={{ fontSize: "0.9rem", lineHeight: "0.9rem" }}
                  >
                    <i className={`bx bxs-user text-color-tone`}></i>
                  </span>
                  <span className={`ms-1 text-small`}>
                    {item?.count?.users || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

