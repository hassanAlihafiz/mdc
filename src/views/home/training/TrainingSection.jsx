import React, { useEffect, useState } from "react";
import VideoModal from "components/common/modals/VideoModal";
import { ReactComponent as DarkRightIcon } from "assets/icons/dark-right.svg";
import { ReactComponent as PlayIcon } from "assets/icons/play.svg";
import { DownloadOutlined, PlayCircleOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import { Wrapper } from "./TrainingSection.styled";
import { callGetApiWithAuth } from "utils/api";
import TrainingSectionSkeleton from "./TrainingSection.skeleton";

export default function TrainingSection() {
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

  const [trainingData, setTrainingData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(undefined);

  const handleCloseVideoModal = () => {
    setSelectedVideo(undefined);
  };

  const onGetSuccessTrainingData = ({ data }) => {
    setIsLoading(false);
    setTrainingData(data.data);
  };

  const onGetFailedTrainingData = (err) => {
    setIsLoading(false);
  };

  const loadTrainingData = () => {
    setIsLoading(true);
    callGetApiWithAuth("training_video/list", onGetSuccessTrainingData, onGetFailedTrainingData);
  };

  useEffect(() => {
    loadTrainingData();
  }, []);

  return (
    <Wrapper>
      <div className="slider-title-container">
        <div className="slider-title">Training</div>
        <div className="slider-arrows"></div>
      </div>
      {(isLoading || !trainingData) ?
        <TrainingSectionSkeleton isLoading={isLoading} />
        :
        <div className="slider-box">
          <Slider {...settings}>
            {trainingData.map((el, index) => (
              <div key={index}>
                <div className="training-cards-container">
                  <div
                    className="training-background"
                    style={{ backgroundImage: `url(${el.thumbnail})` }}
                  >
                  </div>
                  {el.file_type*1 === 4 ?
                    <>
                      <div className="training-title"><a onClick={() => setSelectedVideo(el.file)}><PlayCircleOutlined />{el.title}</a></div>
                      <div className="training-content"><a onClick={() => setSelectedVideo(el.file)}>{el.description}</a></div>
                    </>
                    :
                    <>
                      <div className="training-title"><a href={el.file} target="_blank"><DownloadOutlined />{el.title}</a></div>
                      <div className="training-content"><a href={el.file} target="_blank">{el.description}</a></div>
                    </>
                  }
                </div>
              </div>
            ))}
          </Slider>
        </div>
      }
      {selectedVideo &&
        <VideoModal
          width={1200}
          src={selectedVideo}
          onCancel={handleCloseVideoModal}
        />
      }
    </Wrapper>
  );
}
