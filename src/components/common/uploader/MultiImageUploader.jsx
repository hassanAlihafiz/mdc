/* eslint-disable react/no-array-index-key */
import React from "react";
import { Row, Col, ValidationNotification } from "components/common";
import { Upload } from "antd";
import { Wrapper } from "./MultiImageUploader.styled";

export default (props) => {
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };
  return (
    <Wrapper
      className={`${props.className} p-0 m-0`}
      style={{ width: props.width ? props.width : "auto" }}
    >
      <Row className="row-thumbnail">
        <Col sm={24}>
          <Row className={"mt-0"}>
            {props.label ? (
              <Col span={24} className="label-container">
                <div>*{props.label}</div>
              </Col>
            ) : null}
          </Row>
          <Row
            className="multi-uploader"
            gutter={[24, 24]}
            style={{ marginTop: 3 }}
          >
            <Col span={24}>
              {/* <ImgCrop rotate aspect={props.aspect || 1 / 1}> */}
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={props.files}
                onChange={props.onChangeFile}
                customRequest={props.customRequest}
                onPreview={onPreview}
              >
                {props.files?.length < 6 && "+ Upload"}
              </Upload>
              {/* </ImgCrop> */}
            </Col>
          </Row>
        </Col>
      </Row>
    </Wrapper>
  );
};
