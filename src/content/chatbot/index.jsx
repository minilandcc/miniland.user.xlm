import React, { useEffect, useState, useRef } from "react";
import WebbDividerMedium from "../webx/webb-divider-md";
import {GetLiveMessages} from "../../services/srvc-realm-watch"
import { useNavigate } from "react-router-dom";
import Jazzicon from "react-jazzicon/dist/Jazzicon";
import { jsNumberForAddress } from "react-jazzicon";
import { fetchRoomsMessageList } from "../../services/srvc-chat-realm";
import styles from "./chat.module.css";
import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalBusiness, GetLocalUser } from "../../services/srvc-auth-local";

const Chatbot = (props) => {

  const usxx = GetUserForm()
  const usrx = GetLocalUser()
  const temx = GetLocalBusiness()
  const asset = usxx === 'user' ? usrx : temx

  const [selected, setSelected] = useState(props?.room || null);

  const [roomlist, setRoomList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState();
  var [Arr, setArr] = useState([]);

  const containerRef = useRef(null);
  const messagesEndRef = useRef();
  const fileInputRef = useRef(null);
  const router = useNavigate();

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "auto", block: "end" });
    }
  }, [messages]);

 
  useEffect(() => {
    setRoomId(props?.room?.item || null);
  }, [props]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const result = await fetchRoomsMessageList({ data: { room: roomId || "" } });
        
        if (result.stat) {
          setMessages(result.data.list);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchdata();
  }, [roomId]);

  useEffect(() => {
  //  console.log("running")
    const fetchupdate = async () => {
      var res = await GetLiveMessages(roomId); // db watch for live messages update
      // console.log(res)
      if (roomId && res) {
        setArr([res]);
      }
      setRefresh(false);
      props.handleRefresh(!refresh)
    };
    fetchupdate();
    
  }, [roomId, props.refresh ]);

  useEffect(() => {
    // if(refresh == false)
    // {
    // setTimeout(() => {

    // console.log("Arr",Arr)
    // console.log("roomid" , roomId)

    if (Arr.length > 0 && Arr[Arr.length - 1]?.room === roomId) {
      const existingIndex = messages.findIndex(
        (item) => item.item === Arr[Arr.length - 1].item
      );

      if (existingIndex === -1) {
        // console.log("chat recieved.", incomingChats[incomingChats.length - 1]);
        setMessages((message) => [...message, Arr[Arr.length - 1]]);
        setArr([]);
        setRefresh(true);
        scrollToBottom();
      }
    }
    // }, 100);
    // }
  }, [refresh, Arr]);

  const scrollToBottom = () => {
    containerRef.current?.scrollIntoView({ behavior: "auto", block: "end" });
  };

  // let senderData = messages.length > 0 ? messages[messages.length - 1] : "";
  return (
    <div>
      {" "}
      {roomId === null || "" ? (
        <div className="container px-0 d-lg-block d-none">
          <div className="p-4 rounded-4" style={{ backgroundColor: "#f5f5f5" }}>
            <h2 style={{ fontFamily: "serif" }}>
              
              <i className="bx bxs-crown text-color-dark"></i>
            </h2>
            <p>
            Welcome to Miniland's real estate chat room! Connect with property owners, buyers, and experts in the real estate world. Collaborate, share insights, and discuss opportunities. Whether you're looking to buy, sell, or explore investment options, this space is designed to foster productive conversations and build meaningful relationships. Start connecting today and turn your real estate aspirations into reality!
            </p>
            <p>
            Stay updated on the latest property listings, trends, and opportunities. Whether you’re a first-time buyer or a seasoned investor, this platform allows you to network, discuss strategies, and make informed decisions. Engage with the community, ask questions, and turn your property goals into reality with the power of collaboration. Let’s build your real estate journey together!
            </p>
          </div>
          <WebbDividerMedium />
          <WebbDividerMedium />
          <WebbDividerMedium />
          <div className="d-lg-flex gap-4 ">
            <div
              className="rounded-4 p-4 w-lg-50 w-100 cursor d-none"
              style={{ backgroundColor: "#f5f5f5" }}
            >
              <div
                className="text-bold mb-1  "
                style={{ fontFamily: "serif", fontSize: "18px" }}
              >
                List flights flying from
              </div>
              <div className="text-small">San Francisco to Rome today</div>
            </div>

            <div
              className="rounded-4 p-4 w-lg-50 w-100 mt-2 mt-lg-0 cursor d-none"
              style={{ backgroundColor: "#f5f5f5" }}
            >
              <div
                className="text-bold mb-1"
                style={{ fontFamily: "serif", fontSize: "18px" }}
              >
                What is the status
              </div>
              <div className="text-small">of flight BA142?</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-0 m-0">
          <div className={roomId ? "" : "d-none"}>
            <div ref={containerRef} style={{ marginBottom: "13em" }}>
              {messages &&
                messages.map((item, i) => (
                  <div key={i} className="mb-1">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        {item?.sndr?.item == asset.item ? (
                          <>
                            <Jazzicon
                              diameter={15}
                              seed={jsNumberForAddress(
                                item?.sndr?.item || Date.now().toString()
                              )}
                            />
                          </>
                        ) : (
                          <>
                            <Jazzicon
                              diameter={15}
                              seed={jsNumberForAddress(
                                item?.sndr?.item || Date.now().toString()
                              )}
                            />
                            {/* <img
                              src="/gemini.png"
                              alt="icon"
                              height={20}
                              width={20}
                              className=""
                            /> */}
                          </>
                        )}

                        <span className="text-bold opacity-75 mx-2">
                          {item?.sndr?.name || "******"}
                        </span>
                      </div>
                      <span className="opacity-50" style={{ fontSize: "12px" }}>
                        {" "}
                        {new Date(parseInt(item?.crts)).toLocaleString()}
                      </span>
                    </div>
                    <div className="d-flex">
                      <div>
                        <div className="d-flex gap-2 px-4">
                          <h6
                            className="opacity-75"
                            style={{ fontSize: "15px" }}
                          >
                            {" "}
                            {/* {item?.text} */}
                          </h6>
                        </div>
                        <div className="d-flex ">
                          {item &&
                          item.medi &&
                          item?.medi?.link &&
                          item.medi.mime.split("/")[0] == "image" ? (
                            <img
                              onClick={() => window.open(item?.medi?.link)}
                              className="rounded-xd cursor img-fluid w-75  mt-3"
                              src={item?.medi?.link}
                            />
                          ) : (
                            <div>
                              {item &&
                              item.medi &&
                              item?.medi?.link &&
                              item.medi.mime === "application/pdf" ? (
                                <>
                                  <div
                                    // className="d-flex justify-content-between px-4 align-items-center rounded-xd  p-2 "
                                    className={`d-flex justify-content-between px-4 py-3 align-items-center rounded-xd border p-2 mt-2 ${styles.pdf} `}
                                    // style={{ width: "600px" }}
                                  >
                                    <div className="  gap-4 justify-content-between align-items-center ">
                                      <p className="text-small m-0 text-bold">
                                        {item?.cont?.name || ""}
                                      </p>
                                      <p className="text-small m-0 py-2">
                                        {item?.text}
                                      </p>
                                      {/* <p className=" text-small m-0">{item?.cont?.mail || ''}</p>
                                  <p className=" text-small">{item?.cont?.mobile || ''}</p> */}
                                      <div className="mt-2 d-flex justify-content-between">
                                        <button
                                          onClick={() =>
                                            window.open(item?.medi?.link)
                                          }
                                          className="btn btn-light hilite rounded-xx text-small d-flex align-items-center"
                                          style={{ width: "auto" }}
                                        >
                                          <img
                                            src="https://png.pngtree.com/png-clipart/20220612/original/pngtree-pdf-file-icon-png-png-image_7965915.png"
                                            style={{
                                              width: "20px",
                                              height: "20px",
                                            }}
                                            className="me-2"
                                          />
                                          <span className="text-nowrap">
                                            View Resume
                                          </span>
                                        </button>
                                        <button
                                          className="btn btn-light rounded-xx text-small hilite mx-3 d-flex align-items-center"
                                          style={{ width: "auto" }}
                                        >
                                          <i className="bx bx-plus me-2"></i>
                                          Connect
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div>
                                    <div className="  px-4 gap-4 justify-content-between align-items-center ">
                                      <p className="text-small m-0">
                                        {item?.text}
                                      </p>
                                     
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div
                        className={
                          item?.sndr?.mmid == "7400196123"
                            ? "text-end p-1 "
                            : " d-none"
                        }
                      >
                        <small
                          className={
                            item?.stat?.sent &&
                            item?.stat?.delv &&
                            item?.stat?.seen
                              ? ""
                              : "d-none"
                          }
                        >
                          <i className="bx bx-check-double text-primary bx-xs"></i>
                        </small>
                        <small
                          className={
                            item?.stat?.sent &&
                            item?.stat?.delv &&
                            !item?.stat?.seen
                              ? ""
                              : "d-none"
                          }
                        >
                          <i className="bx bx-check-double"></i>
                        </small>
                        <small
                          className={
                            item?.stat?.sent &&
                            !item?.stat?.delv &&
                            !item?.stat?.seen
                              ? ""
                              : "d-none"
                          }
                        >
                          <i className="bx bx-check"></i>
                        </small>
                        <small
                          className={
                            item?.stat?.sent &&
                            !item?.stat?.delv &&
                            item?.stat?.seen
                              ? ""
                              : "d-none"
                          }
                        >
                          <i className="bx bx-check"></i>
                        </small>
                        <small
                          className={
                            !item?.stat?.sent &&
                            !item?.stat?.delv &&
                            !item?.stat?.seen
                              ? ""
                              : "d-none"
                          }
                        >
                          <i className="bx bxs-circle text-danger"></i>
                        </small>
                      </div>
                    </div>

                    <div
                      className={
                        item?.cont && item?.cont != null && item?.cont?.name
                          ? "justify-content-center px-4 d-none"
                          : "d-none"
                      }
                    >
                      <div
                        style={{ width: "600px" }}
                        className="d-flex justify-content-between  align-items-center rounded-xd border p-2 mt-2"
                      >
                        <p className="mx-4 m-0 text-small">
                          Name : {item?.cont?.name || ""}
                        </p>
                        <p className="mx-4 m-0 text-small">
                          Mail : {item?.cont?.mail || ""}
                        </p>
                        <p className="mx-4 text-small">
                          Mobile : {item?.cont?.mobile || ""}
                        </p>
                      </div>
                    </div>

                    <div className="mb-3"></div>
                  </div>
                ))}
            </div>
          </div>
          <div ref={containerRef} style={{ marginBottom: "10rem" }}></div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
