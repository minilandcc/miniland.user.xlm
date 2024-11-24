// user account
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

import { NumberFormat } from "../../services/srvc-utilities";

import WebbDividerMedium from "../webx/webb-divider-md";
import WebbDividerSmall from "../webx/webb-divider-sm";
import FormNeeded from "../webx/form-needed";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-local";
import DropdownFormat from "../webz/dropdown-format-xm";

export default function ContractSearchModule() {
  const usxx = GetUserForm();
  const usrx = GetLocalUser();
  const temx = GetLocalBusiness();
  const asset = usxx === "user" ? usrx : temx;

  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState();
  const [data, setData] = useState({
    active: false,
    inactive: false,
    allstatus: true,
    realestate: false,
    land: false,
    residential: false,
    all: true,
  });
  const [searchButton, setSearchButton] = useState(false);



  const handleCheckboxChange = (key) => {
    let newData;

    if (key === "biomass") {
      newData = {
        ...data,
        land: true,
        residential: false,
        realestate: false,
        all: false,
      };
    } else if (key === "wind") {
      newData = {
        ...data,
        land: false,
        residential: true,
        realestate: false,
        all: false,
      };
    } else if (key === "hydro") {
      newData = {
        ...data,
        land: false,
        residential: false,
        realestate: true,
        all: false,
      };
    } else if (key === "all") {
      newData = {
        ...data,
        land: false,
        residential: false,
        realestate: false,
        all: true,
      };
    } else if (key === "allstatus") {
      newData = { ...data, allstatus: true, active: false, inactive: false };
    } else if (key === "active") {
      newData = { ...data, allstatus: false, active: true, inactive: false };
    } else if (key === "inactive") {
      newData = { ...data, allstatus: false, active: false, inactive: true };
    } else {
      newData = { ...data, [key]: !data[key] };
    }

    if (!newData.biomass && !newData.wind && !newData.hydro && !newData.all) {
      newData = { ...newData, all: true };
    }

    if (!newData.allstatus && !newData.active && !newData.inactive) {
      newData = { ...newData, allstatus: true };
    }

    setData(newData);
  };

  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value;

    setSearch(newSearchTerm);

    // onDataChange({
    //   ...data,
    //   searchTerm: newSearchTerm,
    //   searchButton: searchButton,
    // });
  };

  const handleSearchClick = () => {
    setSearchButton(true);
    // onDataChange({ ...data, searchTerm: search, searchButton: searchButton });
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="d-flex justify-content-evenly align-items-center d-md-block">
        {/* info */}
        <div className="">Search</div>
        <div
          className="mb-3 w-100 d-flex align-items-center"
          style={{ position: "relative" }}
        >
          <input
            type="text"
            className="form-control mt-3"
            value={search}
            onChange={handleInputChange}
            placeholder="Search"
          />
          <button
            type="button"
            className="btn btn-lg mt-3"
            style={{
              height: "35px",
              width: "48px",
              position: "absolute",
              right: "1px",
              padding: "0px",
              zIndex: "100",
              background: "white",
            }}
            onClick={handleSearchClick}
          >
            <i className="bx bx-search-alt"></i>{" "}
          </button>
        </div>
        {/* format */}
        <div className="d-none d-md-block">
          <WebbDividerSmall />
        </div>{" "}
        <div
          className="btn m-0 px-2 p-0 d-flex align-items-center d-md-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          Filters
          <i className={`bx ${isOpen ? "bx-chevron-up" : "bx-chevron-down"} ps-2`}></i>
          </div>
      </div>
      <DropdownFormat isOpen={isOpen}>
        <div className="back-color-wite p-2 px-3 rounded-xd">
          <div className="">
            <label className="form-label text-small">
              Formats <FormNeeded />
            </label>

            <div className="d-flex form-check form-switch m-0 p-0 mb-2">
              <div className="">
                <p className="m-0 p-0">Affidavit</p>
              </div>
              <div className="ms-auto">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  style={{ height: "1.2rem", width: "2rem" }}
                  checked={data.biomass}
                  onChange={() => handleCheckboxChange("biomass")}
                ></input>
              </div>
            </div>
            <div className="d-flex form-check form-switch m-0 p-0 mb-2">
              <div className="">
                <p className="m-0 p-0">Service Agreement</p>
              </div>
              <div className="ms-auto">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  style={{ height: "1.2rem", width: "2rem" }}
                  checked={data.wind}
                  onChange={() => handleCheckboxChange("wind")}
                ></input>
              </div>
            </div>
            <div className="d-flex form-check form-switch m-0 p-0 mb-2">
              <div className="">
                <p className="m-0 p-0">Work Agreement</p>
              </div>
              <div className="ms-auto">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  style={{ height: "1.2rem", width: "2rem" }}
                  checked={data.hydro}
                  onChange={() => handleCheckboxChange("hydro")}
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
                  checked={data.all}
                  onChange={() => handleCheckboxChange("all")}
                ></input>
              </div>
            </div>
          </div>
        </div>
        {/* status */}
        <div className="d-none d-md-block">
          <WebbDividerSmall />
        </div>{" "}
        <div className="back-color-wite p-2 px-3 rounded-xd ">
          <label className="form-label text-small">
            Status <FormNeeded />
          </label>

          <div className="d-flex form-check form-switch m-0 p-0 mb-2">
            <div className="">
              <p className="m-0 p-0">Active</p>
            </div>
            <div className="ms-auto">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                style={{ height: "1.2rem", width: "2rem" }}
                checked={data.active}
                onChange={() => handleCheckboxChange("active")}
              ></input>
            </div>
          </div>

          <div className="d-flex form-check form-switch m-0 p-0 mb-2">
            <div className="">
              <p className="m-0 p-0">Inactive</p>
            </div>
            <div className="ms-auto">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                style={{ height: "1.2rem", width: "2rem" }}
                checked={data.inactive}
                onChange={() => handleCheckboxChange("inactive")}
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
                checked={data.allstatus}
                onChange={() => handleCheckboxChange("allstatus")}
              ></input>
            </div>
          </div>
        </div>
      </DropdownFormat>
    </>
  );
}