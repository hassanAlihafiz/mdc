import React, { useState, useEffect } from "react";
import { Input, Button, message } from "components/common";
import { ReactComponent as SendIcon } from "assets/icons/send.svg";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "utils/auth";
import {
  sendData,
  disconnentChannel,
  initializeWebRTCAdapter,
} from "utils/webRTCChannel";
import $ from "jquery";
import { Wrapper } from "./LiveChat.styled";

export default function LiveChat({
  height,
  openInDrawer,
  rtcAdaptor,
  setRtcAdaptor,
  setIsConnected,
  isConnected
}) {
  const dispatch = useDispatch();
  const myUser = getUser();
  const [message_, setMessage_] = useState("");
  const messages = useSelector((state) => state.publsiher.messages);
  const isStreamStart = useSelector((state) => state.publsiher.isStreamStart);

  useEffect(() => {
    if (messages?.length > 0) {
      var div = $("#messages");
      div.scrollTop(div.prop("scrollHeight"));
    }
  }, [messages]);

  useEffect(() => {
    return () => {
      if (rtcAdaptor) {
        disconnentChannel(rtcAdaptor);
        setRtcAdaptor(undefined);
        dispatch({
          type: "SET_IS_STREAM_START",
          payload: {
            isStreamStart: false,
          },
        });
        dispatch({
          type: "RESET_MESSAGES",
        });
      }
    };
  }, [rtcAdaptor]);

  useEffect(() => {
    if (isStreamStart) {
      initializeWebRTCAdapter(setRtcAdaptor, dispatch, setIsConnected);
    } else {
      if (rtcAdaptor) {
        disconnentChannel(rtcAdaptor);
      }
      setIsConnected(false);
      setRtcAdaptor(undefined);
    }
  }, [isStreamStart]);

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
        id={"messages"}
      >
        <div className="messages-box">
          {messages?.map((el) => {
            if (el.type === "user") {
              return (
                <div className="user-message">
                  <span>
                    {el.first_name} {el.last_name}
                  </span>
                  <div className="message-with-image">
                    <img src={el.image} />
                    <div>{el.message}</div>
                  </div>
                </div>
              );
            } else {
              return (
                <div className="admin-message">
                  <span>You</span>
                  <div>{el.message}</div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="message-input-container">
        <Input
          placeholder="Write your message..."
          value={message_}
          onChange={(e) => setMessage_(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              if (isStreamStart) {
                setMessage_("");
                sendData(rtcAdaptor, dispatch, myUser, message_);
              } else {
                message.error("Please publish your stream first");
              }
            }
          }}
          disabled={!isConnected}
        />
        <Button
          onClick={() => {
            if (isStreamStart) {
              setMessage_("");
              sendData(rtcAdaptor, dispatch, myUser, message_);
            } else {
              message.error("Please publish your stream first");
            }
          }}
          disabled={!isConnected}
        >
          <SendIcon />
        </Button>
      </div>
    </Wrapper>
  );
}
