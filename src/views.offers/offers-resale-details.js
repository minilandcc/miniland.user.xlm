// import { Helmet } from "react-helmet";
// import { Link } from "react-router-dom";
// import { useParams ,useNavigate} from "react-router-dom";

// import ContentFormat from "../content/webz/content-format-xv";
// import WebbHeader from "../content/webz/webb-header-navs-xv";

// import WebbIcon from "../content/webx/webb-icon";
// import UserAvatar from "../content/webx/user-avatar";
// import WebbDateTime from "../content/webx/webb-datetime";

// import WebbDividerMedium from "../content/webx/webb-divider-md";

// import { GetLocalBusiness, GetLocalUser } from "../services/srvc-auth-local";
// import { GetUserForm } from "../services/srvc-utilities";
// import WebbMenuMobile from "../content/webz/webb-menu-xv";
// import UserInfocardMobileModule from "../content/user/user-infocard-mobile";
// import UserAccountBalance from "../content/user/user-account-balance";
// import MenuButtons from "../content/webx/menu-buttons";
// import WebbDividerSmall from "../content/webx/webb-divider-sm";
// import { OffersResaleDetailsModule } from "../content/offers/offers-resale-details";
// import WebbIconBack from "../content/webx/webb-icon-back";


// export default function OfferResaleDetails() {
//   const { id } = useParams();
//   const usxx = GetUserForm();
//   const usrx = GetLocalUser();
//   const temx = GetLocalBusiness();
//   const asset = usxx === "user" ? usrx : temx;
//    const navigate = useNavigate();

//   const metadata = {
//     name: "Offers",
//     banner: {
//       link: "https://img.freepik.com/premium-vector/futuristic-vector-hexagon-wave-dark-cyberspace-abstract-wave-with-dots-line-white-moving-particles-background_744733-97.jpg?w=900",
//     },
//   };

//   return (
//     <>
//       <Helmet>
//         <title>
//           {metadata.name}
//           {" • "}
//           {process.env.REACT_APP_WEBB_SITE_NAME}
//           {" • "}
//           {process.env.REACT_APP_WEBB_SITE_LINE}
//         </title>
//         <link rel="canonical" href={process.env.REACT_APP_WEBB_SITE_LINK} />
//       </Helmet>

//       <ContentFormat
//         name={metadata.name}
//         media={{ size: "xtra", show: false, data: <></> }}
//         header={{
//           header: (
//             <>
//               <Link to={`/${asset.role}/home`}>
//                 <WebbIcon
//                   data={{ color: "text-color-main", size: "text-icon-md" }}
//                 />
//               </Link>
//             </>
//           ),
//           data: (
//             <>
//               {" "}
//               <WebbHeader />{" "}
//             </>
//           ),
//           footer: (
//             <>
//               {" "}
//               <UserAvatar />{" "}
//             </>
//           ),
//         }}
//         sidebar={{
//           header: (
//             <>
//               {" "}
//               <p className="text-normal text-bold m-0">{metadata.name}</p>{" "}
//             </>
//           ),
//           data: (
//             <>
//               <WebbDividerSmall />
//             </>
//           ),
//           footer: (
//             <>
//               <WebbDateTime />
//             </>
//           ),
//         }}
//         content={{
//           header: (
//             <>
//               <div className="d-flex justify-content-between justify-content-md-start align-items-start">
//                 <div className="d-flex gap-3">
//                   <div
//                     className="cursor d-md-none d-block"
//                     style={{ position: "relative", bottom: "5px" }}
//                     onClick={() => navigate(-1)}
//                   >
//                     <WebbIconBack
//                       data={{ color: "text-color-tone", size: "text-icon-sm" }}
//                     />
//                   </div>
//                   <div
//                     className="offcanvas offcanvas-start w-75 bg-body-tertiary"
//                     tabIndex="-1"
//                     id="offcanvasExample"
//                     aria-labelledby="offcanvasExampleLabel"
//                   >
//                     <div className="offcanvas-header">
//                       <h6
//                         className="offcanvas-title"
//                         id="offcanvasExampleLabel"
//                       >
//                         Miniland
//                       </h6>
//                       <button
//                         type="button"
//                         className="btn-close"
//                         data-bs-dismiss="offcanvas"
//                         aria-label="Close"
//                       ></button>
//                     </div>
//                     <div className="offcanvas-body d-flex flex-column gap-4">
//                       <UserInfocardMobileModule />
//                       <UserAccountBalance />
//                       <WebbMenuMobile />
//                       <div
//                         style={{
//                           position: "absolute",
//                           bottom: "15px",
//                           width: "88%",
//                         }}
//                       >
//                         <MenuButtons />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <p className="m-0">Offers Details</p>
//                 </div>
//                 <div
//                   className="d-block d-md-none"
//                   style={{ position: "relative", bottom: "6px" }}
//                 >
//                   <UserAvatar />
//                 </div>
//               </div>
//             </>
//           ),
//           data: (
//             <>
//               <WebbDividerSmall />
//               <OffersResaleDetailsModule />
//               <WebbDividerMedium />
//               <WebbDividerMedium />
//               <WebbDividerMedium />
//               <WebbDividerMedium />
//               <WebbDividerMedium />
//               <WebbDividerMedium />
//             </>
//           ),
//         }}
//         actionbar={{
//           header: <>Your Actions</>,
//           data: <>{/* <WebbDividerSmall /> */}</>,
//           footer: <></>,
//         }}
//       />
//     </>
//   );
// }


