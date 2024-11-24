import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import ContentFormat from "../content/webz/content-format-xv";
import WebbHeader from "../content/webz/webb-header-navs-xv";

import WebbIcon from "../content/webx/webb-icon";
import UserAvatar from "../content/webx/user-avatar";
import WebbDateTime from "../content/webx/webb-datetime";

import WebbDividerMedium from "../content/webx/webb-divider-md";
import WebbDividerSmall from "../content/webx/webb-divider-sm";

import AssetsListMarketModule from "../content/assets/assets-list-market";

import TransfersFundsListWaitModule from "../content/transfers.funds/transfers-funds-list-wait";
import TransfersAssetListWaitModule from "../content/transfers.assets/transfers-assets-list-wait";
import { ContractListPendingModule } from "../content/contracts/contracts-list-pending";
import { OffersListPendingModule } from "../content/offers/offers-list-pending";
import { OffersListResaleModule } from "../content/offers/offers-list-resale";

import { GetLocalBusiness, GetLocalUser } from "../services/srvc-auth-local";
import { GetUserForm } from "../services/srvc-utilities";
import WebbFooterMobile from "../content/webz/webb-footer-mobile";
import WebbMenuMobile from "../content/webz/webb-menu-xv";
import UserInfocardMobileModule from "../content/user/user-infocard-mobile";
import MenuButtons from "../content/webx/menu-buttons";
import UserAccountBalance from "../content/user/user-account-balance";
import UserActionsHomeModule from "../content/home/user-action-home";
import { AssetList, AssetSearch } from "../services/srvc-assets-realm";
import StockMarketGrowth from "../content/stock-market-card";
import FormNeeded from "../content/webx/form-needed";
import ContractListModule from "../content/contracts/contract-lists";
import ContractDetailsModule from "../content/contracts/contract-details";
import ContractSearchModule from "../content/contracts/contract-search";

export default function Contracts() {
  const usxx = GetUserForm();
  const usrx = GetLocalUser();
  const temx = GetLocalBusiness();
  const asset = usxx === "user" ? usrx : temx;

  const [data, setdata] = useState({mmbr:[]})

  const metadata = {
    name: "Miniland",
    banner: {
      link: "https://img.freepik.com/premium-vector/futuristic-vector-hexagon-wave-dark-cyberspace-abstract-wave-with-dots-line-white-moving-particles-background_744733-97.jpg?w=900",
    },
  };

  return (
    <>
      {" "}
      <Helmet>
        {" "}
        <title>
          {metadata.name}
          {" • "}
          {process.env.REACT_APP_WEBB_SITE_NAME}
          {" • "}
          {process.env.REACT_APP_WEBB_SITE_LINE}
        </title>{" "}
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
              <WebbHeader data={{ name: metadata.name, home: "/", link: "" }} />
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
              <ContractSearchModule />
            </>
          ),
          data: (
            <>
              <WebbDividerSmall />
            </>
          ),
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
                    <div
                      className="offcanvas-body d-flex flex-column gap-3"
                      style={{ position: "relative" }}
                    >
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
                  <p className="m-0">Contracts List</p>
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
              <WebbDividerSmall />
              <ContractListModule />
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
          header: <>Actions</>,
          data: (
            <>
              <WebbDividerSmall />
            </>
          ),
          footer: <></>,
        }}
      />
    </>
  );
}
