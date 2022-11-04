import React, { useState } from "react";
import { Row, Col, Spin, Select } from "components/common";
import CardView from "./cards/CardView";
import { Wrapper } from "./TrainingPage.styled";
import { useEffect } from "react";
import { callGetApiWithAuth } from "utils/api";
import { NoData } from "components/common";
import { varOptionsWithDefault } from "common/var";

export default function IndexPage() {
  const [isLoadingTrainingData, setIsLoadingTrainingData] = useState(false)
  const [data, setData] = useState([]);
  const [searchParam, setSearchParam] = useState({
    file_type: '',
    lang: '',
    asset_type: ''
  });

  const onGetSuccessTrainingData = ({ data }) => {
    setIsLoadingTrainingData(false);
    setData(data.data);
  };

  const onGetFailedTrainingData = () => {
    setIsLoadingTrainingData(false);
  };

  const loadTrainingData = (searchParam0) => {
    const params = {
      ...searchParam0
    }
    const q = Object.keys(params).map(k=>k+'='+params[k]).join('&')
    setIsLoadingTrainingData(true)
    callGetApiWithAuth(`training_video/list?${q}`, onGetSuccessTrainingData, onGetFailedTrainingData);
  };

  const onSelect = (field, value) => {
    const searchParam0 = {
      ...searchParam, [field]: value
    }
    setSearchParam(searchParam0)
    loadTrainingData(searchParam0)
  }

  useEffect(() => {
    loadTrainingData(searchParam);
  }, []);
  
  return (
    <Wrapper isLoadingTrainingData>
      <div className="main-container">
        <div className="header-search">
          <Row gutter={[20, 20]}>
            <Col xs={24} xl={8} xxl={6}>
              <Select
                value={searchParam.lang}
                onChange={v=>onSelect('lang', v)}
                options={varOptionsWithDefault('resource.lang', 'Select Language')}
              />
            </Col>
            <Col xs={24} xl={8} xxl={6}>
              <Select
                value={searchParam.asset_type}
                onChange={v=>onSelect('asset_type', v)}
                options={varOptionsWithDefault('resource.assetType', 'All Asset Types')}
              />
            </Col>
          </Row>
        </div>
        <Row gutter={[20, 20]}>
          {isLoadingTrainingData ?
            <Spin spinning={true} className="loading-spin" />
            :
            (data && data.length > 0) ?
              data?.map((el) => {
                return (
                  <Col xs={24} md={12} xl={8} xxl={6}>
                    <CardView data={el} />
                  </Col>
                );
              })
              :
              <NoData title="There is no data." />
          }
        </Row>
      </div>
    </Wrapper>
  );
}
