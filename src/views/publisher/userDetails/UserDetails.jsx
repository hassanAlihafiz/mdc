import { uiVarLabel } from "common/uiVar";
import React from "react";
import { Wrapper } from "./UserDetails.styled";

export default function UserDetails({ data }) {
  return (
    <Wrapper>
      <div className="user-title">{data.title}</div>
      <div className="user-name-details">
        <div className="name-details-container">
          <div className="user-name">
            <img src={data.user.image} />
            {data.user.first_name} {data.user.last_name}
          </div>
          <div className="product-training">{uiVarLabel("liveStream.topics", data.topic)}</div>
        </div>
        <div className="language-title">Language: {uiVarLabel("liveStream.languages", data.lang)}</div>
      </div>
      <div className="user-description">{data.description}</div>
    </Wrapper>
  );
}
