import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import ContentFormat from "../content/webz/content-format-xv";

import WebbIcon from "../content/webx/webb-icon";
import WebbHeader from "../content/webz/webb-header-navs-xv";
import UserAvatar from "../content/webx/user-avatar";
import WebbDateTimeMedium from "../content/webx/webb-datetime";
import WebbDividerSmall from "../content/webx/webb-divider-sm";
import { useEffect, useState } from "react";
import Chatbot from "../content/chatbot";
import Inputbox from "../content/Inputbox";
import { useNavigate } from "react-router-dom";
import Chathistory from "../content/chathistory/index";
import "./room.css";
import WebbMenuMobile from "../content/webz/webb-menu-xv";
import UserInfocardMobileModule from "../content/user/user-infocard-mobile";
import UserAccountBalance from "../content/user/user-account-balance";
import MenuButtons from "../content/webx/menu-buttons";
import WebbIconBack from "../content/webx/webb-icon-back";
import { RoomsDetails } from "../services/srvc-chat-realm";
import { GetLocalBusiness, GetLocalUser } from "../services/srvc-auth-local";
import { GetUserForm } from "../services/srvc-utilities";

const metadata = {
  name: "Rooms",
  banner: {
    link: "https://img.freepik.com/free-vector/abstract-banner-with-world-map_1048-12232.jpg?&w=996",
  },
};

export default function Main() {

  const usxx = GetUserForm()
  const usrx = GetLocalUser()
  const temx = GetLocalBusiness()
  const asset = usxx === 'user' ? usrx : temx

  const [user, setUser] = useState(null);
  const [roomselected, setRoomSelected] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [show, setShow] = useState(false);
  const router = useNavigate();
  

 

  const handleRoomSelect = async (item) => {
    setRoomSelected(item);
    setRefresh(!refresh);
    setShow(true);
  };

  const handleRefresh = async (item) => {
    // console.log("handle refresh")
    setRefresh(!refresh);
  };

  const handleNewRoomSelected = async (item) => {
    const res = await RoomsDetails({data:{item:item}, srvc:''})
    if (res.stat) {
      // setTimeout(() => {
        setRoomSelected(res.data);
      // }, 2000);
    }
  };

  const ResetRoomSelection = async () => {
    setRoomSelected(null);
  };


  const AccountLogout = async () => {
    setRefresh(!refresh);
    router("/auth/x");
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
      <main className={``}>
        <ContentFormat
          name={metadata.name}
          media={{ size: "xtra", show: false, data: <></> }}
          header={{
            header: (
              <>
                <WebbIcon
                  data={{ color: "text-color-main", size: "text-icon-md" }}
                />
              </>
            ),
            data: (
              <>
                <WebbHeader />
              </>
            ),
            footer: (
              <>
                <UserAvatar />
              </>
            ),
          }}
          sidebar={{
            header: (
              <>
                <p className="text-normal text-bold m-0">{metadata.name}</p>
              </>
            ),
            data: (
              <>
                <Chathistory
                  refresh={refresh}
                  selectroom={handleRoomSelect}
                  handleRefresh={handleRefresh}
                  handleRoomReset={ResetRoomSelection}
                  setShow={setShow}
                />

                <WebbDividerSmall />
              </>
            ),
            footer: (
              <>
                <WebbDateTimeMedium />
              </>
            ),
          }}
          content={{
            header: (
              <>
                <div className="d-flex justify-content-between justify-content-md-start align-items-start">
                  <div className="d-flex gap-4">
                    {!show ? (
                      <i
                        data-bs-toggle="offcanvas"
                        href="#offcanvasExample"
                        role="button"
                        aria-controls="offcanvasExample"
                        className="bx bx-menu d-block d-md-none"
                        style={{ fontSize: "25px" }}
                      ></i>
                    ) : (
                      <div
                        className="cursor d-md-none d-block"
                        style={{ position: "relative", bottom: "5px" }}
                        onClick={() => {
                          setShow(!show);
                          setRoomSelected(null);
                        }}
                      >
                        <WebbIconBack
                          data={{
                            color: "text-color-tone",
                            size: "text-icon-sm",
                          }}
                        />
                      </div>
                    )}
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
                    <p className="">{roomselected?.name || metadata.name}</p>
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
              <div className="d-flex flex-column justify-content-between position-relative mainBox">
                <div className={`first-component d-lg-none d-block`}>
                  {!show ? (
                    <Chathistory
                      refresh={refresh}
                      selectroom={handleRoomSelect}
                      handleRefresh={handleRefresh}
                      handleRoomReset={ResetRoomSelection}
                    />
                  ) : (
                    ""
                  )}
                </div>
                <Chatbot room={roomselected} refresh={refresh} handleRefresh={handleRefresh} />
                <div className={` bg-white py-2 px-3 px-md-0 inputBox`}>
                  {show ? (
                    <Inputbox
                      handleRefresh={handleRefresh}
                      room={roomselected}
                      refresh={refresh}
                      newroomselect={handleNewRoomSelected}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ),
          }}
          actionbar={{
            header: <>Actions</>,
            data: <>{/* 4th section */}</>,
            footer: <></>,
          }}
        ></ContentFormat>
      </main>
    </>
  );
}
