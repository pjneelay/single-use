import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import slideOne from "../../../assets/1.png";
import slideTwo from "../../../assets/2.jpeg";
import slideThree from "../../../assets/3.jpg";
import slideFour from "../../../assets/4.jpg";
import slideFive from "../../../assets/5.jpg"; 
import slideSix from "../../../assets/6.jpg";
import { 
  RightOutlined,
  LeftOutlined , 
} from '@ant-design/icons'; 

const images = [slideOne, slideTwo, slideThree, slideFour, slideFive, slideSix];

const Carousel = (props) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [leftIndex, setLeftIndex] = useState(images.length - 1);
  const [rightIndex, setRightIndex] = useState(imageIndex + 1);
  const playerTwoDIds = [
    'b1024215-eb9a-4c47-9b4b-7a50799f7ab9',
    '3c5111b5-46b3-42ea-ba7f-b2884b54f0be',
    '53444ea4-a0d6-4a23-a6cc-436b0d28d523',
    '5fcc8fff-d1aa-426d-b298-fc6f85778be1',
    '2cd6bcd4-6a71-4da8-81b0-d0370ef1fc99',
    '1a757cca-6162-4197-99bb-2ef833c3bb8e',
    '6563829b-925e-47b7-8afb-9edd5df8c09b',
    'd520b0a1-f004-4877-9e6c-fdde57533580',
    '3d5fe4c0-836a-4430-8ed9-b5f94ec18eee'
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
        {images.map((img, i) => {
            if(i === imageIndex) {
              return (
                <div className="slide-wrapp primary">
                  <div key={i} className={"slide activeSlide"} assetId={playerTwoDIds[i]}>
                    <img src={img} alt={img} />
                  </div>
                </div>
              )
            } else if(i === (imageIndex + 1) || i === rightIndex) {
              return (
                <div className="slide-wrapp">
                  <div key={i} className={"slide rightActiveSlide"} assetId={playerTwoDIds[i]}>
                    <img src={img} alt={img} />
                  </div>
                </div>
              )
            } else if(i === (imageIndex - 1) || i === leftIndex) {
              return (
                <div className="slide-wrapp">
                  <div key={i} className={"slide leftActiveSlide"}>
                    <img src={img} alt={img} />
                  </div>
                </div>
              )
            } else {
              return (
                <div className="slide-wrapp">
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