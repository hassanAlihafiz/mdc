import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'
import payment from "payment";
import { 
  Row, Col, Modal, 
  Button, Input, Select, FormItem,
  Popconfirm, SuccessNotification, message
} from "components/common";
import CreditCardInput from "react-credit-card-input";
import { countryStates, statesByCountry } from 'common/country'
import { varOptions } from 'common/var'
import { callPutApiWithAuth } from 'utils/api'
import { Wrapper } from "./EditModal.styled";

export default function EditModal(props) {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: '', 
    cc_name: '', cc_number: '',
    cc_exp_date: '', cc_cvv: '',
    billing_address: '', billing_address_line2: '',
    billing_city: '', billing_zipcode: '',
    billing_state: '', billing_country: ''
  })
  const [isUpdating, setIsUpdating] = useState(false)

  const ccTypeValue = (label) => {
    let value = 0;
    varOptions('userBillingDetail.ccType').forEach((el) => {
      if (el.label.toLowerCase() === label) {
        value = el.value;
      }
    });

    return value;
  };

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
      !formData.cc_name || !formData.cc_number || 
      !formData.cc_exp_date || !formData.cc_cvv || 
      !formData.billing_address || 
      !formData.billing_city || !formData.billing_zipcode || 
      !formData.billing_state || !formData.billing_country
    ) {
      message.error('Please input all required fields')
      return
    }

    setIsUpdating(true)
    let body = {...formData}
    body['cc_number'] = body.cc_number.replace(/\s/g, '')
    body['cc_exp_date'] = body.cc_exp_date.replace(/\s/g, '')
    callPutApiWithAuth(`my_account/setting/cc_billing_detail/${props.data.id}`, body,
      onSubmitDone, onSubmitFail
    )
  }

  useEffect(() => {
    setFormData({
      ...formData,
      ...props.data
    })
  }, [props.data])

  return (
    <Modal width={600}
      onCancel={()=>props.setModalMode(undefined)}
    >
      <Wrapper>
        <div className="modal-title-container">Edit Credit Card</div>
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
          <Col xs={24}>
            <div className="input-container">
              <FormItem label={"Name on Card*"}>
                <Input placeholder="Enter Name on Card" 
                  value={formData.cc_name}
                  onChange={e=>setFormData({...formData, cc_name:e.target.value})}
                />
              </FormItem>
            </div>
          </Col>{" "}
          <Col xs={24}>
            <div className="input-container credit-input-box">
              <FormItem label={"Card Number"}>
                <CreditCardInput
                  cardNumberInputProps={{
                    value: formData.cc_number,
                    onChange: (e) =>
                      setFormData({
                        ...formData,
                        cc_number: e.target.value,
                        cc_type: ccTypeValue(
                          payment.fns.cardType(e.target.value)
                        ),
                      }),
                  }}
                  cardExpiryInputProps={{
                    value: formData.cc_exp_date,
                    onChange: (e) => {
                      setFormData({
                        ...formData,
                        cc_exp_date: e.target.value,
                      });
                    },
                  }}
                  cardCVCInputProps={{
                    value: formData.cc_cvv,
                    onChange: (e) =>
                      setFormData({
                        ...formData,
                        cc_cvv: e.target.value,
                      }),
                  }}
                  fieldClassName={("input", "credit-input-container")}
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
                  Update
                </Button>
              </Popconfirm>
            </div>
          </Col>
        </Row>
      </Wrapper>

    </Modal>    
  );
}
