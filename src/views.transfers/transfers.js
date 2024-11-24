import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import "./transfers.js";

import ContentFormat from "../content/webz/content-format-xv";
import WebbHeader from "../content/webz/webb-header-navs-xv";

import WebbIcon from "../content/webx/webb-icon";
import UserAvatar from "../content/webx/user-avatar";
import WebbDateTime from "../content/webx/webb-datetime";

import WebbDividerMedium from "../content/webx/webb-divider-md";
import WebbDividerSmall from "../content/webx/webb-divider-sm";

import { GetLocalBusiness, GetLocalUser } from "../services/srvc-auth-local";
import { GetUserForm } from "../services/srvc-utilities";

import TransfersListModule from "../content/transfers/transfers-list";
import WebbMenuMobile from "../content/webz/webb-menu-xv";
import UserInfocardMobileModule from "../content/user/user-infocard-mobile";
import UserAccountBalance from "../content/user/user-account-balance";
import MenuButtons from "../content/webx/menu-buttons";
import TransferSearchModule from "../content/transfers/transfers-search";
import TransfersActionsModule from "../content/transfers/transfers-actions";
import FormNeeded from "../content/webx/form-needed";

const list = [
  { name: "All", code: "all", actv: true },
  { name: "Success", code: "success", actv: true },
  { name: "Pending", code: "draft", actv: true },
  { name: "Pending", code: "pending", actv: false },
  { name: "Decline", code: "decline", actv: false },
  { name: "Failed", code: "failed", actv: false },
  { name: "Cancelled", code: "cancelled", actv: false },
];

export default function Transfers() {
  const usxx = GetUserForm();
  const usrx = GetLocalUser();
  const temx = GetLocalBusiness();
  const asset = usxx === "user" ? usrx : temx;

  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchStatus, setSearchStatus] = useState("all");
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const searchDates = {
    startDate,
    endDate,
  };

  const handleSearch = () => {
    setSearch(searchValue);
    setModalOpen(false);
  };

  const handleSearchDate = () => {};

  const metadata = {
    name: "Transfers",
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
              <p className="text-normal text-bold m-0">{metadata.name}</p>
              <WebbDividerSmall />
              <WebbDividerSmall />
              <WebbDividerSmall />
            </>
          ),
          data: (
            <>
              <div>
                <div className="input d-flex mt-2 justify-content-between align-items-center bg-white border py-1 rounded-2 px-2">
                  <input
                    type="text"
                    name="search"
                    id="search"
                    className=" border-0 w-100 py-1 bg-white"
                    value={searchValue}
                    placeholder="Search Transfers"
                    onChange={(e) => setSearchValue(e.target.value)}
                    style={{ outline: "none" }}
                  />
                  <i
                    className="bx bx-search"
                    onClick={handleSearch}
                    style={{ fontSize: "20px" }}
                  ></i>
                </div>
                <WebbDividerSmall />
                {/* Date filter */}
                <div className="back-color-wite p-2 px-3 rounded-xd">
                  <div className="mb-3">
                    <label className="form-label text-small">
                      Start Date <FormNeeded />
                    </label>
                    <input
                      type="date"
                      className="form-control height-md rounded-wd"
                      style={{ fontSize: "0.9rem", height: "2.7rem" }}
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    ></input>
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-small">
                      End Date <FormNeeded />
                    </label>
                    <input
                      type="date"
                      className="form-control height-md rounded-wd"
                      style={{ fontSize: "0.9rem", height: "2.7rem" }}
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    ></input>
                  </div>
                </div>
              </div>
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
                  <p className="m-0">Account Transfers</p>
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
              <div className="d-md-none d-block mb-2"></div>
              {/* <WebbDividerSmall /> */}
              <div className=" d-md-block d-none">
                <WebbDividerSmall />
              </div>
              <div className=" d-flex justify-content-between">
                <div className="mx-3">
                  {list &&
                    list.map((item, i) => (
                      <span
                        className={item.actv ? "" : "d-none"}
                        key={i}
                        onClick={() => setSearchStatus(item.code)}
                      >
                        <span
                          className={`p-2 px-3 rounded-xx text-small ${
                            searchStatus == item.code
                              ? "back-color-main text-color-wite"
                              : "back-color-wite cursor"
                          }`}
                        >
                          {item.name}
                        </span>
                        <span className=" me-md-2 me-0"></span>
                      </span>
                    ))}
                </div>
                <div
                  className="d-flex align-items-center d-md-none gap-1 text-small cursor"
                  onClick={openModal}
                >
                  Filter
                  <i
                    class="bx bx-slider-alt me-2"
                    style={{ fontSize: "14px" }}
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
                        <h1 className="modal-title fs-5">Filter Transfers</h1>
                        <button
                          type="button"
                          className="btn-close"
                          onClick={closeModal}
                        ></button>
                      </div>
                      <div className="modal-body mt-3">
                        <div>
                          <div className="input d-flex mt-2 justify-content-between align-items-center bg-white border py-1 rounded-2 px-2 mx-3">
                            <input
                              type="text"
                              name="search"
                              id="search"
                              className=" border-0 w-100 py-1 bg-white"
                              value={searchValue}
                              placeholder="Search Transfers"
                              onChange={(e) => setSearchValue(e.target.value)}
                              style={{ outline: "none" }}
                            />
                            <i
                              className="bx bx-search"
                              onClick={handleSearch}
                              style={{ fontSize: "20px" }}
                            ></i>
                          </div>
                          <WebbDividerSmall />
                          <div className="back-color-wite p-2 px-3 rounded-xd">
                            <div className="mb-3">
                              <label className="form-label text-small">
                                Start Date <FormNeeded />
                              </label>
                              <input
                                type="date"
                                className="form-control height-md rounded-wd"
                                style={{ fontSize: "0.9rem", height: "2.7rem" }}
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                              ></input>
                            </div>

                            <div className="mb-3">
                              <label className="form-label text-small">
                                End Date <FormNeeded />
                              </label>
                              <input
                                type="date"
                                className="form-control height-md rounded-wd"
                                style={{ fontSize: "0.9rem", height: "2.7rem" }}
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                              ></input>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <WebbDividerSmall />
              <TransfersListModule
                search={search}
                status={searchStatus}
                searchDates={searchDates}
              />

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
              <TransfersActionsModule />
            </>
          ),
          footer: <></>,
        }}
      />
    </>
  );
}
