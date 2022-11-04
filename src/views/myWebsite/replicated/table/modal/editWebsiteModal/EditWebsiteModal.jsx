import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Input,
  Select,
  FormItem,
  SuccessNotification,
  Popconfirm,
  AutoComplete,
} from "components/common";
import { varOptions, varKey } from "common/var";
import { callPutApiWithAuth, callGetApiWithAuth } from "utils/api";
import { Spin } from "antd";
import { getUser } from "utils/auth";
import { Wrapper } from "./EditWebsiteModal.styled";

export default function EditWebsiteModal({ editData, toggle, loadTableData }) {
  const myUser = getUser();
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [formData, setFormData] = useState({
    source: 'main',
    placement_id: "",
    placement_username: '',
    leg: 10,
  });
  const [userOptions, setUserOptions] = useState([]);  

  const onGetPlacement = (res) => {
    setUserOptions(res.data)
  }
  const searchPlacement = (v) => {
    setFormData({ 
      ...formData,
      placement_username: v
    })
    callGetApiWithAuth(`common/search_placement_downline/${v}`,
      onGetPlacement
    )
  }

  const onSelectUser = (_, option) => {
    userOptions.forEach(el => {
      if (el.id===option.key) {
        setFormData({
          ...formData,
          placement_id: el.id,
          placement_username: el.username
        });
      }
    })    
  };

  const onUpdateDone = (res) => {
    SuccessNotification(res.message)
    navigator.clipboard.writeText(
      `${process.env.REACT_APP_CORP_URL}?ref=${myUser.username}${formData.source?`&source=${formData.source}`:''}&placement_username=${formData.placement_username}&leg=${varKey('conversionTrack.leg', formData.leg)}`
    )
    setIsUpdating(false)
    loadTableData()
    toggle()
  }
  const onUpdateFail = () => {
    setIsUpdating(false)
  }
  const handleUpdate = () => {
    // Validation
    const errorMessage0 = [];
    let isValid = true;
    if (!formData.placement_id) {
      errorMessage0.push({
        name: "placement_id",
        message: "Please select placement user id",
      });
      isValid = false;
    } 
    if (!formData.leg) {
      errorMessage0.push({
        name: "leg",
        message: "Please select traffic rotator",
      });
      isValid = false;
    }

    setErrorMessages(errorMessage0);
    if (!isValid) return

    setIsUpdating(true)
    callPutApiWithAuth(
      `my_website/replicated/track/${editData.id}`,
      formData, onUpdateDone, onUpdateFail
    );
  }

  useEffect(() => {
    if (editData) {
      setFormData({
        source: editData.source,
        placement_id: editData.placement_id,
        placement_username: editData.placement_user.username,
        leg: editData.leg,
      });
    }
  }, [editData]);

  return (
    <Wrapper>
      <div className="modal-title-container">Edit Custom Website Link</div>
      <Row gutter={[20, 20]} className="referer-container">
        <Col span={24}>
          
        </Col>
        <Col xs={24}>
          <FormItem>
            <div className="input-container">
              <div className="label-title">Source (Optional):</div>
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
        <Col xs={24}>
          <FormItem
            errorMessages={errorMessages.filter(
              (el) => el.name === "placement_id"
            )}
          >
            <div className="input-container autocomplete-container">
              <div className="label-title">Placement Username:</div>
              <Spin spinning={false}>
                <AutoComplete
                  placeholder="Please input username and select the search result."
                  options={userOptions.map(el => ({
                    label: `${el.first_name} ${el.last_name}`,
                    value: `${el.username}`,
                    key: el.id,
                  }))}
                  onSelect={onSelectUser}
                  value={formData.placement_username}
                  onChange={searchPlacement}
                  className={
                    errorMessages.filter((el) => el.name === "placement_id")
                      .length > 0
                      ? "has-error"
                      : ""
                  }
                />
              </Spin>
            </div>
          </FormItem>
        </Col>
        <Col xs={24}>
          <FormItem
            errorMessages={errorMessages.filter((el) => el.name === "leg")}
          >
            <div className="input-container">
              <div className="label-title">Traffic Rotator:</div>
              <Select
                value={formData.leg}
                onChange={(v) => {
                  setFormData({
                    ...formData,
                    leg: v,
                  });
                }}
                options={varOptions("conversionTrack.leg")}
                className={
                  errorMessages.filter(
                    (el) => el.name === "leg"
                  ).length > 0
                    ? "has-error"
                  : ""
                }
              />
            </div>
          </FormItem>
        </Col>
        <Col span={24}>
          <div className="action-btn">
            <Popconfirm onConfirm={handleUpdate}>
              <Button loading={isUpdating}>Update and Copy Link</Button>
            </Popconfirm>
          </div>
        </Col>
      </Row>
    </Wrapper>
  );
}
