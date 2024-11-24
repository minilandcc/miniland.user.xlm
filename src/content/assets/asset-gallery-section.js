import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AssetsMediaLists } from "../../services/srvc-assets-media-realm";

export default function AssetGallerySection() {
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [currentItems, setCurrentItems] = useState([]);
  const sliderRef = useRef();
  const [refresh,setRefresh]=useState(true)

  useEffect(() => {
    setLoader(true);

    const fetchData = async () => {
      try {
        const res = await AssetsMediaLists({
          data: {
            asset: id,
            format: "image",
          },
        });
        setCurrentItems(res?.data.list);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoader(false);
      }
    };

    fetchData();
  }, [id, refresh]);


  // const deleteMedia = async (item) => {
  
  //     const res = await AssetMediaDelete({
  //       data: {
  //         item: item,
  //         format: "image",
  //       },
  //     });
  //     if (res){
  //       setRefresh(!refresh)
  //       alert(res.memo)
  //     }
     
  // };

  
  // const handleDelete = (itemId) => {
  //   // Logic to delete the item goes here
  //   deleteMedia(itemId)  };

  if (loader) {
    return <p>Please wait ....</p>;
  }
  if (!loader && currentItems.length === 0) {
    return <p className="border rounded p-4">No Images or Videos found..</p>;
  }
  if (currentItems.length === 1) {
    const currentItem = currentItems[0];
    if (currentItem.mime === "video/mp4") {
      return (
        <div className="border p-4 ">
          <p className="fw-bold">Gallery</p>
          <hr />
          <div style={{ position: "relative" }}>
            <video
              controls
              className="border video-fluid"
              style={{
                width: "100%",
                height: "300px",
                borderTopLeftRadius: "0.375rem",
                borderTopRightRadius: "0.375rem",
                objectFit: "cover",
              }}
            >
              <source src={currentItem.link} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* <button
              className="btn btn-outline-danger btn-sm"
              style={{ position: "absolute", top: "2px", right: "2px" }}
              onClick={() => handleDelete(currentItem.item)}
            >
              Delete
            </button> */}
          </div>
        </div>
      );
    } else {
      return (
        <div className="border p-4 ">
          <p className="fw-bold">Gallery</p>
          <hr />
          <div style={{ position: "relative" }}>
            <img
              src={currentItem.link}
              className="border img-fluid"
              style={{
                width: "100%",
                height: "300px",
                borderTopLeftRadius: "0.375rem",
                borderTopRightRadius: "0.375rem",
                objectFit: "cover",
              }}
              alt={`Image of assets`}
            />
            {/* <button
              className="btn btn-outline-danger btn-sm"
              style={{ position: "absolute", top: "2px", right: "2px" }}
              onClick={() => handleDelete(currentItem.item)}
            >
              Delete
            </button> */}
          </div>
        </div>
      );
    }
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const goToPrev = () => {
    sliderRef.current.slickPrev();
  };

  const goToNext = () => {
    sliderRef.current.slickNext();
  };

  return (
    <div className="">
      {/* <p className="fw-bold">Gallery</p> */}
      {/* <hr /> */}
      <div className="position-relative">
        <Slider ref={sliderRef} {...settings}>
          {currentItems.map((item, index) => (
            <div key={index}>
              {item.mime === "video/mp4" ? (
                <div style={{ position: "relative" }}>
                  <video
                    controls
                    className="video-fluid rounde-xd"
                    style={{
                      width: "100%",
                      height: "300px",
                      // borderTopLeftRadius: "0.375rem",
                      // borderTopRightRadius: "0.375rem",
                      objectFit: "cover",
                    }}
                  >
                    <source src={item.link} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <div style={{ position: "relative" }}>
                  <img
                    src={item.link}
                    className="img-fluid rounded-xd"
                    style={{
                      width: "100%",
                      height: "280px",
                      // borderTopLeftRadius: "0.375rem",
                      // borderTopRightRadius: "0.375rem",
                      objectFit: "cover",
                    }}
                    alt={`Image of assets`}
                  />
                </div>
              )}
            </div>
          ))}
        </Slider>
        <div
          className="d-flex justify-content-between mt-3 "
          style={{ position: "absolute", top: "38%", width: "100%" }}
        >
          <div
            // className="border rounded"
            style={{
              // backgroundColor: "white",
              opacity: "0.6",
              marginLeft: "10px",
            }}
            onClick={goToPrev}
          >
            {/* <i
              className="bx bxs-chevron-left bx-md"
              onClick={goToPrev}
              style={{ cursor: "pointer", color: "blue" }}
            ></i> */}
          </div>
          <div
            // className="border rounded"
            style={{
              // backgroundColor: "white",
              opacity: "0.6",
              marginRight: "10px",
            }}
            onClick={goToNext}
          >
            {/* <i
              className="bx bxs-chevron-right bx-md "
              onClick={goToNext}
              style={{ cursor: "pointer", color: "blue" }}
            ></i> */}
          </div>
        </div>
      </div>
    </div>
  );
}
