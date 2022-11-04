import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { 
  Select, Button, message, SuccessNotification 
} from "components/common";
import { varIs } from 'common/var'
import { callPutApiWithAuth } from 'utils/api'

export default function SettingSection() {
  const dispatch = useDispatch()
  const myUser = useSelector(state=>state.auth.user)
  const [payType, setPayType] = useState('')
  const [payTypeOptions, setPayTypeOptions] = useState([])
  const [isUpdating, setIsUpdating] = useState(false)

  const onUpdateDone = (res) => {
    SuccessNotification(res.message)
    setIsUpdating(false)
    dispatch({ type: 'auth.RELOAD' })
  }
  const onUpdateFail = () => {
    setIsUpdating(false)
  }
  const handleUpdate = () => {
    // Validation
    // if (!payType) {
    //   message.error('Please select payment option')
    //   return
    // }
    
    setIsUpdating(true)
    callPutApiWithAuth('my_account/subscription/subscription_setting', 
      {pay_type: payType},
      onUpdateDone, onUpdateFail
    )
  }

  useEffect(() => {
    if (myUser.subscription_setting) {
      setPayType(myUser.subscription_setting.pay_type)
    }
    const payTypeOptions0 = [
      {
        label: 'None',
        value: ''
      },
      {
        label: 'Credit Card',
        value: 1
      },
      {
        label: 'Bitcoin',
        value: 5
      }
    ]
    if (myUser.country==='US') {
      payTypeOptions0.push({
        label: 'ACH',
        value: 3
      })
    }
    if (varIs('user.type', myUser.type, 'affiliate')) {
      payTypeOptions0.push({
        value: 2,
        label: 'Credit Wallet'
      })
      payTypeOptions0.push({
        value: 8,
        label: 'CC + Credit Wallet'
      })
    }
    payTypeOptions0.push({
      value: 7,
      label: 'Gift Wallet'
    })
    payTypeOptions0.push({
      value: 9,
      label: 'CC + Gift Wallet'
    })
    if (myUser.country==='UA') {
      payTypeOptions0.push({
        value: 4,
        label: 'LiqPay'
      })
    }
    if (myUser.country==='RU') {
      payTypeOptions0.push({
        value: 4,
        label: 'PayU'
      })
    }
    if (myUser.country==='TW') {
      payTypeOptions0.push({
        value: 4,
        label: 'SunTech'
      })
    }

    setPayTypeOptions(payTypeOptions0)
  }, [myUser])

  return (
    <Wrapper>
      <div className="payment-select-label">Preferred Payment Method</div>
      <div className="select-box">
        <Select
          value={payType}
          options={payTypeOptions}
          onChange={setPayType}
        />
      </div>
      <span style={{width: 12}} />
      <div className='actions'>
        <Button loading={isUpdating}
          onClick={handleUpdate}
        >
          Save
        </Button>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  .payment-select-label {
    font-weight: 500;
    font-size: 18px;
    color: #8f9dae;
    margin-right: 15px;
  }
  .ant-select {
    width: 180px;
  }
  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: flex-start;
    .select-box {
      width: 100% !important;
    }
    .select-box > div {
      width: 100% !important;
      margin: 5px 0px 15px;
      .ant-select {
        width: 100%;
      }
    }
  }
`
