
import { GetRoomNotification, watchCollection } from "../../services/srvc-realm-watch";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRoomList } from "../../services/srvc-chat-realm";
import Jazzicon from "react-jazzicon/dist/Jazzicon";
import "./history.css";
import { GetLocalBusiness, GetLocalUser } from "../../services/srvc-auth-local";
import { GetUserForm } from "../../services/srvc-utilities";
import * as Realm from "realm-web";
const app = new Realm.App({ id: "miniland-rooms-qudptma" });

const Chathistory = (props) => {
  const { dismissOffcanvas, setShow } = props;
  const [roomlist, setRoomList] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [selected, setSelected] = useState(props?.room || null);
  const [loading, setLoading] = useState(false);
  const [mongoUser, setMongoUser] = useState('')
  const [makeConnect, setMakeConnect] = useState()


  const navigate = useNavigate();


  const usxx = GetUserForm()
  const usrx = GetLocalUser()
  const temx = GetLocalBusiness()
  const asset = usxx === 'user' ? usrx : temx

  useEffect(() => {

    const fetchupdate = async () => {
      
        var res = await GetRoomNotification(asset.item);
      
         
    };
    fetchupdate();
  }, [selected, props.refresh, refresh]);

  useEffect(()=>{
   setRefresh(!refresh)
  },[props.refresh])

  useEffect(() => {
      const fetchdata = async () => {
        // setLoading(true);
        try {
          const result = await fetchRoomList({
            data: { user: asset?.item || "" },
          });
          // console.log("RESULT---290", result);
          if (result.stat) {
            setRoomList(result.data.list);
          } else {
            console.error("API returned an error:", result.error);
          }
        } catch (error) {
          console.error("Error fetching message list:", error);
        }
        // setLoading(false);
      };

      fetchdata();
    
  }, [refresh]);



  const handleRoomSelection = async (item) => {
    setSelected(item);
    props.selectroom(item);
  };

  const ResetRoom = () => {
    props.handleRoomReset();
    setShow(true);
  };

  return (
    <div className="mt-1">
      {loading ? (
        <div>Loading...</div>
      ) : roomlist.length === 0 ? (
        <>
          
          <hr />
        </>
      ) : (
        roomlist.map((item, index) => (
          <>
            <div
              key={index}
              onClick={() => handleRoomSelection(item)}
              className="hilite rounded cursor d-flex align-items-center justify-content-between mb-1 py-1"
              {...(dismissOffcanvas ? { "data-bs-dismiss": "offcanvas" } : {})}
            >
              <div className="d-md-flex align-items-center justify-content-between d-none w-100">
                <div className=" d-flex align-items-center">
                  <Jazzicon diameter={35} />
                  <div className="d-flex flex-column gap-0">
                    <span
                      style={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        fontSize: "13px",
                      }}
                      className={`mx-2 textWidth text-bold`}
                    >
                      {item.name}
                    </span>
                    <span
                      style={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        // fontSize: "16px",
                      }}
                      className={`mx-2 text-mini textWidth`}
                    >
                      {item.lastMessage}
                    </span>
                  </div>
                </div>
                <span
                  className="d-flex justify-content-center text-mini align-items-center text-white rounded-circle"
                  style={{
                    height: "18px",
                    width: "18px",
                    backgroundColor: "#5FD2D7",
                  }}
                >
                  2
                </span>
              </div>
              <div className="d-md-flex align-items-center justify-content-between d-md-none w-100">
                <div className=" d-flex align-items-center">
                  <Jazzicon diameter={35} />
                  <div className="d-flex flex-column gap-0">
                    <span
                      // style={{
                      //   overflow: "hidden",
                      //   whiteSpace: "nowrap",
                      //   textOverflow: "ellipsis",
                      //   fontSize: "13px",
                      // }}
                      className={`mx-2 text-bold`}
                    >
                      {item.name}
                    </span>
                    <span
                      style={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        // fontSize: "16px",
                      }}
                      className={`mx-2 text-mini textWidth`}
                    >
                      {item.lastMessage}
                    </span>
                  </div>
                </div>
                {/* <span
                  className="d-flex justify-content-center text-mini align-items-center text-white rounded-circle"
                  style={{
                    height: "18px",
                    width: "18px",
                    backgroundColor: "#25d366",
                  }}
                >
                  2
                </span> */}
              </div>
            </div>
            <hr
              className={`my-2 ${
                index === roomlist.length - 1 ? "d-none" : ""
              }`}
            />
          </>
        ))
      )}
    </div>
  );
};

export default Chathistory;
