import React from 'react'
import styled from 'styled-components'
import { Button } from 'components/common'

export default function SendBtnSection(props) {  
  return (
    <Wrapper>
      <Button onClick={() => props.setModalMode('send')}>
        Send Gift Card
      </Button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  button {
    height: 67px;
    width: 100%;
  }
`
