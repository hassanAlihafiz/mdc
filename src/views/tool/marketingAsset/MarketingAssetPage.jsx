import React, { useState, useEffect } from "react";
import { 
  Row, Col, 
  Select, List, Spin 
} from "components/common";
import { varOptionsWithDefault } from 'common/var'
import CardView from "./card/CardView";
import { callGetApiWithAuth } from 'utils/api'
import { Wrapper } from "./MarketingAssetPage.styled";

export default function MarketingAssetPage() {
  const [brands, setBrands] = useState([])
  const [searchParam, setSearchParam] = useState({
    brand_code_id: '',
    lang: '',
    asset_type: ''
  })
  const [listData, setListData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const onGetBrands = (res) => {
    setBrands(res.data)
  }
  const loadBrands = () => {
    callGetApiWithAuth(`common/brands`, onGetBrands)
  }

  const onGetListData = (res) => {
    setListData(res.data)
    setIsLoading(false)
  }
  const onFailListData = () => {
    setIsLoading(false)
  }
  const loadListData = (searchParam0) => {
    setIsLoading(true)
    const params = {
      ...searchParam0
    }
    const q = Object.keys(params).map(k=>k+'='+params[k]).join('&')
    callGetApiWithAuth(`tool/marketing_asset/list?${q}`, 
      onGetListData, onFailListData
    )
  }

  const handleSearch = () => {
    loadListData(searchParam)
  }

  const onSelect = (field, value) => {
    const searchParam0 = {
      ...searchParam, [field]: value
    }
    setSearchParam(searchParam0)
    loadListData(searchParam0)
  }

  useEffect(() => {
    loadBrands()
    handleSearch()
  }, [])

  return (
    <Wrapper>
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
                value={searchParam.brand_code_id}
                onChange={v=>onSelect('brand_code_id', v)}
                options={[
                  { label: 'All Brands', value: '' },
                  ...brands.map(el=> ({
                    label: el.title,
                    value: el.id
                  }))
                ]}
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
        <List grid={{gutter: [20, 20], xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4}}
          dataSource={listData}
          renderItem={item => (
            <List.Item className="card">
              <CardView data={item} />
            </List.Item>
          )}
          loading={{
            spinning: isLoading,
            indicator: <Spin spinning={true} className={`spinner`} />,
          }}
          className="cards-list"
        />
      </div>
    </Wrapper>
  );
}
