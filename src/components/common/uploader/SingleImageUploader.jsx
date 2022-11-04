/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from "react";
import { Row, Col, ValidationNotification, Button } from "components/common";
import { Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import NoImage from "assets/images/no_image.png";
import { Wrapper } from "./SingleImageUploader.styled";
import { getToken } from "utils/auth";

export default (props) => {
  const token = getToken();
  const [previewImg, setPreviewImg] = useState("");

  function beforeUpload(file) {
    const isLt2M = file.size / 1024 / 1024 < 20;
    if (!isLt2M) {
      ValidationNotification("Image must smaller than 20MB!");
    }
    return isLt2M;
  }

  function handleRemove() {
    props.onChangeFile({ data: { file: "" } });
  }

  const params = {
    name: 'file',
    action: `${process.env.REACT_APP_API_URL}common/upload_file`,
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + token,
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {}
      if (info.file.status === 'done') {
        props.onChangeFile(info.file.response);
      } else if (info.file.status === 'error') {
        console.log(`${info.file.name} file upload failed.`);
      }
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: percent => `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  useEffect(() => {
    if (props.image) {
      setPreviewImg(props.image);
    } else {
      setPreviewImg("");
    }
  }, [props.image]);

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
              <div className="upload-container">
                {previewImg ?
                  <img src={previewImg} className="preview-img" />
                  :
                  <img src={NoImage} className="no-preview-img" />
                }
                <Upload
                  {...params}
                  listType="text"
                  accept="image/*"
                  beforeUpload={beforeUpload}
                  customRequest={props.customRequest}
                  onRemove={handleRemove}
                  maxCount={1}
                  multiple={false}
                  className="file-upload"
                >
                  <Button
                    icon={<UploadOutlined />}
                    className="upload-btn"
                  >
                    Upload Image
                  </Button>
                </Upload>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Wrapper>
  );
};
