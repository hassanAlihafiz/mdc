import React from "react";
import styled from "styled-components";

export default function AddComboSection(props) {

  return (
    <Wrapper>
      <div class="training-video-container">
        <iframe id="trainingVideoFrame" class="sproutvideo-player" src="https://videos.sproutvideo.com/embed/119cd6bb1b1de7cf98/984df8d78412d68b" frameBorder="0" allowFullScreen=""></iframe>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-top: 10px;
  .training-video-container {
    position: relative;
    height: 0;
    padding-bottom: 55.625%;
    max-width: 1000px;
    margin: 0 auto;
    iframe {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0px;
      top: 0px;
    }
  }
`