// import React, { useEffect, useState } from "react";
// // import { useRouter } from "next/navigation";
// import { useNavigate } from "react-router-dom";
// // import styles from "@/content/Inputbox/inputbox.module.css";

// const Inputbox = (props) => {
//   const [inputValue, setInputValue] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [asset, setAsset] = useState();

//   const router = useNavigate();

//   const handleChange = (e) => {
//     setInputValue(e.target.value);
//   };

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("indx"));
//     // console.log(asset)
//     const team = JSON.parse(localStorage.getItem("bznx"));
//     setAsset(user ? user : team);
//     if (user == null && team == null) {
//       router("/auth");
//     }
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (inputValue.trim() !== "") {
//       setMessages([...messages, inputValue]);
//       setInputValue("");
//       AddMessage();
//     }
//   };

//   const AddMessage = async () => {
//     var datx = {
//       text: inputValue,
//       template: "",
//       mode: "text",
//       media: {},
//       room: props?.room?.item || null,
//       sender: {
//         name: asset.name,
//         mail: asset.mail,
//         item: asset.item,
//         mobile: asset.mobile,
//       },
//       receiver: {
//         name: "workbasis",
//         mail: "aisupport@workbasis.co",
//         item: "",
//         mobile: "",
//       },
//     };
//     // console.log(datx)
//     const res = await fetch("/api/user-send-message", {
//       body: JSON.stringify({ data: datx, srvc: "******" }),
//       headers: { "Content-Type": "application/json" },
//       method: "POST",
//     });
//     var result = JSON.parse(await res.json());
//     //console.log(result)
//     if (props?.room == null) {
//       // this is the case where we need to set room details and render UI
//       props.newroomselect(result?.data?.room);
//     }
//   };

//   return (
//     <div
//       className="d-flex justify-content-center mt-auto"
//     >
//       <form
//         className="w-100 p-3 rounded-4 d-flex justify-content-between align-items-center gap-3"
//         style={{ backgroundColor: "#f5f5f5" }}
//         onSubmit={handleSubmit}
//       >
//         <i
//           className="bx bx-plus bg-white p-1 rounded-circle border cursor"
//           style={{ fontSize: "22px", marginRight: "5px" }}
//         ></i>

//         <input
//           type="text"
//           name="text-input"
//           id="input"
//           placeholder="Send a message."
//           value={inputValue}
//           onChange={handleChange}
//           className={`border-none py-2 outline-none w-100`}
//           style={{ backgroundColor: "#f5f5f5", outline: "none" }}
//         />
//         <button
//           className=""
//           type="submit"
//           style={{ border: "none",background:"none" }}
//         >
//           {/* <i
//             className="bx bx-subdirectory-left"
//             style={{ fontSize: "24px", color: "gray" }}
//           ></i> */}
//           <i className="bx bx-send" style={{ fontSize: "22px", color: "gray" }}></i>
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Inputbox;



// import React, { useEffect, useState } from "react";
// // import { useRouter } from "next/navigation";
// import { useNavigate } from "react-router-dom";
// // import styles from "@/content/Inputbox/inputbox.module.css";

// const Inputbox = (props) => {
//   const [inputValue, setInputValue] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [asset, setAsset] = useState();

//   const router = useNavigate();

//   const handleChange = (e) => {
//     setInputValue(e.target.value);
//   };

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("indx"));
//     // console.log(asset)
//     const team = JSON.parse(localStorage.getItem("bznx"));
//     setAsset(user ? user : team);
//     if (user == null && team == null) {
//       router("/auth");
//     }
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (inputValue.trim() !== "") {
//       setMessages([...messages, inputValue]);
//       setInputValue("");
//       AddMessage();
//     }
//   };

//   const AddMessage = async () => {
//     var datx = {
//       text: inputValue,
//       template: "",
//       mode: "text",
//       media: {},
//       room: props?.room?.item || null,
//       sender: {
//         name: asset.name,
//         mail: asset.mail,
//         item: asset.item,
//         mobile: asset.mobile,
//       },
//       receiver: {
//         name: "workbasis",
//         mail: "aisupport@workbasis.co",
//         item: "",
//         mobile: "",
//       },
//     };
//     // console.log(datx)
//     const res = await fetch("/api/user-send-message", {
//       body: JSON.stringify({ data: datx, srvc: "******" }),
//       headers: { "Content-Type": "application/json" },
//       method: "POST",
//     });
//     var result = JSON.parse(await res.json());
//     //console.log(result)
//     if (props?.room == null) {
//       // this is the case where we need to set room details and render UI
//       props.newroomselect(result?.data?.room);
//     }
//   };

//   return (
//     <div
//       className="d-flex justify-content-center mt-auto"
//     >
//       <form
//         className="w-100 p-3 rounded-4 d-flex justify-content-between align-items-center gap-3"
//         style={{ backgroundColor: "#f5f5f5" }}
//         onSubmit={handleSubmit}
//       >
//         <i
//           className="bx bx-plus bg-white p-1 rounded-circle border cursor"
//           style={{ fontSize: "22px", marginRight: "5px" }}
//         ></i>

//         <input
//           type="text"
//           name="text-input"
//           id="input"
//           placeholder="Send a message."
//           value={inputValue}
//           onChange={handleChange}
//           className={`border-none py-2 outline-none w-100`}
//           style={{ backgroundColor: "#f5f5f5", outline: "none" }}
//         />
//         <button
//           className=""
//           type="submit"
//           style={{ border: "none",background:"none" }}
//         >
//           {/* <i
//             className="bx bx-subdirectory-left"
//             style={{ fontSize: "24px", color: "gray" }}
//           ></i> */}
//           <i className="bx bx-send" style={{ fontSize: "22px", color: "gray" }}></i>
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Inputbox;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { roomsMessageSend } from "../../services/srvc-chat-realm";
import { GetLocalBusiness, GetLocalUser } from "../../services/srvc-auth-local";

const Inputbox = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [asset, setAsset] = useState();

  const router = useNavigate();

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const user = GetLocalUser();
    const team = GetLocalBusiness();
    setAsset(user ? user : team);
    if (user == null && team == null) {
      router("/auth");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      setMessages([...messages, inputValue]);
      setInputValue("");
      AddMessage();
    }
  };

  const AddMessage = async () => {
    const datx = {
      text: inputValue,
      template: "",
      mode: "text",
      media: {},
      room: props?.room?.item || null,
      sender: {
        name: asset.name,
        mail: asset.mail,
        item: asset.item,
        mobile: asset.mobile,
      },
      receiver: {
        name: "",
        mail: "",
        item: "",
        mobile: "",
      },
    };

    try {
      const result = await roomsMessageSend({ data: datx });
      // console.log("Send M", result)
      props.handleRefresh()
      if (props?.room == null) {
        
        props.newroomselect(result?.data?.room);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center mt-auto">
      <form
        className="w-100 p-3 rounded-4 d-flex justify-content-between align-items-center gap-3"
        style={{ backgroundColor: "#f5f5f5" }}
        onSubmit={handleSubmit}
      >
        <i
          className="bx bx-plus bg-white p-1 rounded-circle border cursor"
          style={{ fontSize: "22px", marginRight: "5px" }}
        ></i>

        <input
          type="text"
          name="text-input"
          id="input"
          placeholder="Send a message."
          value={inputValue}
          onChange={handleChange}
          className="border-none py-2 outline-none w-100"
          style={{ backgroundColor: "#f5f5f5", outline: "none" }}
        />
        <button
          className=""
          type="submit"
          style={{ border: "none", background: "none" }}
        >
          <i
            className="bx bx-send"
            style={{ fontSize: "22px", color: "gray" }}
          ></i>
        </button>
      </form>
    </div>
  );
};

export default Inputbox;


