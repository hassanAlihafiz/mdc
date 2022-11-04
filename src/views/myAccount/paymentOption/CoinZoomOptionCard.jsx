import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { 
  Row, Col, Alert, Checkbox,
  Input, Select, Popconfirm, Button, DatePicker, 
  SuccessNotification, message,
} from "components/common";
import {
  callPutApiWithAuth
} from 'utils/api'
import { countryStates, statesByCountry } from 'common/country'

export default function CoinZoomOptionCard({
  isActive, provider, loadListData
}) {
  const myUser = useSelector(state => state.auth.user)
  const sudoName = useSelector((state) => state.auth.sudo_name)
  const [formData, setFormData] = useState({
    email: '', phone: '',
    birthday: '',
    first_name: '', last_name: '',
    middle_name: '',
    address: '',
    address_line2: '',
    country: '',
    state: '',
    city: '',
    zipcode: '',
    gender: 'MALE',
  })
  const [isUpdating, setIsUpdating] = useState(false)
  const [zoomMe, setZoomMe] = useState('')
  const [referralLink, setReferralLink] = useState(null)
  const [hasHandle, setHasHandle] = useState(false)

  const onFormInput = (field, value) => {
    setFormData({
      ...formData, 
      [field]: value
    })
  }

  const onSaveDone = () => {
    setIsUpdating(false);
    SuccessNotification('CoimZoom has been set as your payout provider.')
    loadListData()
  };

  const handleSave = () => {
    // check validation
    if (!hasHandle) {
      if (!formData.first_name || !formData.last_name || 
        // !formData.middle_name || 
        !formData.email || !formData.phone || 
        !formData.birthday || 
        // gender has default value
        !formData.country || !formData.state || 
        !formData.city || !formData.zipcode || 
        !formData.address 
        // || !formData.address_line2
      ) {
        message.error('Input all required fields')
        return
      }
    }    

    setIsUpdating(true)
    let body = sudoName ? ({ 
      form_info: {
        ...formData,
        sudo_name: sudoName,
      },
    })
    : ({
      form_info: formData,
    });
    body = {...body,
      zoomMeHandle: zoomMe,
    }
    callPutApiWithAuth(
      `my_account/payment_option/${provider.id}/activate`, body,
      onSaveDone, () => setIsUpdating(false)
    );
  }

  useEffect(() => {
    if (provider?.form_info) {
      setFormData({
        email: provider.form_info.email, 
        phone: provider.form_info.phone,
        birthday: provider.form_info.birthday,
        first_name: provider.form_info.first_name, 
        last_name: provider.form_info.last_name,
        middle_name: provider.form_info.middle_name,
        address: provider.form_info.address,
        address_line2: provider.form_info.address_line2,
        country: provider.form_info.country,
        state: provider.form_info.state,
        city: provider.form_info.city,
        zipcode: provider.form_info.zipcode,
        gender: provider.form_info.gender,
      })
    } else {
      setFormData({
        email: myUser.email, 
        phone: myUser.phone,
        birthday: myUser.dob,
        first_name: myUser.first_name, 
        last_name: myUser.last_name,
        middle_name: '',
        address: '',
        address_line2: '',
        country: myUser.country,
        state: myUser.state,
        city: '',
        zipcode: '',
        gender: 'MALE',
      })
    }
    if (provider?.account) {
      const account0 = JSON.parse(provider.account)
      setZoomMe(account0.zoomMeHandle)
      setReferralLink(account0.referralLink)
    }
  }, [provider, myUser])

  return (
    <div className="payment-card-section">
      <div className="payment-title">
        <span>CoinZoom</span>
        {isActive && 
        <span className='active-badge'>
          ACTIVE
        </span>
        }
      </div>
      <div className='payment-description'>
        The ultimate digital banking experience that allows you to ditch your traditional bank. Buy, sell, and trade over 40 cyptocurrencies including Bitcoin, Ether, and Litecoin on a regulated, secure exchange with some of the lowest fees in the industry. Earn up to 5% back on every purchase with your customized CoinZoom Visa card and earn up to 7.5% APY on your cryptocurrency and USD deposits.
      </div>
      {!provider.account &&
      <>
        <div className='payment-form-text mt-2'>
          <Checkbox checked={hasHandle}
            onChange={e=>setHasHandle(e.target.checked)}
            label={`Has CoinZoom zoomMeHandle already?`}
          />
        </div>
        {!hasHandle && 
        <>
          <div className="payment-form-text">
            Please input your account information.
          </div>
          <div className="payment-form">
            <Row gutter={[20, 10]}>
              <Col xs={24} sm={8}>
                <div className='form-group'>
                  <div className="input-label">First Name*</div>
                  <Input 
                    value={formData.first_name}
                    onChange={e=>onFormInput('first_name', e.target.value)}
                    disabled={provider.account}
                  />
                </div>
              </Col>
              <Col xs={24} sm={8}>
                <div className='form-group'>
                  <div className="input-label">Middle Name</div>
                  <Input 
                    value={formData.middle_name}
                    onChange={e=>onFormInput('middle_name', e.target.value)}
                    disabled={provider.account}
                  />
                </div>
              </Col>
              <Col xs={24} sm={8}>
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
                  <div className="input-label">Phone Number*</div>
                  <Input 
                    value={formData.phone}
                    onChange={e=>onFormInput('phone', e.target.value)}
                    disabled={provider.account}
                  />
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div className='form-group'>
                  <div className="input-label">Gender*</div>
                  <Select 
                    value={formData.gender}
                    onChange={v=>onFormInput('gender', v)}
                    options={[
                      { label: 'MALE', value: 'MALE' },
                      { label: 'FEMALE', value: 'FEMALE' },
                    ]}
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
              <Col xs={24} sm={12}>
                <div className='form-group'>
                  <div className="input-label">State*</div>
                  <Select 
                    value={formData.state}
                    onChange={v=>onFormInput('state', v)}
                    options={statesByCountry(formData.country).map(el => ({
                      label: el.name,
                      value: el.name
                    }))}
                    showSearch
                    disabled={provider.account}
                  />
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div className='form-group'>
                  <div className="input-label">Address 1*</div>
                  <Input 
                    value={formData.address}
                    onChange={e=>onFormInput('address', e.target.value)}
                    disabled={provider.account}
                  />
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div className='form-group'>
                  <div className="input-label">Address 2</div>
                  <Input 
                    value={formData.address_line2}
                    onChange={e=>onFormInput('address_line2', e.target.value)}
                    disabled={provider.account}
                  />
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div className='form-group'>
                  <div className="input-label">City*</div>
                  <Input 
                    value={formData.city}
                    onChange={e=>onFormInput('city', e.target.value)}
                    disabled={provider.account}
                  />
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div className='form-group'>
                  <div className="input-label">Postal Code*</div>
                  <Input 
                    value={formData.zipcode}
                    onChange={e=>onFormInput('zipcode', e.target.value)}
                    disabled={provider.account}
                  />
                </div>
              </Col>
            </Row>

            <div className='action-group'>
              <Popconfirm onConfirm={handleSave}>
                <Button loading={isUpdating}>
                  {`Create & Activate`}
                </Button>
              </Popconfirm>
            </div>
          </div>
        </>}
        {hasHandle && 
        <div className='payment-form'>
          <div className="payment-form-text">
            If you have verified ZoomMe Handle already, please change on below form.
          </div>        
          <div className='form-group'>
            <div className="input-label">
              ZoomMe Handle:
            </div>
            <Input
              value={zoomMe}
              onChange={(e) => setZoomMe(e.target.value)}
              style={{ width: 360 }}
            />
          </div>
          <div className='action-group'>
            <Popconfirm onConfirm={handleSave}>
              <Button loading={isUpdating}>
                {isActive?'Save':`Save & Activate`}
              </Button>
            </Popconfirm>
          </div>
        </div>
        }
      </>}
      {provider.account && 
      <div className='payment-form'>
        <div className="payment-form-text">
          If you need to update your ZoomMe Handle, please change on below form.
        </div>        
        <div className='form-group'>
          <div className="input-label">
            ZoomMe Handle:
          </div>
          <Input
            value={zoomMe}
            onChange={(e) => setZoomMe(e.target.value)}
            style={{ width: 360 }}
          />
        </div>
        <div className='payment-description'>
          {referralLink && 
          <a href={referralLink} 
            target={'_blank'} rel="noreferrer"
          >
            Your CoinZoom Referral
          </a>}&nbsp;
          <Alert
            style={{ margin: "5px 0px 25px" }}
            message={'* Please complete your CoinZoom registration, if you not get verfied yet.'}
            type={'info'}
            showIcon
          />
        </div>
        <div className='action-group'>
          <Popconfirm onConfirm={handleSave}>
            <Button loading={isUpdating}>
              {isActive?'Save':`Save & Activate`}
            </Button>
          </Popconfirm>
        </div>
      </div>
      }
    </div>

  )
}