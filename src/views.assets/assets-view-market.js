import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import ContentFormat from "../content/webz/content-format-xv";
import WebbHeader from "../content/webz/webb-header-navs-xv";

import WebbIcon from "../content/webx/webb-icon";
import UserAvatar from "../content/webx/user-avatar";
import WebbDateTime from "../content/webx/webb-datetime";

import WebbDividerMedium from "../content/webx/webb-divider-md";
import AssetInfoDetailsModule from "../content/assets/assetx-details";
import AssetUnitListModule from "../content/assets/assetx-units";

import { GetLocalBusiness, GetLocalUser } from "../services/srvc-auth-local";
import { GetUserForm } from "../services/srvc-utilities";
import WebbMenuMobile from "../content/webz/webb-menu-xv";
import UserInfocardMobileModule from "../content/user/user-infocard-mobile";
import UserAccountBalance from "../content/user/user-account-balance";
import MenuButtons from "../content/webx/menu-buttons";
import AssetInfoDetailsModuleX from "../content/assets/assets-x-details";
import WebbDividerSmall from "../content/webx/webb-divider-sm";
import AssetGallerySection from "../content/assets/asset-gallery-section";
import AssetUnitProgressBarModule from "../content/assets.units/assets-progressbar";
import AssetUnitListProgressBarModule from "../content/assets/assets-ax-progressbar";
import AssetsStatGraph from "../content/webx/assets-stat-graph";
import WebbIconBack from "../content/webx/webb-icon-back";


export default function AssetsViewMarket() {
   const { id } = useParams();
  //  console.log("iTEM--------------", item);
  const usxx = GetUserForm();
  const usrx = GetLocalUser();
  const temx = GetLocalBusiness();
  const asset = usxx === "user" ? usrx : temx;
  const navigate = useNavigate();

  const metadata = {
    name: "Asset Details",
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
              <AssetInfoDetailsModuleX />
              <WebbDividerSmall />
              <AssetUnitListProgressBarModule />
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
                  <p className="m-0">Asset Details</p>
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
              <div className="mb-3"></div>
              <div>
                {/* <WebbDividerMedium /> */}
                <p className="text-normal text-color-main mx-3 my-2">
                  Asset Inventory
                </p>
                <p className="m-0 p-0 mx-3 text-small">
                  Select Individual Unit to review details and buy
                </p>
                <WebbDividerSmall />
                <AssetUnitListModule />
              </div>
              {/* <WebbDividerSmall /> */}
              <WebbDividerMedium />
              <AssetInfoDetailsModule />
              <WebbDividerSmall />
              <WebbDividerMedium />
              <p className="text-normal text-color-main mx-3">
                Historical Rate (INR)
              </p>
              <AssetsStatGraph />
              <WebbDividerMedium />
              <p className="text-normal text-color-main mx-3">
                Media and Documents
              </p>
              <AssetGallerySection />
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
          data: <>{/* <WebbDividerSmall /> */}</>,
          footer: <></>,
        }}
      />
    </>
  );
}
