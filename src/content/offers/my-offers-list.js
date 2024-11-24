import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "./offers.css";
import { EsignPendingDocuments } from "../../services/srvc-contracts";
import { GetUserForm, NumberFormat } from "../../services/srvc-utilities";
import { GetLocalBusiness, GetLocalUser } from "../../services/srvc-auth-local";
import {
  AssetOfferEdit,
  AssetsOffersList,
  AssetsOffersListResale,
  AssetsUsersOfferCancel,
  AssetsUsersOffersList,
  AssetUserOfferEdit,
} from "../../services/srvc-offers-realm";
import { useNavigate } from "react-router-dom";
import { TransfersAssetSubmit } from "../../services/srvc-transfers-assets-realm";

export const OffersListUsers = ({ saleUnit }) => {
  const { id } = useParams();
  const usxx = GetUserForm();
  const usrx = GetLocalUser();
  const temx = GetLocalBusiness();
  const asset = usxx === "user" ? usrx : temx;

  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [offerId, setOfferId] = useState("");
  const [unitRate, setUnitRate] = useState(null);
  const [unitSaleCount, setUnitSaleCount] = useState(null);
  const [unitWarning, setUnitWarning] = useState("");

  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();

  const filteredOffer = data.find((offer) => offer.item === offerId);

  console.log("Filtered", filteredOffer);

  useEffect(() => {
    if (filteredOffer) {
      setUnitRate(parseInt(filteredOffer.rate.nmbr) / 1000000);
      console.log(filteredOffer, "-------------fo-----");
      setUnitSaleCount(parseInt(filteredOffer.sale.nmbr));
    }
  }, [offerId]);
  console.log("Unit Rate 47", unitRate, unitSaleCount);

  useEffect(() => {
    setLoader(true);
    const fetchdata = async () => {
      var res = await AssetsUsersOffersList({ data: { user: asset.item, unit:id } });
      console.log("My-offers", res);
      if (res.stat) setData(res.data.list);
      setLoader(false);
      //    var filtered =  res.data.find(docx => docx.mmbr.item == asset.item && docx.mmbr.stat== 1)
      //    console.log(filtered)
    };

    fetchdata();
  }, [refresh]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const cancelOffer = () => {
    const fetchdata = async () => {
      var res = await AssetsUsersOfferCancel({ data: { item: offerId } });
      console.log("My-offers-cancel", res);
      if (res.stat) {
        setRefresh(!refresh);
        closeModal();
      }
    };
    fetchdata();
  };

  const editOffer = () => {
    const fetchdata = async () => {
      var res = await AssetUserOfferEdit({
        data: { item: offerId, rate: unitRate, sale: unitSaleCount },
      });
      console.log("My-offers-Edit", res);
      if (res.stat) {
        setRefresh(!refresh);
        closeModal();
      }
    };
    fetchdata();
  };


  const SubmitAssetTransfer = async(item)=>{
    setLoader(true)
    var res = await TransfersAssetSubmit({data:{item: item.item}})
    console.log(res.data)
    if(res.stat){ setRefresh(!refresh)}
    setLoader(false)

  }

  if (loader)
    return (
      <>
        <div
          className="p-3 back-color-wite rounded-xd border align-middle"
          style={{}}
        >
          <span className="align-middle text-lead">
            <i className="bx bxs-info-circle text-color-wait"></i>
          </span>
          <span className="ms-1 text-color-tone">Please Wait...</span>
        </div>
      </>
    );
  if (!loader && (!data || data.length === 0))
    return (
      <>
        <div
          className="p-3 back-color-wite rounded-xd border align-middle"
          style={{}}
        >
          <span className="align-middle text-lead">
            <i className="bx bxs-info-circle text-color-success"></i>
          </span>
          <span className="ms-1 text-color-tone">No Pending Offers</span>
        </div>
      </>
    );

  return (
    <>
      <div className="mt-2 bg-white rounded-xd">
        {data &&
          data.map((item, i) => {
            return (
              <div
                className={`border rounded-xd p-3 d-flex align-items-center ${
                  data.length - 1 == i ? "" : "mb-3"
                }`}
              >
                <div className="me-auto">
                  <p className="fw-bold text-small m-0">User <span className=" text-primary fw-normal text-small mx-3"> {item?.cred?.name} </span></p>
                  {/* <p className="m-0">{item?.cred?.mail}</p> */}
                  <p className="fw-bold text-small m-0 ">Rate 
                   <span className="toUpperCase mx-3 text-primary fw-normal text-small mx-3"> {NumberFormat(item?.rate?.nmbr / 1000000 || 0, "w", 2)}{" "}
                    {item?.rate?.tick}/SQFT</span>
                  </p>
                  <p className="fw-bold text-small m-0">Status <span className={ item?.feat?.claim ? 'text-success mx-2  fw-normal text-small': 'text-warning mx-2 text-primary fw-normal text-small'}>{item?.feat?.claim ? 'Claimed': 'Pending'}</span></p>
                  
                </div>
                <div className="text-end">
                  {" "}
                  <div
                    // onClick={() => navigate(`/user/resale/offer/${item.item}`)}
                    onClick={() => {
                      openModal();
                      setOfferId(item.item);
                    }}
                    className={ !item?.feat?.claim ? "p-0 text-primary text-decoration-none cursor" :'d-none'}
                  >
                    Edit
                  </div>{" "}
                  <div className={item?.feat?.claim ? '':'d-none'}> 
                    <button onClick={()=> SubmitAssetTransfer(item)} className="btn rounded-xx btn-outline-success btn-sm text-small">Tranfer Units</button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-dialog modal-dialog-scrollable mt-0 pt-0 rounded-xd w-100">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h1 className="modal-title fs-5">Edit Offer</h1>
                <button
                  type="button"
                  className="btn-close cursor z-2"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body mt-3">
                <div className="">
                  <label className="text-small mb-1 mt-3">Client Name</label>
                  <input
                    disabled
                    value={filteredOffer?.cred?.name}
                    // onChange={(e) => setSaleUserName(e.target.value)}
                    className="form-control"
                  />
                  <label className="text-small mb-1 mt-3">Client Email</label>
                  <input
                    disabled
                    value={filteredOffer?.cred?.mail}
                    // onChange={(e) => setSaleUserMail(e.target.value)}
                    className="form-control"
                  />
                  <label className="text-small mb-1 mt-3">Unit For Sale</label>
                  <input
                    value={unitSaleCount}
                    disabled
                    // onChange={(e) => setUnitSaleCount(e.target.value)}
                    className="form-control"
                    onChange={(e) => {
                      if (e.target.value <= saleUnit) {
                        setUnitSaleCount(e.target.value);
                        setUnitWarning(``);
                      } else {
                        setUnitSaleCount(saleUnit);
                        setUnitWarning(`Max unit : ${saleUnit}`);
                      }
                    }}
                  />
                  {unitWarning !== "" ? (
                    <p className="text-mini text-danger m-0 mx-2">
                      {unitWarning}
                    </p>
                  ) : (
                    ""
                  )}
                  <label className="text-small mb-1 mt-3">
                    Unit Rate @Sqft
                  </label>
                  <input
                    value={unitRate}
                    onChange={(e) => setUnitRate(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="d-flex mt-3">
                <div className="me-auto">
                  <button
                    type="button"
                    className="btn btn-light text-small rounded-xx bg-body-tertiary"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Do you really want to delete this offer?"
                        )
                      ) {
                        cancelOffer();
                      }
                    }}
                  >
                    Cancel Offer
                  </button>
                </div>
                <div className="text-end">
                  <button
                    // disabled={
                    //   submit ||
                    //   saleRate == "" ||
                    //   saleRate < 1 ||
                    //   saleUnit == "" ||
                    //   saleUnit < 1 ||
                    //   saleUserMail == ""
                    // }
                    onClick={editOffer}
                    type="button"
                    className="btn btn-outline-primary text-small rounded-xx"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
