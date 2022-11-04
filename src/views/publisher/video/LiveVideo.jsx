import React, { useState, useEffect } from "react";
import { message, AddEditModal } from "components/common";
import { ReactComponent as MicrophoneIcon } from "assets/icons/microphone-slash.svg";
import { ReactComponent as SettingIcon } from "assets/icons/setting-video.svg";
import { ReactComponent as PauseIcon } from "assets/icons/pause-circle.svg";
import { ReactComponent as UserIcon } from "assets/icons/3-User.svg";
import { ReactComponent as RecordIcon } from "assets/icons/record.svg";
import { ReactComponent as PlayIcon } from "assets/icons/play-video.svg";
import { useSelector, useDispatch } from "react-redux";
import SettingsModal from "./settings/SettingsModal";
import MicrophoneSettingsModal from "./microphone/MicrophoneSettingsModal";
import { Spin } from "antd";
import {
  initializeWebRTCAdapter,
  switchVideoMode,
  switchAudioMode,
  stopPublishing,
  disconnentChannel,
  startPublishing,
  applyMaxBandwidth,
  applyMaxMicrophone,
} from "utils/webRTCAdabptor";
import { callGetApiWithAuth } from "utils/api";
import { Wrapper } from "./LiveVideo.styled";

export default function LiveVideo({ data, height, rtcAdaptor, setRtcAdaptor }) {
  const dispatch = useDispatch();
  const [activeSettingsModal, setActiveSettingsModal] = useState(false);
  const [activeMicrophoneModal, setActiveMicrophoneModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [liveCount, setLiveCount] = useState(0);
  const [audioDevices, setAudioDevices] = useState([]);
  const [videoDevices, setVideoDevices] = useState([]);
  const [bitrate, setBitrate] = useState("900");
  const [microphone, setMicrophone] = useState(100);
  const [audio, setAudio] = useState("");
  const [video, setVideo] = useState("");
  const [timerInterval, setTimeInterval] = useState(null);
  const isStreamStart = useSelector((state) => state.publsiher.isStreamStart);

  const publishStream = () => {
    if (isStreamStart) {
      message.info("Already Started");
    } else {
      if (!video) {
        message.error("Select video source");
        return;
      } else if (!audio) {
        message.error("Select audio source");
        return;
      } else {
        setIsLoading(true);
        startPublishing(rtcAdaptor);
      }
    }
  };

  const stopStream = (isStopped) => {
    if (isStopped) {
      setIsLoading(true);
    }
    stopPublishing(rtcAdaptor);
  };

  const handleAudioSource = (value) => {
    switchAudioMode(value, rtcAdaptor, video);
    setAudio(value);
  };

  const handleVideoSource = (value) => {
    switchVideoMode(value, rtcAdaptor);
    setVideo(value);
    stopStream();
  };

  const setMaxMicrophone = (value) => {
    setMicrophone(value);
    applyMaxMicrophone(Number(value) / 100, rtcAdaptor);
  };

  const setMaxBitrate = (value) => {
    setBitrate(value);
    applyMaxBandwidth(value, rtcAdaptor);
  };

  const loadAvailableDevices = (obj) => {
    let audioSource = [];
    let videoSource = [];
    var i = 0;
    obj.forEach(function (device) {
      var label = device.label;
      var deviceId = device.deviceId;
      var devices = new Array();
      devices.forEach(function (same) {
        if (same == device.label) {
          i += 1;
          label = device.label + " - " + i;
          deviceId = device.deviceId + i;
        }
      });
      if (device.kind == "videoinput") {
        videoSource.push({
          label: device.label,
          value: device.deviceId,
        });
      } else if (device.kind == "audioinput") {
        audioSource.push({
          label: device.label,
          value: device.deviceId,
        });
      }
      devices.push(device.label);
    });
    setAudioDevices(audioSource);

    if (videoSource?.length === 0) {
      message.error("There is no camera in your device");
      setVideoDevices(videoSource);
    }

    if (videoSource?.length > 0) {
      setVideoDevices([
        ...videoSource.map((el) => el),
        {
          label: "Screen with Camera",
          value: "screenwithcamera",
        },
      ]);
      var vid = document.getElementById("stream-player");
      vid.play();
      switchVideoMode(videoSource[0].value, rtcAdaptor);
    }
  };

  const onGetViewersSuccess = ({ data }) => {
    setLiveCount(data.viewerCnt);
  };

  const onGetViewersFailed = () => {};

  const onLoadViewers = () => {
    callGetApiWithAuth(
      `live_stream/get/viewer_cnt/${data.path}`,
      onGetViewersSuccess,
      onGetViewersFailed
    );
  };

  useEffect(() => {
    if (audioDevices?.length > 0) {
      setAudio(audioDevices[0].value);
    }
  }, [audioDevices]);

  useEffect(() => {
    if (videoDevices?.length > 0) {
      setVideo(videoDevices[0].value);
    }
  }, [videoDevices]);

  useEffect(() => {
    var minutesLabel = document.getElementById("minutes");
    var secondsLabel = document.getElementById("seconds");
    var totalSeconds = 0;
    function setTime() {
      ++totalSeconds;
      secondsLabel.innerHTML = pad(totalSeconds % 60);
      minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    }

    function pad(val) {
      var valString = val + "";
      if (valString.length < 2) {
        return "0" + valString;
      } else {
        return valString;
      }
    }
    if (isStreamStart) {
      let interval = setInterval(() => {
        setTime();
      }, 1000);
      setTimeInterval(interval);
    } else {
      clearInterval(timerInterval);
      setTimeInterval(null);
    }
  }, [isStreamStart]);

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
    if (data) {
      const interval = setInterval(() => {
        onLoadViewers();
      }, 10000);
      return () => {
        clearInterval(interval)
      }
    }
  }, [data]);

  useEffect(() => {
    initializeWebRTCAdapter(
      loadAvailableDevices,
      setRtcAdaptor,
      dispatch,
      setIsLoading
    );
    dispatch({
      type: "SET_IS_STREAM_READY",
      payload: {
        isStreamReady: false,
      },
    });
  }, []);

  return (
    <Wrapper>
      <Spin spinning={isLoading}>
        <div className="video-container" style={{ height: height - 420 }}>
          {isStreamStart && (
            <div className="record-container">
              <span>
                <RecordIcon />
                <label id="minutes">00</label>
                <label id="colon">:</label>
                <label id="seconds">00</label>
              </span>
            </div>
          )}
          <video
            crossorigin
            playsinline
            id="stream-player"
            poster={data.preview_image}
            muted
          ></video>
          <div className="controls-container">
            <span className="video-icon">
              <MicrophoneIcon
                onClick={() => {
                  setActiveMicrophoneModal(true);
                }}
              />
            </span>
            {!isStreamStart ? (
              <span className="play-icon">
                <span>
                  <PlayIcon
                    onClick={() => {
                      publishStream();
                    }}
                  />
                </span>
              </span>
            ) : (
              <span className="pause-icon">
                <PauseIcon
                  onClick={() => {
                    stopStream(true);
                  }}
                />
              </span>
            )}
            <span className="video-icon">
              <SettingIcon
                onClick={() => {
                  setActiveSettingsModal(true);
                }}
              />
            </span>
          </div>
          <div className="viewers-container">
            <span>
              <UserIcon />
              {liveCount} Viewers
            </span>
          </div>
        </div>
      </Spin>
      {activeSettingsModal && (
        <AddEditModal
          onClose={() => {
            setActiveSettingsModal(false);
          }}
          open={activeSettingsModal}
          toggle={() => setActiveSettingsModal(!activeSettingsModal)}
          modalClass="Settings"
        >
          <SettingsModal
            toggle={setActiveSettingsModal}
            // eslint-disable-next-line no-sparse-arrays
            videoSourceOptions={[
              ...videoDevices?.map((el) => el),
              {
                label: "Screen",
                value: "screen",
              },
              ,
            ]}
            audioSourceOptions={audioDevices}
            audio={audio}
            bitrate={bitrate}
            video={video}
            handleAudioSource={handleAudioSource}
            handleVideoSource={handleVideoSource}
            setMaxBitrate={setMaxBitrate}
          />
        </AddEditModal>
      )}
      {activeMicrophoneModal && (
        <AddEditModal
          onClose={() => {
            setActiveMicrophoneModal(false);
          }}
          open={activeMicrophoneModal}
          toggle={() => setActiveMicrophoneModal(!activeMicrophoneModal)}
          modalClass="Settings"
        >
          <MicrophoneSettingsModal
            toggle={setActiveMicrophoneModal}
            microphone={microphone}
            setMaxMicrophone={setMaxMicrophone}
            // eslint-disable-next-line no-sparse-arrays
          />
        </AddEditModal>
      )}
    </Wrapper>
  );
}
