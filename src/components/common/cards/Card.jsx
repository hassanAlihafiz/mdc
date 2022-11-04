import React from 'react'
import styled from 'styled-components'

export default function Card(props) {
  return (
    <Wrapper className='cardRoot'>
      {props.children}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 20px;
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(44,39,56,0.06);
`