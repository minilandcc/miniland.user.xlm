import { Helmet } from "react-helmet";
import { Link,useNavigate } from "react-router-dom";

import ContentFormat from "../content/webz/content-format-xv";
import WebbHeader from "../content/webz/webb-header-navs-xv";

import WebbIcon from "../content/webx/webb-icon";
import UserAvatar from "../content/webx/user-avatar";
import WebbDateTime from "../content/webx/webb-datetime";

import WebbDividerMedium from "../content/webx/webb-divider-md";
import WebbDividerSmall from "../content/webx/webb-divider-sm";
import AssetUnitDetailsInvestorModule from "../content/assets.units/units-view-investor";

import { GetLocalBusiness, GetLocalUser } from "../services/srvc-auth-local";
import { GetUserForm } from "../services/srvc-utilities";

import WebbMenuMobile from "../content/webz/webb-menu-xv";
import UserInfocardMobileModule from "../content/user/user-infocard-mobile";
import UserAccountBalance from "../content/user/user-account-balance";
import MenuButtons from "../content/webx/menu-buttons";
import AssetUnitActionModules from "../content/assets/asset-unit-action";
import AssetUnitProgressBarModule from "../content/assets.units/assets-progressbar";
import AssetUnitOptionModule from "../content/assets/assets-unit-options";
import AssetUnitOptionMobileModule from "../content/assets/asset-unit-options-mobile";
import WebbIconBack from "../content/webx/webb-icon-back";
import { OffersListUsers } from "../content/offers/my-offers-list";
import AssetUnitDetailsInvestorMobileModule from "../content/assets.units/assets-investor-mobile";

export default function UnitsViewInvestor() {
  const usxx = GetUserForm();
  const usrx = GetLocalUser();
  const temx = GetLocalBusiness();
  const asset = usxx === "user" ? usrx : temx;
   const navigate = useNavigate();

  const metadata = {
    name: "Unit Details",
    banner: {
      link: "https://img.freepik.com/premium-vector/futuristic-vector-hexagon-wave-dark-cyberspace-abstract-wave-with-dots-line-white-moving-particles-background_744733-97.jpg?w=900",
    },
  };

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
            </>
          ),
          data: (
            <>
              <WebbDividerSmall />
              <AssetUnitActionModules />
              <WebbDividerSmall />
              <AssetUnitDetailsInvestorMobileModule />
              <AssetUnitProgressBarModule />
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
                  <div
                    className="cursor d-md-none d-block"
                    style={{ position: "relative", bottom: "5px" }}
                    onClick={() => navigate(-1)}
                  >
                    <WebbIconBack
                      data={{ color: "text-color-tone", size: "text-icon-sm" }}
                    />
                  </div>
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
                  <p className="m-0">Investor Units</p>
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
              <AssetUnitDetailsInvestorModule />
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
          data: (
            <>
              <WebbDividerSmall />
              <AssetUnitOptionModule />
              <WebbDividerSmall />
              {/* <p className="text-bold ms-2">My Offers</p>
              <OffersListUsers /> */}
            </>
          ),
          footer: <></>,
        }}
      />
    </>
  );
}
