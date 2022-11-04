import React, { useState, useEffect } from "react";
import {
  Button,
  Row,
  Col,
  Input,
  Select,
  FormItem,
  SuccessNotification,
  Popconfirm,
  AutoComplete,
} from "components/common";
import { Spin } from "antd";
import { getUser } from "utils/auth";
import { varOptions, varKey } from "common/var";
import { callPostApiWithAuth, callGetApiWithAuth } from "utils/api";
import { Wrapper } from "./CustomWebsite.styled";
import { AiOutlineCopy } from "react-icons/ai";

export default function CustomWebsite({ setReloadData }) {
  const myUser = getUser();
  const [userOptions, setUserOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [formData, setFormData] = useState({
    referral_url: "",
    source: "",
    placement_username: "",
    leg: "",
  });

  const validateForm = () => {
    const errorMessage0 = [];
    let isValid = true;
    
    if (!formData.placement_username) {
      errorMessage0.push({
        name: "placement_username",
        message: "Please select placement user id",
      });
      isValid = false;
    } else if (formData.placement_username && !isSelected) {
      errorMessage0.push({
        name: "placement_username",
        message: "Please select valid placement user id",
      });
      isValid = false;
    }
    if (isSelected && !formData?.leg) {
      errorMessage0.push({
        name: "leg",
        message: "Please select traffic rotator",
      });
      isValid = false;
    }

    setErrorMessages(errorMessage0);
    return isValid;
  };

  const onSelectUser = (value) => {
    setIsSelected(true);
    setFormData({
      ...formData,
      placement_username: value,
    });
  };

  const copyCustomUrl = () => {
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    let requestData = {
      source: formData.source,
      placement_username: formData.placement_username,
      leg: formData.leg,
    };
    callPostApiWithAuth(
      "my_website/replicated/track",
      requestData,
      onCopyUrlSuccess,
      onCopyUrlFail
    );
  };

  const onCopyUrlSuccess = (data) => {
    setIsLoading(false);
    SuccessNotification("Successfully copied to clipboard");
    navigator.clipboard.writeText(
      `${process.env.REACT_APP_CORP_URL}?ref=${myUser?.username}${
        formData?.source ? `&source=${formData.source}&` : "&"
      }placement_username=${formData.placement_username}&leg=${varKey(
        "conversionTrack.leg",
        formData.leg
      ).toLowerCase()}`
    );
    setIsSelected(false);
    setReloadData(true);
    setFormData({
      referral_url: "",
      source: "",
      placement_username: "",
      leg: "",
    });
  };
  const onCopyUrlFail = () => {
    setIsLoading(false);
  };

  const getPlacementUserSuccess = (data) => {
    setIsSearching(false);
    if (data?.data?.length > 0) {
      setUserOptions([
        ...data?.data?.map((el) => {
          return {
            label: `${el.first_name} ${el.last_name}`,
            value: el.username,
          };
        }),
      ]);
    }
  };
  const getPlacementUserFail = () => {
    setIsSearching(false);
    setUserOptions([]);
  };
  
  const validateRefUrl = () => {
    const errorMessage0 = [];
    let isValid = true;
    let urlRegex =
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    if (!formData.referral_url) {
      errorMessage0.push({
        name: "referral_url",
        message: "Please Enter referral url",
      });
      isValid = false;
    } else if (!formData.referral_url.match(urlRegex)) {
      errorMessage0.push({
        name: "referral_url",
        message: "Enter valid referral url",
      });
      isValid = false;
    }

    setErrorMessages(errorMessage0);
    return isValid;
  };

  const handleCopyRefUrl = () => {
    if (!validateRefUrl()) {
      return;
    }
    navigator.clipboard.writeText(`${formData.referral_url}?ref=${myUser?.username}`);
    SuccessNotification("Your referral url has been copied successfully.")
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (formData?.placement_username && !isSelected) {
        setIsSearching(true);
        callGetApiWithAuth(
          `common/search_placement_downline/${formData?.placement_username}`,
          getPlacementUserSuccess,
          getPlacementUserFail
        );
      } else {
        setUserOptions([]);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [formData?.placement_username]);

  return (
    <Wrapper>
      <div className="website-details">
        <div className="website-title">Create Custom Website Link</div>
        <div className="website-description">
          You can generate custom referral URLs for a specific product or page on the website by copying & pasting the url below.
          <br />
          Our system will add "?ref=your_username" at the end of the your URL automatically so you can drive traffic into that page specifically and get credit for your sales.
        </div>
        <div className="website-description example-url-title">Example custom referral URL:</div>
        <div className="website-description example-url">
          {process.env.REACT_APP_CORP_URL}
          /shop/part-time-pack?ref=your_username
        </div>
        <br />
        <div className="website-description">
          Please input the specific URL that you want to replicate below:
        </div>
        <div className="referer-container">
          <Row gutter={[25, 5]}>
            <Col xs={24} sm={12}>
              <FormItem
                errorMessages={errorMessages.filter(
                  (el) => el.name === "referral_url"
                )}
              >
                <div className="input-container">
                  <div className="label-title">Referral URL:</div>
                  <Input
                    value={formData.referral_url}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        referral_url: e.target.value,
                      })
                    }
                    className={
                      errorMessages.filter((el) => el.name === "referral_url")
                        .length > 0
                        ? "has-error"
                        : ""
                    }
                  />
                </div>
              </FormItem>
            </Col> 
            <Col xs={24} sm={12}>
              <div
                className="referer-title"
                style={{
                  paddingBottom:
                    errorMessages.filter((el) => el.name === "referral_url")
                      .length > 0
                      ? 45
                      : 15,
                }}
              >
                ?ref={myUser?.username}
                {/* <AiOutlineCopy className="referral-url-copy-icon" onClick={handleCopyRefUrl} /> */}
              </div>
            </Col>
          </Row>
          {/* <div className='title d-flex align-items-center justify-content-between mt-2'>
            <span>
              Lead and Traffic
            </span>
            <div className='divider' />
          </div>
          <Row gutter={[25, 15]}>
            <Col xs={24} lg={5}>
              <FormItem
                errorMessages={errorMessages.filter(
                  (el) => el.name === "source"
                )}
              >
                <div className="input-container">
                  <div className="label-title">Source:</div>
                  <Input
                    value={formData.source}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        source: e.target.value,
                      })
                    }
                  />
                </div>
              </FormItem>
            </Col>
            <Col xs={24} lg={12}>
              <FormItem
                errorMessages={errorMessages.filter(
                  (el) => el.name === "placement_username"
                )}
              >
                <div className="input-container autocomplete-container">
                  <div className="label-title">Placement Username:</div>
                  <Spin spinning={isSearching}>
                    <AutoComplete
                      options={userOptions}
                      placeholder="Please input username and select the search result."
                      value={formData?.placement_username}
                      onSelect={onSelectUser}
                      onChange={(e) => {
                        setIsSelected(false);
                        setFormData({
                          ...formData,
                          placement_username: e,
                        });
                      }}
                      className={
                        errorMessages.filter((el) => el.name === "placement_username")
                          .length > 0
                          ? "has-error"
                          : ""
                      }
                    />
                  </Spin>
                </div>
              </FormItem>
            </Col>
            <Col xs={24} lg={7}>
              <FormItem
                errorMessages={errorMessages.filter((el) => el.name === "leg")}
              >
                <div className="input-container">
                  <div className="label-title">Traffic Rotator:</div>
                  <Select
                    value={formData.leg}
                    disabled={!isSelected}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        leg: e,
                      });
                    }}
                    options={varOptions("conversionTrack.leg")}
                    className={
                      errorMessages.filter((el) => el.name === "leg").length > 0
                        ? "has-error"
                        : ""
                    }
                  />
                </div>
              </FormItem>
            </Col>
          </Row> */}
        </div>
      </div>
      <div className="website-button">
        {/* <Popconfirm onConfirm={handleCopyRefUrl}> */}
          <Button loading={isLoading} onClick={handleCopyRefUrl}>Copy Link</Button>
        {/* </Popconfirm> */}
      </div>
    </Wrapper>
  );
}
