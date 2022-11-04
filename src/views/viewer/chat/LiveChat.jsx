import React from "react";
import { Input, Button } from "components/common";
import { ReactComponent as SendIcon } from "assets/icons/send.svg";
import DummyUserImage from "assets/images/dummy-user.png";
import { Wrapper } from "./LiveChat.styled";

export default function LiveChat({ height, openInDrawer }) {
  return (
    <Wrapper>
      <div className="live-title">Live Chat</div>
      <div className="divider" />
      <div
        className={
          openInDrawer
            ? "chat-drawer messages-container"
            : "messages-container normal-chat"
        }
        style={{ height: openInDrawer ? height - 145 : height - 255 }}
      >
        <div className="messages-box">
          <div className="user-message">
            <span>John Doe</span>
            <div className="message-with-image">
              <img src={DummyUserImage} />
              <div>Lorem Ipsum is simply dummy text of the printing.</div>
            </div>
          </div>
          <div className="admin-message">
            <span>You</span>
            <div>Lorem Ipsum is simply dummy text of the printing.</div>
          </div>
          <div className="user-message">
            <span>John Doe</span>
            <div className="message-with-image">
              <img src={DummyUserImage} />
              <div>Lorem Ipsum is simply dummy text of the printing.</div>
            </div>
          </div>
          <div className="admin-message">
            <span>You</span>
            <div>Lorem Ipsum is simply dummy text of the printing.</div>
          </div>
          <div className="user-message">
            <span>John Doe</span>
            <div className="message-with-image">
              <img src={DummyUserImage} />
              <div>Lorem Ipsum is simply dummy text of the printing.</div>
            </div>
          </div>
          <div className="admin-message">
            <span>You</span>
            <div>Lorem Ipsum is simply dummy text of the printing.</div>
          </div>
          <div className="user-message">
            <span>John Doe</span>
            <div className="message-with-image">
              <img src={DummyUserImage} />
              <div>Lorem Ipsum is simply dummy text of the printing.</div>
            </div>
          </div>
          <div className="admin-message">
            <span>You</span>
            <div>Lorem Ipsum is simply dummy text of the printing.</div>
          </div>
          <div className="user-message">
            <span>John Doe</span>
            <div className="message-with-image">
              <img src={DummyUserImage} />
              <div>Lorem Ipsum is simply dummy text of the printing.</div>
            </div>
          </div>
          <div className="admin-message">
            <span>You</span>
            <div>Lorem Ipsum is simply dummy text of the printing.</div>
          </div>
        </div>
      </div>
      <div className="message-input-container">
        <Input placeholder="Write your message..." />
        <Button>
          <SendIcon />
        </Button>
      </div>
    </Wrapper>
  );
}