// main
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import ContentFormat from "../content/webz/content-format-xx";
import WebbHeader from "../content/webz/webb-header-xx";

import WebbDividerMedium from "../content/webx/webb-divider-md";

import { OffersResaleDetailsModule } from "../content/offers/offers-resale-details";

import WebbLoaderMedium from "../content/webx/webb-loader-md";

import {
  ContractDetailsRead,
  GetSignedStatus,
} from "../services/srvc-contracts-realm";
import { GetUserForm } from "../services/srvc-utilities";
import { GetLocalBusiness, GetLocalUser } from "../services/srvc-auth-local";
import ContractSearchModule from "../content/contracts/contract-search";

export default function OfferResaleDetails() {
  const { id } = useParams();
  const metadata = {
    name: "Offer Detail",
    banner: {
      link: "https://img.freepik.com/premium-photo/metaverse-city-cyberpunk-concept-3d-render_84831-1036.jpg?w=900",
    },
  };

  const listTabs = [
    { name: "Contracts", code: "contracts" },
    // {name: 'E-Stamp', code: 'estm'}
  ];

  const navigate = useNavigate();

  const usxx = GetUserForm();
  const usrx = GetLocalUser();
  const temx = GetLocalBusiness();
  const asset = usxx === "user" ? usrx : temx;

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState(null);

  const [sort, setSort] = useState("contracts");
  const [search, setSearch] = useState();

  const handleSearch = async (item) => {
    // console.log('srch: ', sort)
    setSearch(item);
  };

  // useEffect(() => {
  //   if (asset) {
  //     const fetchData = async () => {
  //       setLoading(true);

  //       var res = await ContractDetailsRead({ data: { item: id }, srvc: "" });
  //       // console.log(res)
  //       if(res){
  //         setData(res.data);
  //       }
       
  //       setLoading(false);
  //     };
  //     fetchData();
  //   } else {
  //     navigate("/");
  //   }
  // }, [id]);

  // if(loading) {return(<div className={loading ? '' : 'd-none'}>Please wait...</div>)}

  return (
    <>
      <Helmet>
        <title>
          {metadata.name}
          {" • "}
          {process.env.REACT_APP_WEBB_SITE_NAME}
          {" • "}
          {process.env.REACT_APP_WEBB_SITE_LINE}
        </title>
        <link rel="canonical" href={process.env.REACT_APP_WEBB_SITE_LINK} />
      </Helmet>

      <ContentFormat
        name={metadata.name}
        header={{
          size: "small",
          show: true,
          data: (
            <>
              <WebbHeader
                data={{ home: "/home", name: metadata.name, link: "contracts" }}
              />
            </>
          ),
        }}
        media={{
          size: "xtra",
          visible: false,
          link: metadata.banner.link,
          data: <></>,
        }}
        content={{
          size: "small",
          show:true,
          data: (
            <>
              <div
                className="container-fluid"
                style={{
                  // backgroundImage:`url(${metadata.banner.link})`,
                  // backgroundRepeat:'no-repeat',
                  // backgroundSize:'cover',
                  // backgroundPosition: 'center center',
                  height: "70vh",
                }}
              >
                {/* <WebbDividerMedium /> */}

              
                  <div className="">
                    <WebbDividerMedium />
                    <OffersResaleDetailsModule />
                  </div>
               
              </div>
            </>
          ),
        }}
        footer={{
          size: "medium",
          data: (
            <>
              <div className=""></div>
            </>
          ),
        }}
      ></ContentFormat>
    </>
  );
}

