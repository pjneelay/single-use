import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import presetOne from "../../../assets/presets/Manifold1.jpg";
import presetTwo from "../../../assets/presets/Manifold2.png";
import presetThree from "../../../assets/presets/Manifold3.png";
import presetFour from "../../../assets/presets/Manifold4.png";
import presetFive from "../../../assets/presets/Manifold5.jpg"; 
import presetSix from "../../../assets/presets/Manifold6.png";
import { 
  RightOutlined,
  LeftOutlined , 
} from '@ant-design/icons'; 
import "./Carousel.css";

const presets = [presetOne,presetTwo,presetThree, presetFour, presetFive, presetSix];

const Carousel = (props) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [leftIndex, setLeftIndex] = useState(presets.length - 1);
  const [rightIndex, setRightIndex] = useState(imageIndex + 1);
  const presetsIdsTwoD = [
    'b1024215-eb9a-4c47-9b4b-7a50799f7ab9',
    '0a3c2bdb-e3d2-4c43-8591-e6817da9f367',
    '89f9bbef-4a2a-40c4-b5f8-4c8361257e69',
    '4752a912-7e81-48c1-9da6-88dcf7c85dac',
    '151afdf1-4b67-402d-8b66-e35aa430b6cc',
    'b5794b79-f235-4f8b-adf6-8cd22c33ab7e'
  ]
  const presetsIdsThreeD = [
    'd44c3e8d-f766-4806-bc06-5686c4b2500b',
    '975f5214-2103-4069-a572-b47f5b3619e2',
    'dcfe9f1c-9019-4251-845d-62c6c5b93435',
    '403fccf5-ee4d-4050-869a-09d3dbc78b6a',
    'f3d01b21-54ae-4023-9e3d-2def2bdb6e0e',
    '2c795ec8-9208-4ee4-9dd4-a22f30b25489'
  ]
  const NextArrow = ({onClick}) => {
    return (
      <button className="arrow next" onClick={onClick}>
        <RightOutlined className="arrow-icon" />
      </button>
    ) 
  }

  const PrevArrow = ({onClick}) => {
    return (
      <button className="arrow prev" onClick={onClick}>
        <LeftOutlined className="arrow-icon" />
      </button>
    )
  }

  const settings = {
    infinite: true,
    lazyLoad: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 5,
    centerMode: true,
    centerPadding: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => {
      setImageIndex(next);
      setLeftIndex(next);
      setRightIndex(next);
    },
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          /*dots: true*/
        }
      },
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
     <div className="carousel-container">
       <Slider {...settings} className="slides-container">
        {presets.map((img, i) => {
            if(i === imageIndex) {
              return (
                <div key={i} className="slide-wrapp primary" assetidtwod={presetsIdsTwoD[i]} assetidthreed={presetsIdsThreeD[i]}>
                  <div className={"slide activeSlide"}>
                    <img src={img} alt={img} />
                  </div>
                </div>
              )
            } else if(i === (imageIndex + 1) || i === rightIndex) {

              return (
                <div key={i} className="slide-wrapp" assetidtwod={presetsIdsTwoD[i]} assetidthreed={presetsIdsThreeD[i]}>
                  <div className={"slide rightActiveSlide"}>
                    <img src={img} alt={img} />
                  </div>
                </div>
              )
            } else if(i === (imageIndex - 1) || i === leftIndex) {
              return (
                <div className="slide-wrapp" assetidtwod={presetsIdsTwoD[i]} assetidthreed={presetsIdsThreeD[i]}>
                  <div key={i} className={"slide leftActiveSlide"}>
                    <img src={img} alt={img} />
                  </div>
                </div>
              )
            } else {
              return (
                <div className="slide-wrapp" assetidtwod={presetsIdsTwoD[i]} assetidthreed={presetsIdsThreeD[i]}>
                  <div key={i} className={"slide"}>
                    <img src={img} alt={img} />
                  </div>
                </div>
              )
            }
          })}
      </Slider>
     </div>
  )
}

export default Carousel;