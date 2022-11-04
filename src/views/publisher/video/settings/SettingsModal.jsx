import React, { useState, useEffect } from "react";
import { Row, Col, Input, FormItem, Radio, Button } from "components/common";
import { Wrapper } from "./SettingsModal.styled";

export default function SettingsModal({
  videoSourceOptions,
  audioSourceOptions,
  audio,
  bitrate,
  video,
  handleAudioSource,
  handleVideoSource,
  setMaxBitrate,
}) {
  const [bitrate_, setBitrate_] = useState("900");

  useEffect(() => {
    setBitrate_(bitrate);
  }, [bitrate]);

  return (
    <Wrapper>
      <div className="modal-title-container">Settings</div>
      <Row gutter={[20, 20]}>
        <Col xs={24}>
          <div className="input-container">
            <FormItem label={"Max Video Bitrate(Kbps):"}>
              <div className="bitate-input">
                <Input
                  placeholder="Enter Max Video Bitrate (Kbps):"
                  value={bitrate_}
                  onChange={(e) => setBitrate_(e.target.value)}
                />
                <Button onClick={() => setMaxBitrate(bitrate_)}>Set</Button>
              </div>
            </FormItem>
          </div>
        </Col>
        <Col xs={24}>
          <div className="input-container">
            <FormItem label={"Video Source"}>
              <Radio.Group
                onChange={(e) => handleVideoSource(e.target.value)}
                value={video}
              >
                <Row gutter={[10, 10]}>
                  {videoSourceOptions?.map((el) => {
                    return (
                      <Col xs={24} sm={12}>
                        <div className="radio-label">
                          <Radio value={el.value}>{el.label}</Radio>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </Radio.Group>
            </FormItem>
          </div>
        </Col>
        <Col xs={24}>
          <div className="input-container">
            <FormItem label={"Audio Source"}>
              <Radio.Group
                onChange={(e) => handleAudioSource(e.target.value)}
                value={audio}
              >
                <Row gutter={[10, 10]}>
                  {audioSourceOptions?.map((el) => {
                    return (
                      <Col xs={24}>
                        <div className="radio-label">
                          <Radio value={el.value}>{el.label}</Radio>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </Radio.Group>
            </FormItem>
          </div>
        </Col>
      </Row>
    </Wrapper>
  );
}
