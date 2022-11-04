import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  StartEndDatePicker,
  Input,
  Select,
  FormItem,
  SingleImageUploader,
  TextArea,
} from "components/common";
import { Wrapper } from "./EditliveStreamModal.styled";
import { uiVarList, uiVarOptions } from "common/uiVar";
import { callGetApiWithAuth, callPostApiWithAuth } from "utils/api";
import { SuccessNotification } from "components/common";

export default function EditliveStreamModal(props) {
  const [formData, setFormData] = useState({
    title: "",
    path: "",
    description: "",
    preview_image: "",
    timezone: "",
    topic: "",
    lang: "",
    products: [],
    start_at: "",
    end_at: ""
  });
  const [productsList, setProductsList] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [errors, setErrors] = useState(undefined);

  const onSelectImageFile = ({ data }) => {
    setFormData({
      ...formData,
      preview_image: data.file
    });
  };
  const onDateRange = (range_, dateRange) => {
    if (dateRange[0] && dateRange[1]) {
      setFormData({
        ...formData,
        start_at: dateRange[0],
        end_at: dateRange[1]
      });
    } else {
      setFormData({
        ...formData,
        start_at: "",
        end_at: ""
      });
    }
  };

  const onChangeFormData = (field, value) => {
    if (field === "title" && value && value.trim()) {
      const regex = /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g;
      let path = '';
      if (value.match(regex)) {
        path = value
        .match(regex)
        .map((x) => x.toLowerCase())
        .join('-');
      }
      setFormData({
        ...formData,
        title: value,
        path: path
      });
    } else {
      setFormData({
        ...formData,
        [field]: value
      });
    }
  };

  const validateFormData = () => {
    let errors0 = {
      title: "",
      path: "",
      preview_image: "",
      start_end_at: "",
      timezone: "",
      description: "",
      topic: "",
      lang: "",
      products: ""
    }

    if (!formData.title.trim()) {
      errors0.title = "Please enter title";
    }

    if (!formData.path.trim()) {
      errors0.path = "Please select path";
    }

    if (!formData.preview_image) {
      errors0.preview_image = "Please select preview image";
    }

    if (!formData.start_at && !formData.end_at) {
      errors0.start_end_at = "Please select start and end date";
    }

    if (!formData.timezone) {
      errors0.timezone = "Please select timezone";
    }

    if (!formData.description.trim()) {
      errors0.description = "Please enter description";
    }

    if (!formData.topic.trim()) {
      errors0.topic = "Please select topic";
    }

    if (!formData.lang.trim()) {
      errors0.lang = "Please select language";
    }

    if (formData.products.length === 0) {
      errors0.products = "Please select product";
    }

    setErrors(errors0);

    if (errors0.title || errors0.path || errors0.preview_image || errors0.start_end_at || errors0.timezone || errors0.description || errors0.topic || errors0.lang || errors0.products) {
      return false;
    } else {
      return true;
    }
  }

  const onSuccessUpdatedLiveStream = () => {
    setIsPublishing(false);
    setIsUpdating(false);
    SuccessNotification("Live stream has been updated successfully");
    setTimeout(() => {
      props.toggle();
    }, 1000);
    props.handleLoadLiveStreams();
  }

  const onFailedUpdateLiveStream = () => {
    setIsPublishing(true);
    setIsUpdating(false);
  }

  const handleUpdateLiveStream = (status) => {
    if (!validateFormData()) return;

    let requestData = new FormData();
    for (let key of Object.keys(formData)) {
      if (key !== "products") {
        requestData.append(key, formData[key]);
      }
    }
    formData.products.map((el, index) => {
      requestData.append(`products[${index}]`, el);
    });
    requestData.append("status", status);
    if (status*1 === 1) {
      setIsPublishing(true);
    } else {
      setIsUpdating(true);
    }
    callPostApiWithAuth("live_stream/update", requestData, onSuccessUpdatedLiveStream, onFailedUpdateLiveStream);
  };

  const onGetSuccessProducts = ({ data }) => {
    setProductsList(data.map((el) => ({
      value: el.id,
      key: el.id,
      label: el.title
    })));
  };

  const onGetFailedProducts = () => {

  };

  const handleLoadProducts = () => {
    callGetApiWithAuth("live_stream/products", onGetSuccessProducts, onGetFailedProducts);
  };
  
  useEffect(() => {
    handleLoadProducts();
  }, []);

  useEffect(() => {
    if (props.data) {
      let formData0 = {
        id: "",
        title: "",
        path: "",
        description: "",
        preview_image: "",
        timezone: "",
        topic: "",
        lang: "",
        products: [],
        start_at: "",
        end_at: ""
      };      
      for (let key of Object.keys(formData0)) {
        formData0[key] = props.data[key];
      }
      setFormData(formData0);
    }
  }, [props.data]);

  return (
    <Wrapper>
      <div className="modal-title-container">Schedule New Livestream</div>
      <Row gutter={[20, 20]}>
        <Col xs={24} md={6}>
          <div className="input-container single-container-uploader">
            <FormItem
              label={"Preview Image"}
              errorMessages={(errors && errors.preview_image) ? [{ message: errors.preview_image }] : []}
            >
              <SingleImageUploader
                className="upload-container-product"
                image={formData.preview_image}
                onChangeFile={onSelectImageFile}
                width="100%"
              />
            </FormItem>
          </div>
        </Col>
        <Col xs={24} md={18}>
          <Row gutter={[20, 20]}>
            <Col xs={24} sm={12}>
              <div className="input-container">
                <FormItem
                  label={"Title"}
                  errorMessages={(errors && errors.title) ? [{ message: errors.title }] : []}
                >
                  <Input
                    placeholder="Enter Title"
                    value={formData.title}
                    onChange={(e) => onChangeFormData("title", e.target.value)}
                  />
                </FormItem>
              </div>
            </Col>
            <Col xs={24} sm={12}>
              <div className="input-container">
                <FormItem
                  label={"Path"}
                  errorMessages={(errors && errors.path) ? [{ message: errors.path }] : []}
                >
                  <Input
                    placeholder="Path"
                    value={formData.path}
                    onChange={(e) => onChangeFormData("path", e.target.value)}
                  />
                </FormItem>
              </div>
            </Col>
            <Col span={24}>
              <div className="input-container">
                <FormItem
                  label={"Start And End At"}
                  errorMessages={(errors && errors.start_end_at) ? [{ message: errors.start_end_at }] : []}
                >
                  <StartEndDatePicker
                    startDate={formData.start_at}
                    endDate={formData.end_at}
                    onChange={onDateRange}
                    showTime={{ format: 'HH:mm' }}
                  />
                </FormItem>
              </div>
            </Col>
            <Col span={24}>
              <div className="input-container">
                <FormItem
                  label={"Timezone"}
                  errorMessages={(errors && errors.timezone) ? [{ message: errors.timezone }] : []}
                >
                  <Select
                    value={formData.timezone}
                    options={[
                      {
                        label: "Select Timezone",
                        value: "",
                        key: ""
                      },
                      ...uiVarList("timezones.list").map((el) => ({
                        value: el.text,
                        key: el.text,
                        label: el.text
                      }))
                    ]}
                    onChange={(value) => onChangeFormData("timezone", value)}
                    style={{ width: "100%" }}
                  />
                </FormItem>
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <div className="input-container">
            <FormItem
              label={"Description"}
              errorMessages={(errors && errors.description) ? [{ message: errors.description }] : []}
            >
              <TextArea
                placeholder="Enter Description"
                rows={5}
                maxLength={500}
                value={formData.description}
                onChange={(e) => onChangeFormData("description", e.target.value)}
              />
            </FormItem>
          </div>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <div className="input-container">
            <FormItem
              label={"Topic"}
              errorMessages={(errors && errors.topic) ? [{ message: errors.topic }] : []}
            >
              <Select
                value={formData.topic}
                options={[
                  {
                    label: "Select Topic",
                    value: "",
                    key: ""
                  },
                  ...uiVarOptions("liveStream.topics")
                ]}
                onChange={(value) => onChangeFormData("topic", value)}
                style={{ width: "100%" }}
              />
            </FormItem>
          </div>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <div className="input-container">
            <FormItem
              label={"Language"}
              errorMessages={(errors && errors.lang) ? [{ message: errors.lang }] : []}
            >
              <Select
                value={formData.lang}
                options={[
                  {
                    label: "Select Language",
                    value: "",
                    key: ""
                  },
                  ...uiVarOptions("liveStream.languages")
                ]}
                onChange={(value) => onChangeFormData("lang", value)}
                style={{ width: "100%" }}
              />
            </FormItem>
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div className="input-container">
            <FormItem
              label={"Products"}
              errorMessages={(errors && errors.products) ? [{ message: errors.products }] : []}
            >
              <Select
                placeholder="Select Products"
                mode="multiple"
                value={formData.products}
                options={productsList}
                onChange={(value) => onChangeFormData("products", value)}
                style={{ width: "100%" }}
              />
            </FormItem>
          </div>
        </Col>
        <Col span={24}>
          <div className="action-btn">
            <Button loading={isUpdating} onClick={() => handleUpdateLiveStream(2)}>Update and Draft</Button>
            <Button loading={isPublishing} onClick={() => handleUpdateLiveStream(1)}>Publish</Button>
          </div>
        </Col>
      </Row>
    </Wrapper>
  );
}
