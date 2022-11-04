import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Card } from 'components/common'
import { asUsdPrice } from 'utils/text'
import GiftIcon from 'assets/images/giftWallet.png'

export default function BalanceSection(props) {
  const dispatch = useDispatch()
  const myUser = useSelector(state=>state.auth.user)
  const [wallet, setWallet] = useState({
    amount: 0
  })

  const handleGetBalance = () => {
    dispatch({
      type: 'auth.RELOAD'
    })
  }

  useEffect(() => {
    handleGetBalance()
  }, [])

  useEffect(() => {
    if (myUser) {
      setWallet(myUser.gift_wallet)
    }
  }, [myUser])

  return (
    <Card>
      <Wrapper>
        <div>
          <h6>MY BALANCE</h6>
          <span className={'amount'}>
            {asUsdPrice(wallet.amount)}
          </span>
        </div>
        <div>
          <img src={GiftIcon} />
        </div>
      </Wrapper>
    </Card>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h6 {
    font-size: 12px;
    color: ${props=>props.theme.palette.secondaryText};
  }
  .amount {
    font-weight: 700;
    font-size: 30px;
    line-height: 30px;
    color: #86D55E;
  }
  img {
    width: 67px;
    height: 67px;
  }
`
