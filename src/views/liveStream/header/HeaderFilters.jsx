import React, { useState } from "react";
import { Col, AutoComplete, Input, Select } from "components/common";
import { callGetApiWithAuth } from "utils/api";
import { uiVarOptions } from "common/uiVar";

export default function HeaderFilters(props) {
  const [users, setUsers] = useState([]);

  const onChangeSearchParam = (field, value) => {
    props.setSearchParams({
      ...props.searchParams,
      [field]: value
    });
  };

  const onSearchDone = (res) => {
    setUsers(res.data);
  };

  const onSearchUser = (v) => {
    callGetApiWithAuth(`live_stream/search_user/${v}`, onSearchDone)
  };

  const onSelectUser = (_, option) => {
    let receiver = null;
    users.forEach(el => {
      if (el.id==option.key) {
        receiver = el
      }
    });
    onChangeSearchParam("user_id", receiver.id);
  };

  return (
    <>
      <Col xs={12} sm={8} xl={4}>
        <AutoComplete 
          onSearch={onSearchUser}
          options={users.map(el => ({
            key: el.id,
            label: `${el.first_name} ${el.last_name}`,
            value: `${el.first_name} ${el.last_name}`,
          }))}
          style={{width: '100%'}}
          onSelect={onSelectUser}
          placeholder={'Username or uuid'}
        />
      </Col>
      <Col xs={12} sm={8} xl={4}>
        <Input
          placeholder="Title"
          value={props.searchParams.keyword}
          onChange={(e) => onChangeSearchParam("keyword", e.target.value)}
        />
      </Col>
      <Col xs={12} sm={8} xl={4}>
        <Select
          value={props.searchParams.topic}
          options={[
            {
              label: "All Topics",
              value: "",
              key: ""
            },
            ...uiVarOptions("liveStream.topics")
          ]}
          onChange={(value) => onChangeSearchParam("topic", value)}
          style={{ width: "100%" }}
        />
      </Col>
      <Col xs={12} sm={8} xl={4}>
        <Select
          value={props.searchParams.lang}
          options={[
            {
              label: "All Languages",
              value: "",
              key: ""
            },
            ...uiVarOptions("liveStream.languages")
          ]}
          onChange={(value) => onChangeSearchParam("lang", value)}
          style={{ width: "100%" }}
        />
      </Col>
      <Col xs={12} sm={8} xl={4}>
        <Select
          value={props.searchParams.publisher}
          options={[
            {
              label: "All Publishers",
              value: "",
              key: ""
            },
            {
              value: "self",
              key: "self",
              label: "Mine"
            },
            {
              value: "others",
              key: "others",
              label: "Others"
            }
          ]}
          onChange={(value) => onChangeSearchParam("publisher", value)}
          style={{ width: "100%" }}
        />
      </Col>
    </>
  )
}