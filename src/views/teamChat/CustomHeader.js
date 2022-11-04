import React, { useState, useEffect } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { SwapOutlined } from "@ant-design/icons";
import NoProfileImage from "assets/images/user.svg";
import { Button } from "components/common";
import styled from "styled-components";

export default function CustomHeader({ user, channel, showSettingsModal, onInviteUser, handleClickVisibleChannelList }) {
  const [channelImage, setChannelImage] = useState('');
  const [channelName, setChannelName] = useState('');
  
  useEffect(() => {
    if (channel.members && channel.members.length === 2) {
      channel.members.filter((el) => el.userId*1 !== user.userId*1).map((item) => {
        setChannelName(item.nickname);
        setChannelImage((item.profileUrl !== 'null' && item.profileUrl) ? item.profileUrl : NoProfileImage);
      })
    } else if (channel.members && channel.members.length > 2) {
      setChannelName(channel.name || 'Group Channel');
      setChannelImage((channel.coverUrl !== 'null' && channel.coverUrl) ? channel.coverUrl : NoProfileImage);
    }
  }, [channel]);

  return (
    <Wrapper>
      <div className="avatar-container">
        <div className="visible-contact">
          <Button
            className="visible-contact-button"
            onClick={() => {
              handleClickVisibleChannelList()
            }}
            icon={<SwapOutlined />}
          />
        </div>
        <div className="avatar">
          <img
            style={{
              width: "40px",
              height: "40px",
              objectFit: "cover",
              borderRadius: "50%",
            }}
            src={channelImage}
            alt={"avatar"}
          />
        </div>
      </div>

      <div className="title">
        <div className="user-name">{channelName}</div>
      </div>
      {channel && channel.members && channel.members.length > 2 &&
        <div onClick={onInviteUser} className="invite">
          <div className="invite-text">Invite User</div>
        </div>
      }
      <div className="show-settings-options">
        <InfoCircleOutlined className="icon-color" onClick={() => showSettingsModal()} />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 11px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  .avatar-container {
    display: flex;
    justify-content: center;
    align-items: center;
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
  .description {
    font-size: 12px;
    color: grey;
  }
  .show-settings-options {
    display: flex;
    align-items: center;
    margin-right: 10px;
    cursor: pointer;
    font-size: 22px;
  }
  .invite {
    border: 1px solid #1890ff;
    margin-right: 10px;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
  }
  .invite-text {
    font-size: 12px;
    color: #1890ff;
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
