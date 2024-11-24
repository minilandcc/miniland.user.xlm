import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import ContentFormat from "../content/webz/content-format-xv";
import WebbHeader from "../content/webz/webb-header-navs-xv";

import WebbIcon from "../content/webx/webb-icon";
import UserAvatar from "../content/webx/user-avatar";
import WebbDateTime from "../content/webx/webb-datetime";

import WebbDividerMedium from "../content/webx/webb-divider-md";
import WebbDividerSmall from "../content/webx/webb-divider-sm";

import { GetLocalBusiness, GetLocalUser } from "../services/srvc-auth-local";
import { GetUserForm } from "../services/srvc-utilities";
import AssetsListUserFundedModule from "../content/assets/assets-list-user-funded";

import WebbMenuMobile from "../content/webz/webb-menu-xv";
import UserInfocardMobileModule from "../content/user/user-infocard-mobile";
import UserAccountBalance from "../content/user/user-account-balance";
import MenuButtons from "../content/webx/menu-buttons";
import AssetsSearchModule from "../content/assets/assets-search";
import StockMarketGrowth from "../content/stock-market-card";
import { TokensListUser } from "../services/srvc-tokens-realm";

export default function Tokens() {
  const usxx = GetUserForm();
  const usrx = GetLocalUser();
  const temx = GetLocalBusiness();
  const asset = usxx === "user" ? usrx : temx;
  const [assetSearchData, setAssetSearchData] = useState({});

  const metadata = {
    name: "Assets",
    banner: {
      link: "https://img.freepik.com/premium-vector/futuristic-vector-hexagon-wave-dark-cyberspace-abstract-wave-with-dots-line-white-moving-particles-background_744733-97.jpg?w=900",
    },
  };

  const handleNetworkSearchChange = (newData) => {
    setAssetSearchData(newData);
  };


  return (
    <>
      <Helmet>
        {" "}
        <title>
          {metadata.name}
          {" • "}
          {process.env.REACT_APP_WEBB_SITE_NAME}
          {" • "}
          {process.env.REACT_APP_WEBB_SITE_LINE}
        </title>
        <link rel="canonical" href={process.env.REACT_APP_WEBB_SITE_LINK} />{" "}
      </Helmet>

      <ContentFormat
        name={metadata.name}
        media={{ size: "xtra", show: false, data: <></> }}
        header={{
          header: (
            <>
              <Link to={`/${asset.role}/home`}>
                <WebbIcon
                  data={{ color: "text-color-main", size: "text-icon-md" }}
                />
              </Link>
            </>
          ),
          data: (
            <>
              {" "}
              <WebbHeader />{" "}
            </>
          ),
          footer: (
            <>
              {" "}
              <UserAvatar />{" "}
            </>
          ),
        }}
        sidebar={{
          header: (
            <>
              {" "}
              <p className="text-normal text-bold m-0">{metadata.name}</p>{" "}
              <WebbDividerSmall />
              <WebbDividerSmall />
              <div className="pt-3">
                <AssetsSearchModule onDataChange={handleNetworkSearchChange} />
              </div>
            </>
          ),
          data: <></>,
          footer: (
            <>
              <WebbDateTime />
            </>
          ),
        }}
        content={{
          header: (
            <>
              <div className="d-flex justify-content-between justify-content-md-start align-items-start">
                <div className="d-flex gap-3">
                  <i
                    data-bs-toggle="offcanvas"
                    href="#offcanvasExample"
                    role="button"
                    aria-controls="offcanvasExample"
                    className="bx bx-menu d-block d-md-none"
                    style={{ fontSize: "25px" }}
                  ></i>
                  <div
                    className="offcanvas offcanvas-start w-75 bg-body-tertiary"
                    tabIndex="-1"
                    id="offcanvasExample"
                    aria-labelledby="offcanvasExampleLabel"
                  >
                    <div className="offcanvas-header">
                      <h6
                        className="offcanvas-title"
                        id="offcanvasExampleLabel"
                      >
                        Miniland
                      </h6>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="offcanvas-body d-flex flex-column gap-4">
                      <UserInfocardMobileModule />
                      <UserAccountBalance />
                      <WebbMenuMobile />
                      <div
                        style={{
                          position: "absolute",
                          bottom: "15px",
                          width: "88%",
                        }}
                      >
                        <MenuButtons />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="m-0">Assets</p>
                </div>
                <div
                  className="d-block d-md-none"
                  style={{ position: "relative", bottom: "6px" }}
                >
                  <UserAvatar />
                </div>
              </div>
            </>
          ),
          data: (
            <>
              {/* <AssetsSearchModule /> */}
              <WebbDividerSmall />
              <StockMarketGrowth />
              <div className="d-block d-md-none mt-4 mb-1">
                <AssetsSearchModule onDataChange={handleNetworkSearchChange} />
              </div>
              <WebbDividerSmall />
              <h2 className="text-normal m-0 mx-3">{"Assets (Owned)"}</h2>
              <WebbDividerSmall />
              <AssetsListUserFundedModule assetSearchData={assetSearchData} />
              <WebbDividerMedium />
              <WebbDividerMedium />
              <WebbDividerMedium />
              <WebbDividerMedium />
              <WebbDividerMedium />
              <WebbDividerMedium />
            </>
          ),
        }}
        actionbar={{
          header: <>Your Actions</>,
          data: <></>,
          footer: <></>,
        }}
      />
    </>
  );
}
