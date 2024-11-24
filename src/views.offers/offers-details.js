// main
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import ContentFormat from "../content/webz/content-format-xx";
import WebbHeader from "../content/webz/webb-header-xx";

import WebbDividerMedium from "../content/webx/webb-divider-md";

import { OffersDetailsModule } from "../content/offers/offers-details";

import WebbLoaderMedium from "../content/webx/webb-loader-md";
// import ContractSearchModule from "../content/contracts/contract-search";
// import ContractActionsModule from "../content/contracts/contract-action";
// import ContractsNewInfoModule from "../content/contracts/contract-new-info";
import ContractDetailsModule from "../content/contracts/contract-details";
import {
  ContractDetailsRead,
  GetSignedStatus,
} from "../services/srvc-contracts-realm";
import { GetUserForm } from "../services/srvc-utilities";
import { GetLocalBusiness, GetLocalUser } from "../services/srvc-auth-local";
import ContractSearchModule from "../content/contracts/contract-search";

export default function OfferDetails() {
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

  const [loading, setLoading] = useState(false);

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

                {loading ? (
                  <>
                    <WebbLoaderMedium />
                  </>
                ) : (
                  <div className="">
                    <WebbDividerMedium />
                    <OffersDetailsModule />
                  </div>
                )}
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
