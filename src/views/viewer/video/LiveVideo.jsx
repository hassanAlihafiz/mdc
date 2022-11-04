import React from "react";
import { ReactComponent as VolumeIcon } from "assets/icons/volume-high.svg";
import { ReactComponent as UserIcon } from "assets/icons/3-User.svg";
import { ReactComponent as RecordIcon } from "assets/icons/record.svg";
import VideoPoster from "assets/images/video-poster.jpg";
import DummyVideo from "assets/video/flower.webm";
import { Wrapper } from "./LiveVideo.styled";

export default function LiveVideo({ height }) {
  return (
    <Wrapper>
      <div className="video-container" style={{ height: height - 420 }}>
        <div className="record-container">
          <span>
            <RecordIcon />
            03:15
          </span>
        </div>
        <video src={DummyVideo} poster={VideoPoster}></video>
        <div className="controls-container">
          <span className="video-icon">
            <VolumeIcon
              onClick={() => {
                var video = document.getElementsByTagName("video")[0];
                if (video.volume) {
                  video.volume = 0;
                } else {
                  video.volume = 1;
                }
              }}
            />
          </span>
        </div>
        <div className="viewers-container">
          <span>
            <UserIcon />
            120 Viewers
          </span>
        </div>
      </div>
    </Wrapper>
  );
}
