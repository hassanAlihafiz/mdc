import React from "react";
import { Button } from "components/common";
import { PlusCircleOutlined, SwapOutlined } from "@ant-design/icons";
import NoProfileImage from "assets/images/user.svg";
import styled from "styled-components";

export default function CustomizedChannelListHeader({ user, openChannelModal, handleClickVisibleChannelContent }) {
  return (
    <Wrapper>
      <div className="avatar-container">
        <div className="avatar">
          <img
            style={{
              width: "40px",
              height: "40px",
              objectFit: "cover",
              borderRadius: "100%",
            }}
            src={user.image || NoProfileImage}
            alt={"avatar"}
          />
        </div>
      </div>

      <div className="title">
        <div className="user-name">{`${user.first_name} ${user.last_name}`}</div>
      </div>

      <div onClick={openChannelModal} className="open-channel">
        <PlusCircleOutlined className="icon-color" />
      </div>
      <div className="visible-contact">
        <Button
          className="visible-contact-button"
          onClick={() => {
            handleClickVisibleChannelContent()
          }}
          icon={<SwapOutlined />}
        />
      </div>
    </Wrapper>
  );
};


const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 11px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  background: #ffffff;
  .avatar-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
  }
  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
  }
  .title {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
  }
  .user-name {
    font-size: 15px;
    line-height: 18px;
  }
  .open-channel {
    display: flex;
    align-items: center;
    padding-right: 10px;
    cursor: pointer;
    font-size: 22px;
  }
  .icon-color {
    color: #1890ff;
  }
  .visible-contact {
    color: #ffffff;
  }
  @media only screen and (min-width: 769px) {
    .visible-contact {
      display: none;
    }
  }
`
