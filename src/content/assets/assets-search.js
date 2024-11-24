// user account
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import WebbDividerMedium from "../webx/webb-divider-md";
import WebbDividerSmall from "../webx/webb-divider-sm";
import FormNeeded from "../webx/form-needed";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-local";

export default function AssetsSearchModule({ onDataChange }) {
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
    residential: false,
    realestate: false,
    land: false,
    all: true,
  });
  const [searchButton, setSearchButton] = useState(false);

  useEffect(() => {
    setSearchButton(false);
    onDataChange({ ...data, searchTerm: search, searchButton: searchButton });
  }, [data, search]);

  useEffect(() => {
    onDataChange({ ...data, searchTerm: search, searchButton: searchButton });
  }, [searchButton]);

  useEffect(() => {
    setSearch("");
    onDataChange({ ...data, searchTerm: search, searchButton: searchButton });
  }, [
    data.realestate,
    data.residential,
    data.land,
    data.all,
    data.allstatus,
    data.active,
    data.inactive,

  ]);

  useEffect(() => {
    if (asset) {
      const fetchData = async () => {
        setLoader(true);

        setLoader(false);
      };
      fetchData();
    } else {
    }
  }, []);

  const handleCheckboxChange = (key) => {
    let newData;

    if (key === "residential") {
      newData = {
        ...data,
        land: false,
        residential: true,
        realestate: false,
        all: false,
      };
    } else if (key === "land") {
      newData = {
        ...data,
        land: true,
        residential: false,
        realestate: false,
        all: false,
      };
    } else if (key === "realestate") {
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
      newData = { ...data, allstatus: true, active: false, inactive: false,};
    } else if (key === "active") {
      newData = { ...data, allstatus: false, active: true, inactive: false ,};
    } else if (key === "inactive") {
      newData = { ...data, allstatus: false, active: false, inactive: true ,};
    }  else {
      newData = { ...data, [key]: !data[key] };
    }

    if (!newData.land && !newData.realestate && !newData.residential && !newData.all) {
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

    onDataChange({
      ...data,
      searchTerm: newSearchTerm,
      searchButton: searchButton,
    });
  };

  const handleSearchClick = () => {
    setSearchButton(true);
    onDataChange({ ...data, searchTerm: search, searchButton: searchButton });
  };

  return (
    <>
      {/* info */}
      <div className="d-none d-md-block">Search</div>
      <div className="mb-0 mb-md-3" style={{ position: "relative" }}>
        <input
          type="text"
          className="form-control mt-3 text-md"
          value={search}
          placeholder="Search Assets"
          onChange={handleInputChange}
        />
        <button
          type="button"
          className="btn btn-lg"
          style={{
            height: "35px",
            width: "48px",
            position: "absolute",
            right: "1px",
            top: "2px",
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
      <WebbDividerSmall />
      <div className="back-color-wite p-2 px-3 rounded-xd">
        <div className="">
          <label className="form-label text-small">
            Type <FormNeeded />
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
                checked={data.residential}
                onChange={() => handleCheckboxChange("residential")}
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
                checked={data.realestate}
                onChange={() => handleCheckboxChange("realestate")}
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
                checked={data.land}
                onChange={() => handleCheckboxChange("Industrial")}
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
                checked={data.land}
                onChange={() => handleCheckboxChange("Agricultural")}
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
      {/* <WebbDividerSmall /> */}
      {/* <div className="back-color-wite p-2 px-3 rounded-xd">
        <div className="">
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
      </div> */}
    </>
  );
}
