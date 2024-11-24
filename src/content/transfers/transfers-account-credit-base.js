// transfers
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NumberFormat } from "../../services/srvc-utilities";
import axios from "axios";

import WebbDividerSmall from "../webx/webb-divider-sm";
import WebbDividerMedium from "../webx/webb-divider-md";
import WebbLoaderMedium from "../webx/webb-loader-md";
import WebbLoaderSmall from "../webx/webb-loader-sm";
import WebbModuleInfo from "../webx/webb-module-info";
import FormNeeded from "../webx/form-needed";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-local";

import { AccountsList } from "../../services/srvc-accounts-realm";
import { TransfersAccountCredit } from "../../services/srvc-transfers-realm";
import { TransfersFundsStatus } from "../../services/srvc-transfers-funds-realm";

export default function TransfersBaseAccountCreditModule() {
  const usxx = GetUserForm();
  const usrx = GetLocalUser();
  const temx = GetLocalBusiness();
  const asset = usxx === "user" ? usrx : temx;

  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [done, setDone] = useState(false);

  const [form, setForm] = useState(false);
  const [memo, setMemo] = useState("");

  const [balance, setBalance] = useState({ number: 0, ticker: "******" });
  const [accounts, setAccounts] = useState([]);
  const [data, setData] = useState({
    amount: "",
  });

  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState();

  const [waiting, setWaiting] = useState(false);
  const [trxnid, setTrxnId] = useState("");
  const [response, setResponse] = useState(false);
  const [details, setDetails] = useState(null);
  const [intervalid, setIntervalId] = useState("");

  useEffect(() => {
    if (asset) {
      const fetchData = async () => {
        setLoader(true);

        const result = await AccountsList({ data: { user: asset.item } });
        // console.log (result.data.list)
        var ac = result.data.list.find((x) => x.meta.sort === "base");
        //console.log(ac)
        if (ac == undefined) {
          setAccounts([]);
          setBalance(0);
        } else {
          setAccounts(ac);
          setBalance(
            result.data.list.find((x) => x.meta.sort === "base").balance.amount
          );
        }

        setLoader(false);
      };
      fetchData();
    } else {
    }
  }, []);

  useEffect(() => {
    setForm(false);
    if (accounts.length > 0) {
      setBalance(accounts.find((x) => x.meta.sort === "base").balance.amount);
    }
  }, [accounts]);

  useEffect(()=>{
    if(done)
      clearInterval(intervalid)

  },[done])

  //  console.log(accounts)

  // useEffect for form validation
  useEffect(() => {
    setForm(false);
    if (data.amount > 0) setForm(true);
  }, [data]);

  const handleSubmit = async () => {
    // setLoader(true);
    setSubmit(true);
    setWaiting(true);
    setResponse(false);

    const result = await TransfersAccountCredit({
      data: {
        credit: { name: asset.name, mail: asset.mail, item: asset.item }, // user: asset.mail,
        debit: { name: asset.name, mail: asset.mail, item: "" }, // user: asset.mail,
        sale: { number: data.amount, ticker: "INR" },
        meta: { name: "account credit", memo: "account credit" },
      },
    });
    console.log(result);

    if (result.data) {
      handleRazorPayPaymentGateway(result.data.item);
      var id = setInterval( async() => {
        // Call the function with the argument
        var res = await PullTransactionStatus(result.data.item);
       
      }, 5000);
      setIntervalId(id);
    } else {
      setDone(false);
      setMemo("Transfer Failed.");
    }

    setLoader(false);
  };

  //console.log(balance)

  const handleChange = async (key, val) => {
    setData({ ...data, [key]: val });
  };

  const handleRazorPayPaymentGateway = async (trxn) => {
    // console.log(rates.find(x=>x.status)?.rate?.number)
    setTrxnId(trxn);

    const orderCreate = await axios.post(
      "https://ap-south-1.aws.data.mongodb-api.com/app/miniland-transfers-razorpay-uqywipa/endpoint/order/create",
      {
        data: { amount: data.amount },
      }
    );
    //console.log(orderCreate)
    const dataSave = await axios.post(
      "https://ap-south-1.aws.data.mongodb-api.com/app/miniland-transfers-razorpay-uqywipa/endpoint/order/save",
      {
        data: { ...orderCreate.data._rejectionHandler0, stat: 0, trxn: trxn },
      }
    );

    const orderTx = orderCreate.data._rejectionHandler0;
    setOrder(orderTx);
    setOrderId(orderTx.id);
    const options = {
      key: process.env.REACT_APP_RAZOR_PAY_SNBX_KEY, // process.env.RAZORPAY_APP_KEY
      amount: orderTx.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: asset.name,
      description: `account credit`,
      image: "https://97443b3c36574e04843cadde609c43ae.s3.ap-south-1.amazonaws.com/97443b3c36574e04843cadde609c43ae/logo192.png",
      order_id: orderTx.id,
      handler: (res) => {
        // console.log(res)
        paymentVerificationSave(res);
        return res;
      },
      prefill: {
        name: asset.name,
        email: asset.mail,
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#121212",
      },
    };
    //console.log(options)
    const razor = new window.Razorpay(options);
    razor.open();
  };

  const paymentVerificationSave = async (value) => {
    const res = await axios.post(
      "https://ap-south-1.aws.data.mongodb-api.com/app/miniland-transfers-razorpay-uqywipa/endpoint/payment/verify",
      { data: value }
    );
    if (res.data.stat) {
    }
  };

  const PullTransactionStatus = async (trxn) => {
    // console.log("hit")
    const datx = { item: trxn };
    // console.log(datx)
    if(!done){
    const result = await TransfersFundsStatus({ data: datx });

    console.log(result);
    if (result.stat) {
      if (result.data.stat == 6) {
        setResponse(true);
        setDetails(result.data);
        clearInterval(intervalid);
        setDone(true);
        setMemo("Transfer Success.");
        return true
      }
      if (result.data.stat != 6 && result.data.stat != 1) {
        setResponse(true);
        setDetails(result.data);
        clearInterval(intervalid);
        setDone(true);
        setMemo("Transfer Success.");
      }
    }
    }
  };

 // console.log(intervalid)

  if (loader)
    return (
      <>
        <WebbLoaderMedium />
      </>
    );
  if (!loader && accounts.length == 0)
    return (
      <>
        <div className="text-center">
          No Linked Accounts. <br></br>Please Create / Link via Dashboard
        </div>
      </>
    );

  return (
    <>
      <div className="back-color-wite rounded-wd p-3 border">
        <div className="d-flex">
          <div className="">
            <p className="text-small text-color-tone m-0">
              Account Balance (Base)
            </p>
            <p className="text-lead m-0">
              {NumberFormat(balance / 1000000, "w", "2")}
            </p>
            {/* <p className="text-lead m-0">{parseFloat(balance/1000000)}</p> */}
          </div>
          <div className=""></div>
        </div>

        <WebbDividerMedium />

        <div className="">
          <div>
            <label className="small mb-2">Amount (INR)</label>
            <input
              value={data.amount}
              onChange={(e) => setData({ amount: e.target.value })}
              className="form-control"
              placeholder="5000"
            />
            <button
              onClick={() => handleSubmit()}
              disabled={data.amount == "" ? true : false}
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              className="btn btn-success mt-5 w-100"
            >
              Submit{" "}
            </button>
          </div>
        </div>
      </div>

      <WebbDividerMedium />
      <div className={!loader && submit && done ? "" : "d-none"}>
        <p>{memo}</p>

        <p
          onClick={() => navigate("/user/transfers")}
          className="cursor text-color-blue"
        >
          View Transaction
        </p>
      </div>

      <div
        className="modal fade rounded-xd w-100"
        id="staticBackdrop"
        tabindex="1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-hidden="true"
      >
        <div className="modal-dialog rounded-xd">
          <div className="modal-content w-100">
            <div className="modal-header border-none align-middle">
              <p className="text-lead m-0" id="exampleModalLabel">
                Miniland Account Credit
              </p>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className={waiting == true && !response ? "" : "d-none"}>
                <div className="text-center">
                  <img
                    src="https://i.gifer.com/origin/a1/a1d81f564eeb1468aefbcfd54d1571b8_w200.gif"
                    style={{ width: "150px", height: "150px" }}
                  />
                  <p className="text-secondary text-small p-2 m-0">
                    Waiting For Payment Response
                  </p>
                  <p className="text-secondary text-small ">
                    Do Not Close Window{" "}
                  </p>
                </div>
              </div>

              <div className={waiting == true && response ? "" : "d-none"}>
                <div
                  className={details?.stat == "6" ? "text-center" : "d-none"}
                >
                  <img
                    src="https://www.architecturaldigest.in/wp-content/themes/cntraveller/images/check-circle.gif"
                    style={{ width: "150px", height: "150px" }}
                  />
                  <p className="text-secondary text-small p-2 m-0">
                    Transaction Successfull
                  </p>
                  <p className="text-secondary text-small ">{trxnid}</p>
                </div>

                <div
                  className={details?.stat != "6" ? "text-center" : "d-none"}
                >
                  <img
                    src="https://miro.medium.com/v2/resize:fit:810/1*OkeqV425CNZUQT2HSkTnJA.png"
                    style={{ width: "300px", height: "300px" }}
                  />
                  <p className="text-secondary text-small p-2 m-0">
                    Transaction Failed
                  </p>
                  <p className="text-secondary text-small ">{trxnid}</p>
                </div>
              </div>
            </div>

            <div className="modal-footer border-none d-flex text-color-tone text-small">
              <div className="">Payment Processed via Via Razorpay</div>
              <div className="ms-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
