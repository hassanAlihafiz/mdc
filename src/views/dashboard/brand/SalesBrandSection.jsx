import React, { useEffect, useState } from "react";
import { Spin, Empty } from "components/common";
import { ReactComponent as DarkRightIcon } from "assets/icons/dark-right.svg";
import NoImage from 'assets/images/no_image.png';
import Slider from "react-slick";
import { Wrapper } from "./SalesBrandSection.styled";
import { callGetApiWithAuth } from "utils/api";
import { asPrice } from "utils/text";

export default function SalesBrandSection() {
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <DarkRightIcon
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <DarkRightIcon
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 675,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };

  const [brandsSales, setBrandsSales] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onGetSuccessBrandsSales = ({ data }) => {
    setIsLoading(false);
    setBrandsSales(data);
  };

  const onGetFailedBrandsSales = (err) => {
    setIsLoading(false);
  };

  const loadBrandsSales = () => {
    setIsLoading(true);
    callGetApiWithAuth("dashboard/brand_sales", onGetSuccessBrandsSales, onGetFailedBrandsSales);
  };

  useEffect(() => {
    loadBrandsSales();
  }, []);

  return (
    <Wrapper>
      <div className="slider-title-container">
        <div className="slider-title">Team Sales By Brand</div>
        <div className="slider-arrows"></div>
      </div>
      <div className="divider" />
      <div className="slider-box">
          {isLoading ?
            <Spin spinning={true} />
            :
            <>
              {brandsSales.length > 0 ?
                <Slider {...settings}>
                  {brandsSales.map((el, index) => (
                    <div key={index}>
                      <div className="brand-container">
                        <img src={el.image_path ? el.image_path : NoImage} />
                        <div className="brand-title">{el.title}</div>
                        <div className="brand-price">{asPrice(el.sales)}</div>
                      </div>
                    </div>
                  ))}
                </Slider>
                :
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              }
            </>
          }
      </div>
    </Wrapper>
  );
}
