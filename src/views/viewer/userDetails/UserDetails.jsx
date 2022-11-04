import React from "react";
import DummyUserImage from "assets/images/dummy-user.png";
import { Wrapper } from "./UserDetails.styled";

export default function UserDetails() {
  return (
    <Wrapper>
      <div className="user-title">10 STEPS TO RECRUITING MASTERY</div>
      <div className="user-name-details">
        <div className="name-details-container">
          <div className="user-name">
            <img src={DummyUserImage} />
            Jane Cooper
          </div>
          <div className="product-training">Product Training</div>
        </div>
        <div className="language-title">Language: English</div>
      </div>
      <div className="user-description">
        Co-Founder Jenna Zwagil takes you through the 10 steps to duplicating
        success for exponential growth at MDC.
        <br />
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s. Lorem Ipsum is simply dummy text of the printing and
        typesetting industry. Lorem Ipsum has been the industry's standard dummy
        text ever since the 1500s.
      </div>
    </Wrapper>
  );
}
