import React, { useEffect, useState } from "react";
import { Carousel } from "components/common";
import { Wrapper } from "./BannerSection.styled";
import { callGetApiWithAuth } from "utils/api";
import { Spin } from "components/common";

export default function BannerSection() {
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onGetSuccessBanners = ({ data }) => {
    setIsLoading(false);
    setBanners(data)
  };

  const onGetFailedBanners = (err) => {
    setIsLoading(false);
  };

  const loadBanners = () => {
    setIsLoading(true);
    callGetApiWithAuth("home/banners", onGetSuccessBanners, onGetFailedBanners);
  };

  useEffect(() => {
    loadBanners();
  }, []);

  return (
    <Wrapper>
      <div className="carousal-banners">
        <Carousel autoplay >
          {isLoading ? 
            <div className="banner-image">
              <Spin spinning={true} />
            </div>
            :
            banners.map((el, index) => (
              <div key={index}>
                <img src={el.image_path} className="banner-image" />
              </div>
            ))
          }
        </Carousel>
      </div>
    </Wrapper>
  );
}
