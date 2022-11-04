import { WebRTCAdaptor } from "libraries/webRTC/webrtc_adaptor";
import { message } from "components/common";

var streamId = "test";

export function sendData(
  webRTCAdapter0,
  dispatch,
  myUser,
  message_,
  isBroadcast,
  products
) {
  try {
    var iceState = webRTCAdapter0.iceConnectionState(streamId);
    if (
      iceState != null &&
      iceState != "failed" &&
      iceState != "disconnected"
    ) {
      if (isBroadcast) {
        webRTCAdapter0.sendData(
          streamId,
          JSON.stringify({
            type: "products",
            products,
          })
        );
      } else {
        if (!message_) {
          message.error("Please input message");
        } else {
          webRTCAdapter0.sendData(
            streamId,
            JSON.stringify({
              first_name: myUser?.first_name,
              last_name: myUser?.last_name,
              image: myUser?.image,
              message: message_,
              created_at: new Date(),
              type: "admin",
            })
          );
          let message = {
            first_name: myUser?.first_name,
            last_name: myUser?.last_name,
            message: message_,
            created_at: new Date(),
            image: myUser?.image,
            type: "admin",
          };
          dispatch({
            type: "SET_MESSAGE",
            payload: {
              message,
            },
          });
        }
      }
    } else {
      if (iceState == null || iceState == "disconnected") {
        webRTCAdapter0.stop(streamId);
        webRTCAdapter0.closePeerConnection(streamId);
        webRTCAdapter0.closeWebSocket();
      }
      message.error(
        "Please check your internet connection and refresh the page again."
      );
    }
  } catch (exception) {
    console.error(exception);
    alert(
      "Message cannot be sent. Make sure you've enabled data channel and choose the correct player distribution on server web panel"
    );
  }
}
export function disconnentChannel(webRTCAdapter0) {
  webRTCAdapter0.stop(streamId);
}

export function connectChannel(webRTCAdapter0) {
  var token = "chat Live token";
  webRTCAdapter0.play(streamId, token, "", []);
}

export const initializeWebRTCAdapter = (
  setRtcAdaptor,
  dispatch,
  setIsConnected
) => {
  var websocketURL =
    "wss://us-east-2.imarketstream.com:5443/WebRTCAppEE/websocket";

  var mediaConstraints = {
    video: false,
    audio: false,
  };

  var pc_config = {
    iceServers: [
      {
        urls: "stun:stun1.l.google.com:19302",
      },
    ],
  };

  var sdpConstraints = {
    OfferToReceiveAudio: false,
    OfferToReceiveVideo: false,
  };
  var webRTCAdaptor_ = new WebRTCAdaptor({
    websocket_url: websocketURL,
    mediaConstraints: mediaConstraints,
    peerconnection_config: pc_config,
    sdp_constraints: sdpConstraints,
    debug: false,
    onlyDataChannel: true,

    callback: (info, obj) => {
      if (info === "initialized") {
        connectChannel(webRTCAdaptor_);
      } else if (info == "play_started") {
        setIsConnected(true);
      } else if (info == "play_finished") {
      } else if (info == "publish_started") {
      } else if (info == "closed") {
      } else if (info == "ice_connection_state_changed") {
      } else if (info == "data_received") {
        let user = JSON.parse(obj.event.data);
        if (user?.type == "admin" || user?.type == "user") {
          let message = {
            first_name: user?.first_name,
            last_name: user?.last_name,
            message: user?.message,
            created_at: user.created_at,
            image: user?.image,
            type: "user",
          };
          dispatch({
            type: "SET_MESSAGE",
            payload: {
              message,
            },
          });
        }
      }
    },
    callbackError: function (error, message) {
      var errorMessage = JSON.stringify(error);
      if (typeof message != "undefined") {
        errorMessage = message;
      }

      if (error?.indexOf && error?.indexOf("WebSocketNotConnected") != -1) {
        errorMessage = "WebSocket Connection is disconnected.";
      } else if (error?.indexOf && error?.indexOf("no_stream_exist" != -1)) {
      }
    },
  });
  setRtcAdaptor(webRTCAdaptor_);
  return webRTCAdaptor_;
};
