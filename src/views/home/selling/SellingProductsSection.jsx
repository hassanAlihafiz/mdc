import React, { useEffect, useState } from "react";
import { Row, Col, Button, Spin } from "components/common";
import { ReactComponent as DarkRightIcon } from "assets/icons/dark-right.svg";
import NoImage from "assets/images/no_image.png";
import Slider from "react-slick";
import { Wrapper } from "./SellingProductsSection.styled";
import { callGetApiWithAuth } from "utils/api";
import { asPrice } from "utils/text";

export default function SellingProductsSection() {
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
    slidesToShow: 4,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1530,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };

  const [bestProducts, setBestProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoProductDetailPage = (path) => {
    window.open(`${process.env.REACT_APP_CORP_URL}/shop/${path}`, '_blank')
  };

  const onGetSuccessBestProducts = ({ data }) => {
    setIsLoading(false);
    setBestProducts(data);
  };

  const onGetFailedBestProducts = (err) => {
    setIsLoading(false);
  };

  const loadBestProducts = () => {
    setIsLoading(true);
    callGetApiWithAuth("common/best_products", onGetSuccessBestProducts, onGetFailedBestProducts);
  };

  useEffect(() => {
    loadBestProducts();
  }, []);

  return (
    <Wrapper>
      <div className="slider-title-container">
        <div className="slider-title">Best Selling Products</div>
        <div className="slider-arrows"></div>
      </div>
      <div className="slider-box">
        <Slider {...settings}>
          {bestProducts.map((el, index) => (
            <div key={index}>
              <div className="product-container">
                <a href={`${process.env.REACT_APP_CORP_URL}/shop/${el.path}`} target="_blank">
                  <img src={el.image_path ? el.image_path : NoImage} />
                  <div className="product-title">{el.title}</div>
                </a>
                <div className="product-price">
                  Price: <span>{asPrice(el.member_price)}</span>
                </div>
                <Row gutter={[15, 15]} className="price-buttons-row">
                  <Col span={24}>
                    <Button className="cart-button" onClick={() => handleGoProductDetailPage(el.path)}>Learn More</Button>
                  </Col>
                </Row>
              </div>
            </div>
          ))}
        </Slider>
        {isLoading &&
          <div className="loading-spin-container">
            <Spin spinning={true} />
          </div>
        }
      </div>
    </Wrapper>
  );
}
