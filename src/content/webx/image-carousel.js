import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageCarousel = ({ images }) => {

  const [selectedImage, setSelectedImage] = useState()
 


  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2.4,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
      
        }
      },

      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
 
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  const ImagePreview=()=>{

  }

  return (
    <div className='' style={{maxWidth:'850px'}}>
    <div className=''>
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className=''>
              <img className='mx-2 image-fluid ' onClick={()=>setSelectedImage(image.link)} data-bs-toggle="modal" data-bs-target="#exampleModal"  style={{width:'350px', height:'260px', cursor:'pointer' }} src={image.link} alt={`Image ${index + 1}`} />
            </div>
          ))}
        </Slider>
        </div>

        <div  className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog  modal-lg modal-md modal-sm" >
            <div className="modal-content">
              <div className="">
                {/* <h1 className="modal-title fs-5" id="exampleModalLabel">Image Preview</h1> */}
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body" >
                  <img className='image-fluid' style={{width:'100%', height:'100%'}}  src={selectedImage} />
              </div>
              <div className="modal-footer">
                {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                {/* <button type="button" className="btn btn-primary">Save changes</button> */}
              </div>
            </div>
          </div>
        </div>

   </div> 
  );
};

export default ImageCarousel;
