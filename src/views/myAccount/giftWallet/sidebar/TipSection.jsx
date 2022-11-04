import React from 'react'
import styled from 'styled-components'
import { Card } from 'components/common'
import TipIcon from 'assets/images/giftTip.png'

export default function TipSection() {
  return (
    <Card>
      <Wrapper>
        <div className={'d-flex justify-content-center'}>
          <img src={TipIcon} />
        </div>
        <div className={'d-flex justify-content-center flex-column'}>
          <h4>How do Gift Cards work?</h4>
          <p>When purchasing an MDC gift card, it will be added to your gift balance. With your gift balance, you can place orders or send a portion of your balance to your friends so they can shop for MDC products.</p>
        </div>
      </Wrapper>
    </Card>
  )
}

const Wrapper = styled.div`
  h4 {
    margin-top: 24px;
    text-align: center;
  }
  p {
    text-align: center;
    margin: 12px 0;
    color: ${props=>props.theme.palette.secondaryText};
  }
`
