import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { 
  Row, Col, Input, Button, Radio, 
  Popconfirm, SuccessNotification, message, 
} from "components/common";
import { varValue, varIs } from "common/var";
import { asUsdPrice } from 'utils/text'
import { callPutApiWithAuth, callPostApiWithAuth } from "utils/api";
import { Wrapper } from "./BalanceSubPage.styled";

export default function BalanceSubPage() {
  const history = useHistory()
  const myUser = useSelector(state=>state.auth.user)
  const [formData, setFormData] = useState({
    type: '',
    keep_percent: ''
  })
  const [isUpdating, setIsUpdating] = useState(false)
  const [isRequesting, setIsRequesting] = useState(false)
  const [amount, setAmount] = useState('')

  const onSaveDone = (res) => {
    SuccessNotification(res.message)
    setIsUpdating(false)
  }
  const onSaveFail = () => {
    setIsUpdating(false)
    setTimeout(() => {
      history.push('/my_account/payment_option')
    }, 500)
  }
  const handleSave = () => {
    // Validation
    if (varIs('creditWithdrawSetting.type', formData.type, 'partial_payout')) {
      if (!formData.keep_percent) {
        message.error('Please input keep amount')
        return
      }
    }

    setIsUpdating(true)
    callPutApiWithAuth(`my_account/wallet/withdraw_setting`, 
      formData, onSaveDone, onSaveFail
    )
  }

  const onRequestDone = (res) => {
    SuccessNotification(res.message)
    setIsRequesting(false)
  }
  const onRequestFail = () => {
    setIsRequesting(false)
  }
  const handleRequest = () => {
    // validation
    if (isNaN(amount)) {
      message.error('Please input amount as number')
      return
    }
    if (amount<=0) {
      message.error('Please input number greater than zero')
      return
    }

    //
    setIsRequesting(true)
    callPostApiWithAuth(`my_account/wallet/request_withdraw`, {
      amount
    }, onRequestDone, onRequestFail)
  }

  useEffect(() => {
    setFormData({ 
      type: myUser.withdraw_setting.type,
      keep_percent: myUser.withdraw_setting.keep_percent      
    })
  }, [myUser])

  return (
    <Wrapper>
      <div className="credit-wallet-title">Credit Wallet Balance</div>
      <Row gutter={[20, 20]}>
        <Col xs={24} sm={12} xl={6}>
          <div className="balance-stats">
            <div className="stats-title">Current Balance</div>
            <div className="stats-value">
              {asUsdPrice(myUser.wallet.current_balance)}
            </div>
          </div>
        </Col>
        <Col xs={24} sm={12} xl={6}>
          <div className="balance-stats">
            <div className="stats-title">Total Withdrawn</div>
            <div className="stats-value">
              {asUsdPrice(myUser.wallet.withdrawn_amount)}
            </div>
          </div>
        </Col>
      </Row>
      <div className="payment-header">
        <span>About Credit Wallet</span>
        <div className="main-divider" />
      </div>
      <div className="credit-wallet-content">
        <div className="content">
          MyDailyChoice gives you the opportunity to use your commissions to
          purchase product for yourself or for others in your team. Simply
          select how much of your future commissions you would like to allocate
          toward your credit account and it will automatically be added each
          Thursday as commissions are paid.
        </div>
        <div className="content">
          In addition, you may fill your credit wallet by sending MyDailyChoice,
          Inc. a bank wire. Below are the bank wire details:
        </div>
        <div className="content-container">
          <div className="content-label">
            Financial Institution:
            <span>Professinal Bank</span>
          </div>
          <div className="content-label">
            Bank Address:
            <span>
              396 Alhambra Circle, Suite 150 Coral Gables, Florida 33134
            </span>
          </div>
          <div className="content-label">
            Routing / ABA Number:
            <span>067016574</span>
          </div>
          <div className="content-label">
            Beneficiary Name:
            <span>My Daily Choice Inc - Incoming Wire Account</span>
          </div>
          <div className="content-label">
            Beneficiary Account Number:
            <span>2222667</span>
          </div>
          <div className="content-label">
            SWIFT Number:
            <span>PRFLUS33XXX (for international wires)</span>
          </div>
        </div>
        <div className="content">
          Please include your ID# in the reference line to ensure proper funds
          are allocated to your credit wallet
        </div>
        <div className="content">
          Once you have sent a wire, please email{" "}
          <span>accounting@MyDailyChoice.com</span> with your wire receipt and then your wallet will be funded.
        </div>
      </div>
      <div className="radio-container">
        <Radio.Group onChange={e=>setFormData({
          ...formData, type: e.target.value
        })} value={formData.type}>
          <div className="radio-label">
            <Radio value={varValue('creditWithdrawSetting.type', 'payout')}>
              Do not credit ANY of my earnings to my Credit Wallet.
            </Radio>
          </div>
          <div className="radio-label">
            <Radio value={varValue('creditWithdrawSetting.type', 'partial_payout')}>
              <div className="checktext">
                <span>
                  I would like to credit the next
                  <Input value={formData.keep_percent} 
                    onChange={e=>setFormData({
                      ...formData, 
                      keep_percent: e.target.value
                    })}
                  />
                  <span>of my earnings to my Credit Wallet.</span>
                </span>
              </div>  
            </Radio>
          </div>
          <div className="radio-label">
            <Radio value={varValue('creditWithdrawSetting.type', 'credit_wallet')}>
              I would like to credit ALL of my earnings to my Credit Wallet.
            </Radio>
          </div>
        </Radio.Group>
      </div>
      <div className='action-root'>
        <Button onClick={handleSave}
          loading={isUpdating}
        >
          Save
        </Button>
      </div>
      <div className="payment-header">
        <span>Withdraw</span>
        <div className="main-divider" />
      </div>
      <div className="manual-container">
        <Row>
          <Col className="responsive-label">
            <div className="amount-label">Amount:</div>
          </Col>
          <Col className="responsive-input">
            <Input type='number'
              value={amount}
              onChange={e=>setAmount(e.target.value)}
            />
          </Col>
          <Col className="responsive-button">
            <Popconfirm onConfirm={handleRequest}>
              <Button loading={isRequesting}>
                Withdraw
              </Button>
            </Popconfirm>            
          </Col>
        </Row>
      </div>
      <div className="credit-wallet-content">
        <div className="content">
          * Withdrawals are processed every Thursday at 4PM PST and may take 5-7 business days to reach your payment method on file.
        </div>
      </div>
    </Wrapper>
  );
}
