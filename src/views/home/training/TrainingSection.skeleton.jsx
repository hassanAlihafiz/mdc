import React from "react";
import { Spin } from "components/common";
import { ReactComponent as DarkRightIcon } from "assets/icons/dark-right.svg";
import { ReactComponent as PlayIcon } from "assets/icons/play.svg";
import Slider from "react-slick";

export default function TrainingSectionSkeleton(props) {
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
    slidesToShow: 2,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };

  return (
      <div className="slider-box skeleton-section">
        <Slider {...settings}>
          <div>
            <div className="training-cards-container">
              <div
                className="training-background"
              >
                <PlayIcon />
              </div>
              <div className="training-title">------ ---- --------</div>
              <div className="training-content">
                ---- --- - ------ ---- ------ -- -- ------ --- --- ----- ----- -- ------------ ------ ---- -------
              </div>
            </div>
          </div>
          <div>
            <div className="training-cards-container">
              <div
                className="training-background"
              >
                <PlayIcon />
              </div>
              <div className="training-title">------ ---- --------</div>
              <div className="training-content">
                ---- --- - ------ ---- ------ -- -- ------ --- --- ----- ----- -- ------------ ------ ---- -------
              </div>
            </div>
          </div>
          <div>
            <div className="training-cards-container">
              <div
                className="training-background"
              >
                <PlayIcon />
              </div>
              <div className="training-title">------ ---- --------</div>
              <div className="training-content">
                ---- --- - ------ ---- ------ -- -- ------ --- --- ----- ----- -- ------------ ------ ---- -------
              </div>
            </div>
          </div>
        </Slider>
        {props.isLoading &&
          <div className="loading-spin-container">
            <Spin spinning={true} />
          </div>
        }
      </div>
  );
}
