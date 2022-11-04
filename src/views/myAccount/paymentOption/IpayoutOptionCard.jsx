import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { 
  Row, Col,
  Select, DatePicker, Input, 
  message, Popconfirm, Button,
  SuccessNotification 
} from "components/common";
import {
  callPutApiWithAuth
} from 'utils/api'
import { countryStates } from 'common/country'

export default function IpayoutOptionCard({
  isActive, provider, loadListData
}) {
  const myUser = useSelector(state => state.auth.user)
  const sudoName = useSelector((state) => state.auth.sudo_name)
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    country: '',
    birthday: ''
  })
  const [isUpdating, setIsUpdating] = useState(false)

  const onFormInput = (field, value) => {
    setFormData({
      ...formData, 
      [field]: value
    })
  }

  const onSaveDone = () => {
    setIsUpdating(false);
    SuccessNotification('iPayout has been set as your payout provider.')
    loadListData()
  };

  const handleSave = () => {
    // check validation
    if (!formData.first_name || !formData.last_name || 
      // !formData.middle_name || 
      !formData.email || !formData.birthday || 
      // gender has default value
      !formData.country 
      // || !formData.address_line2
    ) {
      message.error('Input all required fields')
      return
    }

    setIsUpdating(true)
    const body = sudoName ? ({ 
      form_info: {
        ...formData,
        sudo_name: sudoName,
      },
    })
    : ({
      form_info: formData,
    });
    callPutApiWithAuth(
      `my_account/payment_option/${provider.id}/activate`, body,
      onSaveDone, () => setIsUpdating(false)
    );
  }

  useEffect(() => {
    if (provider?.form_info) {
      setFormData({
        email: provider.form_info.email,
        first_name: provider.form_info.first_name,
        last_name: provider.form_info.last_name,
        country: provider.form_info.country,
        birthday: provider.form_info.birthday
      })
    } else {
      setFormData({
        email: myUser.email,
        first_name: myUser.first_name,
        last_name: myUser.last_name,
        country: myUser.country,
        birthday: myUser.dob
      })
    }
  }, [provider, myUser])

  return (
    <div className="payment-card-section">
      <div className="payment-title">
        <span>Global eWallet</span>
        {isActive && 
        <span className='active-badge'>
          ACTIVE
        </span>
        }
      </div>
      <div className="payment-form-text" style={{ margin: "10px 0px 0px" }}>
        Powered by i-payout
      </div>
      <div className="payment-description" style={{ marginTop: "5px" }}>
        MyDailyChoice offers its members a new fast, secure and cost
        effective payment method.
      </div>
      <div
        className="payment-form-text"
        style={{ margin: "10px 0px 15px" }}
      >
        Available withdrawal methods:
      </div>{" "}
      <div className="withdraws-tag">
        <span>Bank Transfer</span>
        <span>Wire Transfer</span>
        <span>Prepaid Card</span>
        <span>Paper Checks</span>
        <span>Qiwi</span>
        <span>Bitcoin</span>
        <span>Virtual Gift Card</span>
      </div>
      <div
        className="payment-description"
        style={{ margin: "5px 0px 20px" }}
      >
        Your Global eWallet account has been successfully registered.
        i-payout is NOT your current Payment Option.
      </div>
      <div className="payment-form">
        <Row gutter={[12, 8]}>
          <Col xs={24} sm={12}>
            <div className='form-group'>
              <div className="input-label">First Name*</div>
              <Input 
                value={formData.first_name}
                onChange={e=>onFormInput('first_name', e.target.value)}
                disabled={provider.account}
              />
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div className='form-group'>
              <div className="input-label">Last Name*</div>
              <Input 
                value={formData.last_name}
                onChange={e=>onFormInput('last_name', e.target.value)}
                disabled={provider.account}
              />
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div className='form-group'>
              <div className="input-label">Email*</div>
              <Input 
                value={formData.email}
                onChange={e=>onFormInput('email', e.target.value)}
                disabled={provider.account}
              />
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div className='form-group'>
              <div className="input-label">Birthday*</div>
              <DatePicker 
                date={formData.birthday}
                onChange={(_, v)=>onFormInput('birthday', v)}
                disabled={provider.account}
              />
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div className='form-group'>
              <div className="input-label">Country*</div>
              <Select 
                value={formData.country}
                onChange={v=>onFormInput('country', v)}
                options={countryStates.map(el => ({
                  label: el.name,
                  value: el.code2
                }))}
                showSearch
                disabled={provider.account}
              />
            </div>
          </Col>          
        </Row>
        {!isActive && 
        <div className='action-group'>
          <Popconfirm onConfirm={handleSave}>            
            <Button loading={isUpdating}>
              {provider.account?`Activate`
              : `Create & Activate`}
            </Button>
          </Popconfirm>
        </div>
        }
      </div>
    </div>

  )
}
