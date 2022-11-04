import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { 
  Row, Col, Alert, 
  SuccessNotification, message,
  Input, Radio, Popconfirm, Button 
} from "components/common";
import {
  callPutApiWithAuth
} from 'utils/api'

export default function TwBatchOptionCard({
  isActive, provider, loadListData
}) {
  const sudoName = useSelector((state) => state.auth.sudo_name)
  const [formData, setFormData] = useState({
    account_number: '',
    routing_number: '',
    bank_name: '',
    name: '',
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
    SuccessNotification('Taiwan Payout has been set as your payout provider.')
    loadListData()
  };

  const handleSave = () => {
    // check validation
    if (!formData.account_number ||  
      !formData.routing_number || !formData.name
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
        account_number: provider.form_info.account_number,
        routing_number: provider.form_info.routing_number,
        bank_name: provider.form_info.bank_name,
        name: provider.form_info.name,
      })
    }
  }, [provider])

  return (
    <div className="payment-card-section">
      <div className="payment-title">
        <span>Direct Diposit - Taiwan Only</span>
        {isActive && 
        <span className='active-badge'>
          ACTIVE
        </span>
        }
      </div>
      <Row>
        <Col xs={24} sm={10}>
          <div className="payment-form-text">
            Please provide your bank account information.
          </div>
          <div className="payment-form">
            <div className='form-group'>
              <div className="input-label">Account Number*</div>
              <Input 
                value={formData.account_number}
                onChange={e=>onFormInput('account_number', e.target.value)}
                disabled={provider.account}
              />
            </div>
            <div className='form-group'>
              <div className="input-label">Bank Name</div>
              <Input 
                value={formData.bank_name}
                onChange={e=>onFormInput('bank_name', e.target.value)}
                disabled={provider.account}
              />
            </div>
            <div className='form-group'>
              <div className="input-label">Routing Number*</div>
              <Input 
                value={formData.routing_number}
                onChange={e=>onFormInput('routing_number', e.target.value)}
                disabled={provider.account}
              />
            </div>
            <div className='form-group'>
              <div className="input-label">Name on Account*</div>
              <Input 
                value={formData.name}
                onChange={e=>onFormInput('name', e.target.value)}
                disabled={provider.account}
              />
            </div>
            {!isActive && 
            <div className='action-group'>
              <Popconfirm onConfirm={handleSave}>
                <Button loading={isUpdating}>
                  {provider.account?`Activate`
                  : `Save & Activate`}
                </Button>
              </Popconfirm>
            </div>
            }
          </div>
        </Col>
        <Col xs={24} sm={14}>
          <div className='d-flex align-items-center'
            style={{height: '100%'}}
          >
            {/*
            <img src={'https://mdc-assets.s3.us-east-2.amazonaws.com/setting/nacha-desc.jpg'} 
              style={{maxWidth: '100%'}}
            />
            */}
          </div>
        </Col>
      </Row>
      
      <Alert
        style={{ margin: "5px 0px 5px", alignItems: 'baseline' }}
        message={`Please note: Make sure all of your information is ACCURATE. If you put in the wrong checking account number or routing number, the payment could be sent to the wrong bank account and we will not be able to recover your funds.`}
        type={'warning'}
        showIcon
      />
      <Alert
        style={{ margin: "5px 0px 5px", alignItems: 'baseline' }}
        message={'If you have selected direct deposit, it could take 2-3 business days for you to receive your earnings depending on your bank.'}
        type={'info'}
        showIcon
      />
    </div>

  )
}
