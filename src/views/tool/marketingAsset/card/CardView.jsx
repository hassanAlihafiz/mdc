import React, { useState } from "react";
import { Button, Modal, VideoModal } from "components/common";
import { ReactComponent as PlayIcon } from "assets/icons/play.svg";
import styled from "styled-components";

export default function CardView({ data }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleWatchVideo = () => {
    setIsPlaying(true);
  };

  const handleDownload = () => {
    setIsPlaying(false);
    window.open(data.file, "_blank");
  };

  return (
    <Wrapper>
      <div className="training-cards-container">
        <div>
          <div
            className="training-background"
          >
            <img src={data.thumbnail} 
              alt={'Market Asset Video'}
            />
            {data.file_type*1 === 4 &&
              <PlayIcon onClick={()=>setIsPlaying(true)} />
            }
          </div>
          <div className="training-title">
            {data.title}
          </div>
          <div className="training-content">
            {data.description}
          </div>
        </div>
        <div className="watch-now-container">
          <Button onClick={data.file_type*1 === 4 ? handleWatchVideo : handleDownload }>
            {data.file_type*1 === 4 ? "Watch Now" : "Download"}
          </Button>
        </div>
      </div>
      {(data.file_type*1 === 4 && isPlaying) && 
        <VideoModal onCancel={()=>setIsPlaying(false)} 
          src={data.file}
          width={1200}
        />
      }
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  height: 100%;
  .training-cards-container {
    background: white;
    height: 100%;
    padding: 15px;
    height: 100%;
    display: flex;
    box-shadow: 0px 4px 20px rgb(44 39 56 / 6%);
    flex-direction: column;
    justify-content: space-between;
    .watch-now-container {
      button {
        width: 100%;
        margin-top: 20px;
      }
    }
    .training-background {
      height: 202px;
      position: relative;
      svg {
        opacity: 0.5;
        position: absolute;
        left: calc(50% - 27px);
        top: calc(50% - 27px);
        cursor: pointer;
        &: hover {
          opacity: 0.8;
        }
      }
      img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .training-title {
      font-weight: 600;
      font-size: 18px;
      margin: 10px 0px 13px;
      overflow: hidden;
      white-space: nowrap !important;
      text-overflow: ellipsis;
    }
    .training-content {
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
      color: #7f8fa3;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 6;
      overflow: hidden;
    }
  }
`;
