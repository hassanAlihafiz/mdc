/* eslint-disable react/no-array-index-key */
import React from "react";
import { Row, Col, ValidationNotification } from "components/common";
import { Upload } from "antd";
import { Wrapper } from "./SingleImageUploader.styled";

export default (props) => {
  const onPreview = async (file) => {
    let src = file.url;
    window.open(src, "_blank");
  };

  function beforeUpload(file) {
    const isLt500M = file.size / 1024 / 1024 < 1030;
    if (!isLt500M) {
      ValidationNotification("Video must smaller than 1GB!");
    }
    return isLt500M;
  }

  return (
    <Wrapper
      className={`${props.className} p-0 m-0`}
      style={{ width: props.width ? props.width : "auto" }}
    >
      <Row className={"rowThumbnail"}>
        <Col sm={24}>
          <Row className={"mt-0"}>
            {props.label ? (
              <Col span={24} className="label-container">
                <div>*{props.label}</div>
              </Col>
            ) : null}
          </Row>
          <Row className="" gutter={[24, 24]} style={{ marginTop: 3 }}>
            <Col span={24}>
              <Upload
                listType="picture-card"
                fileList={props.files}
                onChange={props.onChangeFile}
                accept="video/*"
                onPreview={onPreview}
                beforeUpload={beforeUpload}
                customRequest={props.customRequest}
              >
                {props.files?.length < 1 && "+ Upload"}
              </Upload>
            </Col>
          </Row>
        </Col>
      </Row>
    </Wrapper>
  );
};
