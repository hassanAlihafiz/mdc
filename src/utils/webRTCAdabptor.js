import { WebRTCAdaptor } from "libraries/webRTC/webrtc_adaptor";
import { message } from "components/common";
import { getUrlParameter } from "libraries/webRTC/fetch.stream.js";

var streamId = "test";

// var streamId = getUrlParameter(
//   "id",
//   window.location.search.slice(window.location.search.indexOf("?") + 1)
// );

export function sendData(webRTCAdapter0, dispatch, myUser, message_) {
  try {
    var iceState = webRTCAdapter0.iceConnectionState(streamId);
    if (
      iceState != null &&
      iceState != "failed" &&
      iceState != "disconnected"
    ) {
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
    } else {
      message.error("Please publish your stream first");
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

export function stopPublishing(webRTCAdapter0) {
  webRTCAdapter0.stop(streamId);
}

export function startPublishing(webRTCAdapter0) {
  var token = "dummy_token_we will load this token from auth api later";
  webRTCAdapter0.publish(streamId, token);
}

export function switchVideoMode(chbx, webRTCAdapter0) {
  if (chbx == "screen") {
    webRTCAdapter0.switchDesktopCapture(streamId);
  } else if (chbx == "screenwithcamera") {
    webRTCAdapter0.switchDesktopCaptureWithCamera(streamId);
  } else {
    setTimeout(() => {
      var vid = document.getElementById("stream-player");
      vid.play();
    }, 1500);
    webRTCAdapter0.switchVideoCameraCapture(streamId, chbx);
  }
}

export function switchAudioMode(chbx, webRTCAdapter0, video) {
  webRTCAdapter0.switchAudioInputSource(streamId, chbx);
  switchVideoMode(video, webRTCAdapter0);
}

export function applyMaxBandwidth(maxVideoBitrateKbps, webRTCAdapter0) {
  webRTCAdapter0.changeBandwidth(maxVideoBitrateKbps, streamId);
}
export function applyMaxMicrophone(microphone, webRTCAdapter0) {
  webRTCAdapter0.currentVolume = microphone;
  if (webRTCAdapter0.soundOriginGainNode != null) {
    webRTCAdapter0.soundOriginGainNode.gain.value = microphone;
  }

  if (webRTCAdapter0.secondStreamGainNode != null) {
    webRTCAdapter0.secondStreamGainNode.gain.value = microphone;
  }
}

export const initializeWebRTCAdapter = (
  loadAvailableDevices,
  setRtcAdaptor,
  dispatch,
  setIsLoading
) => {
  var bitrateBoxValue = 1500;
  var websocketURL =
    "wss://us-east-2.imarketstream.com:5443/WebRTCAppEE/websocket";

  var mediaConstraints = {
    video: true,
    audio: true,
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
  let obj_ = [];

  var webRTCAdaptor_ = new WebRTCAdaptor({
    websocket_url: websocketURL,
    mediaConstraints: mediaConstraints,
    peerconnection_config: pc_config,
    sdp_constraints: sdpConstraints,
    localVideoId: "stream-player",
    debug: true,
    bandwidth: bitrateBoxValue,
    callback: (info, obj) => {
      if (info === "initialized") {
      } else if (info == "available_devices") {
        if (obj_.length !== obj.length) {
          obj_ = obj;
          loadAvailableDevices(obj);
        }
      } else if (info == "publish_started") {
        dispatch({
          type: "SET_IS_STREAM_START",
          payload: {
            isStreamStart: true,
          },
        });
        setIsLoading(false);
        message.success("You have started publishing");
      } else if (info == "publish_finished") {
        message.success("You have stopped publishing");
        setIsLoading(false);
        dispatch({
          type: "SET_IS_STREAM_START",
          payload: {
            isStreamStart: false,
          },
        });
      } else if (info == "data_received") {
      }
    },
    callbackError: function (error, message) {
      var errorMessage = JSON.stringify(error);
      if (typeof message != "undefined") {
        errorMessage = message;
      }
      var errorMessage = JSON.stringify(error);
      console.log("errorerror", error);
      if (error?.indexOf("NotFoundError") != -1) {
        errorMessage =
          "Camera or Mic are not found or not allowed in your device";
      } else if (
        error?.indexOf("NotReadableError") != -1 ||
        error?.indexOf("TrackStartError") != -1
      ) {
        errorMessage =
          "Camera or Mic is being used by some other process that does not let read the devices";
      } else if (
        error?.indexOf("OverconstrainedError") != -1 ||
        error?.indexOf("ConstraintNotSatisfiedError") != -1
      ) {
        errorMessage =
          "There is no device found that fits your video and audio constraints. You may change video and audio constraints";
      } else if (
        error?.indexOf("NotAllowedError") != -1 ||
        error?.indexOf("PermissionDeniedError") != -1
      ) {
        errorMessage = "You are not allowed to access camera and mic.";
      } else if (error?.indexOf("TypeError") != -1) {
        errorMessage = "Video/Audio is required";
      } else if (error?.indexOf("getUserMediaIsNotAllowed") != -1) {
        errorMessage =
          "You are not allowed to reach devices from an insecure origin, please enable ssl";
      } else if (error?.indexOf("ScreenSharePermissionDenied") != -1) {
        errorMessage = "You are not allowed to access screen share";
      } else if (error?.indexOf("WebSocketNotConnected") != -1) {
        errorMessage = "WebSocket Connection is disconnected.";
      }
      alert(errorMessage);
    },
  });
  setRtcAdaptor(webRTCAdaptor_);
  return webRTCAdaptor_;
};
