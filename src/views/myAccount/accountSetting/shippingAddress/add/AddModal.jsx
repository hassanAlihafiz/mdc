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
    contact_email: '', contact_phone: '',
    contact_first_name: '', contact_last_name: '',
    shipping_address: '', shipping_address_line2: '',
    shipping_city: '', shipping_zipcode: '',
    shipping_country: '', shipping_state: ''
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
      !formData.contact_email || !formData.contact_phone || 
      !formData.contact_first_name || !formData.contact_last_name || 
      !formData.shipping_address || 
      !formData.shipping_city || !formData.shipping_zipcode || 
      !formData.shipping_country || !formData.shipping_state
    ) {
      message.error('Please input all required fields')
      return
    }

    setIsUpdating(true)
    callPostApiWithAuth(`my_account/setting/shipping_detail`, formData,
      onSubmitDone, onSubmitFail
    )
  }

  useEffect(() => {
    setFormData({
      ...formData,
      shipping_country: myUser.country
    })
  }, [myUser])

  return (
    <Modal width={600}
      onCancel={()=>props.setModalMode(undefined)}
    >
      <Wrapper>
        <div className="modal-title-container">Add Shipping Address</div>
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
              <FormItem label={"Contact Email*"}>
                <Input placeholder="Enter Contact Email" 
                  value={formData.contact_email}
                  onChange={e=>setFormData({...formData, contact_email:e.target.value})}
                />
              </FormItem>
            </div>
          </Col>{" "}
          <Col xs={24} sm={12}>
            <div className="input-container">
              <FormItem label={"Contact Phone*"}>
                <Input placeholder="Enter Contact Phone" 
                  value={formData.contact_phone}
                  onChange={e=>setFormData({...formData, contact_phone:e.target.value})}
                />
              </FormItem>
            </div>
          </Col>{" "}
          <Col xs={24} sm={12}>
            <div className="input-container">
              <FormItem label={"First Name*"}>
                <Input placeholder="Enter First Name" 
                  value={formData.contact_first_name}
                  onChange={e=>setFormData({...formData, contact_first_name:e.target.value})}
                />
              </FormItem>
            </div>
          </Col>{" "}
          <Col xs={24} sm={12}>
            <div className="input-container">
              <FormItem label={"Last Name*"}>
                <Input placeholder="Enter Last Name" 
                  value={formData.contact_last_name}
                  onChange={e=>setFormData({...formData, contact_last_name:e.target.value})}
                />
              </FormItem>
            </div>
          </Col>{" "}
          <Col xs={24} sm={12}>
            <div className="input-container">
              <FormItem label={"Address Line 1*"}>
                <Input placeholder="Enter Address Line 1" 
                  value={formData.shipping_address}
                  onChange={e=>setFormData({...formData, shipping_address:e.target.value})}
                />
              </FormItem>
            </div>
          </Col>{" "}
          <Col xs={24} sm={12}>
            <div className="input-container">
              <FormItem label={"Address Line 2"}>
                <Input placeholder="Enter Address Line 2" 
                  value={formData.shipping_address_line2}
                  onChange={e=>setFormData({...formData, shipping_address_line2:e.target.value})}
                />
              </FormItem>
            </div>
          </Col>{" "}
          <Col xs={24} sm={12}>
            <div className="input-container">
              <FormItem label={"City*"}>
                <Input placeholder="Enter City" 
                  value={formData.shipping_city}
                  onChange={e=>setFormData({...formData, shipping_city:e.target.value})}
                />
              </FormItem>
            </div>
          </Col>{" "}
          <Col xs={24} sm={12}>
            <div className="input-container">
              <FormItem label={"State/Province*"}>
                <Select
                  value={formData.shipping_state}
                  options={[
                    { 
                      label: 'Select State', 
                      value: ''
                    },
                    ...statesByCountry(formData.shipping_country).map(el => ({
                      label: el.name,
                      value: el.name
                    }))
                  ]}
                  style={{ width: "100%" }}
                  onChange={v=>setFormData({...formData, shipping_state:v})}
                />
              </FormItem>
            </div>
          </Col>{" "}
          <Col xs={24} sm={12}>
            <div className="input-container">
              <FormItem label={"Zip/Postal code*"}>
                <Input placeholder="Enter Zip/Postal code"
                  value={formData.shipping_zipcode}
                  onChange={e=>setFormData({...formData, shipping_zipcode:e.target.value})}
                />
              </FormItem>
            </div>
          </Col>{" "}
          <Col xs={24} sm={12}>
            <div className="input-container">
              <FormItem label={"Country*"}>
                <Select
                  value={formData.shipping_country}
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
                  onChange={v=>setFormData({...formData, shipping_country:v})}
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
