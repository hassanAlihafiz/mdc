import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { 
  Row, Col, Modal, 
  Button, Input, Select, FormItem,
  Popconfirm, SuccessNotification, message
} from "components/common";
import { countryStates, statesByCountry } from 'common/country'
import { callPostApiWithAuth } from 'utils/api'
import { Wrapper } from "./AddModal.styled";

export default function AddModal(props) {
  const dispatch = useDispatch()
  const myUser = useSelector(state=>state.auth.user)
  const [formData, setFormData] = useState({
    name: '', 
    bk_name: '', bk_bank: '',
    bk_account: '', bk_routing: '', 
    billing_address: '', billing_address_line2: '',
    billing_city: '', billing_zipcode: '',
    billing_state: '', billing_country: ''
  })
  const [isUpdating, setIsUpdating] = useState(false)

  const onSubmitDone = (res) => {
    setIsUpdating(false)
    SuccessNotification(res.message)
    dispatch({ type: 'auth.RELOAD' })
    props.setModalMode(undefined)
  }
  const onSubmitFail = () => {
    setIsUpdating(false)
  }
  const handleSubmit = () => {
    // Validation
    if (!formData.name || 
      !formData.bk_name || !formData.bk_bank || 
      !formData.bk_account || !formData.bk_routing || 
      !formData.billing_address || 
      !formData.billing_city || !formData.billing_zipcode || 
      !formData.billing_state || !formData.billing_country
    ) {
      message.error('Please input all required fields')
      return
    }

    setIsUpdating(true)
    callPostApiWithAuth(`my_account/setting/bank_billing_detail`, formData,
      onSubmitDone, onSubmitFail
    )
  }

  useEffect(() => {
    setFormData({
      ...formData,
      billing_country: myUser.country
    })
  }, [myUser])

  return (
    <Modal width={600}
      onCancel={()=>props.setModalMode(undefined)}
    >
      <Wrapper>
        <div className="modal-title-container">Add Checking</div>
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <div className="input-container">
              <FormItem label={"Name*"}>
                <Input placeholder="Enter Name"
                  value={formData.name}
                  onChange={e=>setFormData({...formData, name:e.target.value})}
                />
              </FormItem>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div className="input-container">
              <FormItem label={"Name on Bank*"}>
                <Input placeholder="Enter Name on Bank" 
                  value={formData.bk_name}
                  onChange={e=>setFormData({...formData, bk_name:e.target.value})}
                />
              </FormItem>
            </div>
          </Col>{" "}
          <Col xs={24} sm={12}>
            <div className="input-container">
              <FormItem label={"Bank Name*"}>
                <Input placeholder="Enter Bank Name" 
                  value={formData.bk_bank}
                  onChange={e=>setFormData({...formData, bk_bank:e.target.value})}
                />
              </FormItem>
            </div>
          </Col>{" "}
          <Col xs={24} sm={12}>
            <div className="input-container">
              <FormItem label={"Account Number*"}>
                <Input placeholder="Enter Account Number" 
                  value={formData.bk_account}
                  onChange={e=>setFormData({...formData, bk_account:e.target.value})}
                />
              </FormItem>
            </div>
          </Col>{" "}
          <Col xs={24} sm={12}>
            <div className="input-container">
              <FormItem label={"Routing Number*"}>
                <Input placeholder="Enter Routing Number" 
                  value={formData.bk_routing}
                  onChange={e=>setFormData({...formData, bk_routing:e.target.value})}
                />
              </FormItem>
            </div>
          </Col>{" "}
          <Col xs={24} sm={12}>
            <div className="input-container">
              <FormItem label={"Address Line 1*"}>
                <Input placeholder="Enter Address Line 1" 
                  value={formData.billing_address}
                  onChange={e=>setFormData({...formData, billing_address:e.target.value})}
                />
              </FormItem>
            </div>
          </Col>{" "}
          <Col xs={24} sm={12}>
            <div className="input-container">
              <FormItem label={"Address Line 2"}>
                <Input placeholder="Enter Address Line 2" 
                  value={formData.billing_address_line2}
                  onChange={e=>setFormData({...formData, billing_address_line2:e.target.value})}
                />
              </FormItem>
            </div>
          </Col>{" "}
          <Col xs={24} sm={12}>
            <div className="input-container">
              <FormItem label={"City*"}>
                <Input placeholder="Enter City" 
                  value={formData.billing_city}
                  onChange={e=>setFormData({...formData, billing_city:e.target.value})}
                />
              </FormItem>
            </div>
          </Col>{" "}
          <Col xs={24} sm={12}>
            <div className="input-container">
              <FormItem label={"State/Province*"}>
                <Select
                  value={formData.billing_state}
                  options={[
                    { 
                      label: 'Select State', 
                      value: ''
                    },
                    ...statesByCountry(formData.billing_country).map(el => ({
                      label: el.name,
                      value: el.name
                    }))
                  ]}
                  style={{ width: "100%" }}
                  onChange={v=>setFormData({...formData, billing_state:v})}
                />
              </FormItem>
            </div>
          </Col>{" "}
          <Col xs={24} sm={12}>
            <div className="input-container">
              <FormItem label={"Zip/Postal code*"}>
                <Input placeholder="Enter Zip/Postal code"
                  value={formData.billing_zipcode}
                  onChange={e=>setFormData({...formData, billing_zipcode:e.target.value})}
                />
              </FormItem>
            </div>
          </Col>{" "}
          <Col xs={24} sm={12}>
            <div className="input-container">
              <FormItem label={"Country*"}>
                <Select
                  value={formData.billing_country}
                  options={[
                    { 
                      label: 'Select Country', 
                      value: ''
                    },
                    ...countryStates.map(el => ({
                      label: el.name,
                      value: el.code2
                    }))
                  ]}
                  style={{ width: "100%" }}
                  onChange={v=>setFormData({...formData, billing_country:v})}
                  disabled
                />
              </FormItem>
            </div>
          </Col>{" "}
          <Col span={24}>
            <div className="action-btn">
              <Popconfirm onConfirm={handleSubmit}>
                <Button loading={isUpdating}>
                  Create
                </Button>
              </Popconfirm>
            </div>
          </Col>
        </Row>
      </Wrapper>

    </Modal>    
  );
}
