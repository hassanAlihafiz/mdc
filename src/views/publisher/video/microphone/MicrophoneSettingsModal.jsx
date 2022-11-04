import React, { useState, useEffect } from "react";
import { Row, Col, Slider, FormItem, Button } from "components/common";
import { Wrapper } from "./MicrophoneSettingsModal.styled";

export default function MicrophoneSettingsModal({
  microphone,
  setMaxMicrophone,
  toggle,
}) {
  const [microphone_, setMicrophone_] = useState(100);

  useEffect(() => {
    setMicrophone_(microphone);
  }, [microphone]);

  return (
    <Wrapper>
      <div className="modal-title-container">Microphone Settings</div>
      <Row gutter={[20, 20]}>
        <Col xs={24}>
          <div className="input-container">
            <FormItem label={"Microphone Gain:"}>
              <Slider
                onChange={(e) => {
                  setMicrophone_(e);
                }}
                step={null}
                marks={{
                  0: "0",
                  10: "10",
                  20: "20",
                  30: "30",
                  40: "40",
                  50: "50",
                  60: "60",
                  70: "70",
                  80: "80",
                  90: "90",
                  100: "100",
                }}
                value={microphone_}
              />
            </FormItem>
          </div>
        </Col>
        <Col xs={24}>
          <div className="action-btn">
            <Button
              onClick={() => {
                setMaxMicrophone(microphone_);
                toggle();
              }}
            >
              Set
            </Button>
          </div>
        </Col>
      </Row>
    </Wrapper>
  );
}
