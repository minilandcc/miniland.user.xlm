
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

export default function HomeUser() {
  const usxx = GetUserForm();
  const usrx = GetLocalUser();
  const temx = GetLocalBusiness();
  const asset = usxx === "user" ? usrx : temx;

  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const [filter, setFilter] = useState({
    active: false,
    inactive: false,
    allstatus: true,
    residential: false,
    realestate: false,
    land: false,
    agricultural:false,
    industrial: false,
    all: true,
  });

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {}, []);

  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearch(newSearchTerm);
  };


  const handleCheckboxChange = (key) => {
    let newData;

    if (key === "residential") {
      newData = {
        land: false,
        residential: true,
        realestate: false,
        agricultural:false,
        industrial:false,
        all: false,
      };
    } else if (key === "land") {
      newData = {
        land: true,
        residential: false,
        realestate: false,
        agricultural:false,
        industrial:false,
        all: false,
      };
    } else if (key === "realestate") {
      newData = {
        land: false,
        residential: false,
        realestate: true,
        agricultural:false,
        industrial:false,
        all: false,
      };
    } else if (key === "all") {
      newData = {
        land: false,
        residential: false,
        realestate: false,
        agricultural:false,
        industrial:false,
        all: true,
      };
    }
    else if (key === "agricultural") {
      newData = {
        land: false,
        residential: false,
        realestate: false,
        agricultural:true,
        industrial:false,
        all: false,
      };
    }
    else if (key === "industrial") {
      newData = {
        land: false,
        residential: false,
        realestate: false,
        agricultural:false,
        industrial:true,
        all: false,
      };
    }


    setFilter(newData);
    closeModal()
  };
 
  


  const handleSearchClick = () => {
    if (asset) {
      const fetchData = async () => {
        setLoader(true);

        const result = await AssetSearch({
          data: {
            // creator: "",
            search: { search },
            // user: asset.item,
            type: filter,
            index: 1,
            items: 25,
            filters: { name: {} },
          },
        });
        // console.log("Searching .......", result);
        if (result.stat) setData(result.data.list);

        setLoader(false);
      };
      fetchData();
    } else {
      setData([]);
    }
  };

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
            </>
          ),
          data: (
            <>
              <WebbDividerSmall />
              <UserInfocardMobileModule />
              <UserAccountBalance />
              <WebbDividerSmall />
              <UserActionsHomeModule />
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
                  <p className="m-0">Dashboard</p>
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
              <div>
                <WebbDividerSmall />
                <StockMarketGrowth />
                {/* <WebbDividerSmall /> */}
                <div className="input d-flex justify-content-between align-items-center bg-white border py-2 rounded-2 px-2 mt-4 mb-1">
                  <input
                    type="text"
                    name="search"
                    id="search"
                    className=" border-0 w-100"
                    placeholder="Search Assets"
                    value={search}
                    onChange={handleInputChange}
                    style={{ outline: "none" }}
                  />
                  <i
                    className="bx bx-search"
                    style={{ fontSize: "20px" }}
                    onClick={handleSearchClick}
                  ></i>
                </div>
              </div>
              {/* <WebbDividerSmall /> */}
              <WebbDividerSmall />
              <div className="d-flex justify-content-between my-2">
                <h2 className="text-normal m-0 ms-3">{"Featured Projects"}</h2>
                <div
                  className="d-flex align-items-center gap-1 cursor"
                  onClick={openModal}
                >
                  Filter
                  <i
                    class="bx bx-slider-alt me-2"
                    style={{ fontSize: "16px" }}
                  ></i>
                </div>
              </div>
              {isModalOpen && (
                <div className="modal-overlay">
                  <div className="modal-dialog modal-dialog-scrollable mt-0 pt-0 rounded-xd w-100">
                    <div
                      className="modal-content"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="modal-header">
                        <h1 className="modal-title fs-5">Filter Assets</h1>
                        <button
                          type="button"
                          className="btn-close"
                          onClick={closeModal}
                        ></button>
                      </div>
                      <div className="modal-body mt-3">
                        <div className="back-color-wite p-2 px-3 rounded-xd">
                          <div className="">
                            <label className="form-label text-small fw-bold mb-2">
                              AssetType <FormNeeded />
                            </label>

                            <div className="d-flex form-check form-switch m-0 p-0 mb-2">
                              <div className="">
                                <p className="m-0 p-0">Residential</p>
                              </div>
                              <div className="ms-auto">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  style={{ height: "1.2rem", width: "2rem" }}
                                  checked={filter.residential}
                                  onChange={() =>
                                    handleCheckboxChange("residential")
                                  }
                                ></input>
                              </div>
                            </div>
                            <div className="d-flex form-check form-switch m-0 p-0 mb-2">
                              <div className="">
                                <p className="m-0 p-0">Realestate</p>
                              </div>
                              <div className="ms-auto">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  style={{ height: "1.2rem", width: "2rem" }}
                                  checked={filter.realestate}
                                  onChange={() =>
                                    handleCheckboxChange("realestate")
                                  }
                                ></input>
                              </div>
                            </div>
                            <div className="d-flex form-check form-switch m-0 p-0 mb-2 d-none">
                              <div className="">
                                <p className="m-0 p-0">Land</p>
                              </div>
                              <div className="ms-auto">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  style={{ height: "1.2rem", width: "2rem" }}
                                  checked={filter.land}
                                  onChange={() => handleCheckboxChange("land")}
                                ></input>
                              </div>
                            </div>
                            <div className="d-flex form-check form-switch m-0 p-0 mb-2">
                              <div className="">
                                <p className="m-0 p-0">Industrial</p>
                              </div>
                              <div className="ms-auto">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  style={{ height: "1.2rem", width: "2rem" }}
                                  checked={filter.industrial}
                                  onChange={() =>
                                    handleCheckboxChange("industrial")
                                  }
                                ></input>
                              </div>
                            </div>
                            <div className="d-flex form-check form-switch m-0 p-0 mb-2">
                              <div className="">
                                <p className="m-0 p-0">Agricultural</p>
                              </div>
                              <div className="ms-auto">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  style={{ height: "1.2rem", width: "2rem" }}
                                  checked={filter.agricultural}
                                  onChange={() =>
                                    handleCheckboxChange("agricultural")
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
                                  checked={filter.all}
                                  onChange={() => handleCheckboxChange("all")}
                                ></input>
                              </div>
                            </div>

                            <div className="d-flex mt-5 d-none">
                              <div className="me-auto">
                                <button
                                  type="button"
                                  className="btn btn-light text-small rounded-xx bg-body-tertiary"
                                  // onClick={closeOffersModal}
                                >
                                  Clear
                                </button>
                              </div>
                              <div className="text-end">
                                <button
                                  // onClick={() => {
                                  //   ApplyFilter()
                                  // }}
                                  type="button"
                                  className="btn btn-outline-primary text-small rounded-xx"
                                >
                                  Apply
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <WebbDividerSmall />
              <AssetsListMarketModule
                list={data}
                search={search}
                filter={filter}
              />
              <WebbDividerMedium />{" "}
              <h2 className="text-normal m-0 ms-3">
                {"Pending Document Signature"}
              </h2>
              <WebbDividerSmall />
              <ContractListPendingModule />
              <WebbDividerMedium />
              <h2 className="text-normal m-0 ms-3">
                {"Pending Asset Transfers"}
              </h2>
              <WebbDividerSmall />
              <TransfersAssetListWaitModule />
              <WebbDividerMedium />
              <h2 className="text-normal m-0 ms-3">
                {"Pending Fund Transfers"}
              </h2>
              <WebbDividerSmall />
              <TransfersFundsListWaitModule />
              <WebbDividerMedium />{" "}
              <h2 className="text-normal m-0 ms-3">{"Pending Offers "}</h2>
              <WebbDividerSmall />
              <OffersListPendingModule />
              <WebbDividerMedium />
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
          header: <>Miniland Upcomings</>,
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
