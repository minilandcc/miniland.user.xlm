// auth - firebase mail link
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./assets-investor.css";

import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

import { NumberFormat } from "../../services/srvc-utilities";

import WebbDividerMedium from "../webx/webb-divider-md";
import WebbDividerSmall from "../webx/webb-divider-sm";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-local";

import { UnitDetails } from "../../services/srvc-assets-realm";
import { TransfersFundAssetListUnits } from "../../services/srvc-transfers-funds-realm";
import { NAVSChangeList } from "../../services/srvc-navs-realm";
import NavLineChart from "../webx/dashboard-navs-chart";
import { AssetsOffersCreate } from "../../services/srvc-offers-realm";
import { TokensDetails } from "../../services/srvc-tokens-realm";
import AssetUnitOptionMobileModule from "../assets/asset-unit-options-mobile";
import AssetUnitOptionModule from "../assets/assets-unit-options";
import { OffersListUsers } from "../offers/my-offers-list";

export default function AssetUnitDetailsInvestorMobileModule() {
  const usxx = GetUserForm();
  const usrx = GetLocalUser();
  const temx = GetLocalBusiness();
  const asset = usxx === "user" ? usrx : temx;

  const navigate = useNavigate();
  const { id } = useParams();

  const [loader, setLoader] = useState(true);

  const [data, setData] = useState();
  const [users, setUsers] = useState();

  const [myShare, setMyShare] = useState();

  const [saleUnit, setSaleUnit] = useState("");
  const [saleRate, setSaleRate] = useState("");
  const [purchaseRate, setPurchaseRate] = useState("");
  const [navRate, setNavRate] = useState("");
  const [saleUserMail, setSaleUserMail] = useState("");
  const [saleUserName, setSaleUserName] = useState("");
  const [submit, setSubmit] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  console.log("isModal", isModalOpen);

  useEffect(() => {
    if (asset) {
      const fetchData = async () => {
        setLoader(true);

        const resUnit = await UnitDetails({
          data: { item: id },
          srvc: "******",
        });
        if (resUnit.stat) setData(resUnit.data);

        var resp = await NAVSChangeList({ data: { unit: id } });
        // console.log(resp)

        setLoader(false);
      };
      fetchData();
    } else {
    }
  }, [id]);

  useEffect(() => {
    setLoader(true);

    const fetchData = async () => {
      var res = await TokensDetails({
        data: {
          unit: id,
          user: asset.item,
        },
      });
      console.log("Res---td", res?.data?.rate?.nmbr);
      setPurchaseRate(res?.data?.rate?.nmbr);
      setLoader(false);
    };

    fetchData();
  }, []);

  const getNavRate = (props) => {
    setNavRate(props.nmbr);
  };

  useEffect(() => {
    if (asset) {
      const fetchData = async () => {
        setLoader(true);

        const result = await TransfersFundAssetListUnits({
          data: { item: id },
          srvc: "******",
        });
        //console.log(result)
        if (result.stat) {
          setUsers(result.data.list);
          setMyShare(
            result.data.list.find((entry) => entry.user.item == asset.item)
          );
        }
        // console.log (result)

        setLoader(false);
      };
      fetchData();
    } else {
    }
  }, [id]);

  useEffect(() => {
    setSaleUnit(parseFloat(myShare?.sale?.number) / 1000000);
  }, [myShare]);

  // console.log("My share ----------",myShare)

  const handleOfferSubmit = async () => {
    setSubmit(true);

    var datx = {
      cred: { name: saleUserName, mail: saleUserMail, item: "" },
      debt: { name: asset.name, mail: asset.mail, item: asset.item },
      asset: { item: "" },
      unit: { item: id },
      rate: {
        number: (parseFloat(saleRate) * 1000000).toString(),
        ticker: "INR",
      },
      size: { number: saleUnit.toString(), ticker: "BRX" },
    };
    // console.log(datx)
    var res = await AssetsOffersCreate({ data: datx });
    console.log(res);
    if (res.stat) window.location.reload(true);
  };

  // console.log("D---------",data)
  // console.log(myShare);

  if (loader) return <>Please Wait...</>;

  return (
    <>
      {/* info */}
      <div className="">
        <p className="text-normal m-0"></p>
      </div>

      {/* asset */}
      <div className="rounded-xd back-color-wite border">
        <div className="d-flex p-2">
          <div className="ms-2">
            <p className="text-normal text-bold m-0 text-sm">
              {data?.meta?.name || "******"}
            </p>
            <p className="text-color-next m-0">
              ID: {data?.webx?.number || "******"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
