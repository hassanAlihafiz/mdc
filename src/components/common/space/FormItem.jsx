import React from 'react'
import styled from 'styled-components'

export function FormItem(props) {
  return (
    <Wrapper className={'form-group'}>
      <div className={'label'} style={{fontSize: 14}}><label>{props.label}</label></div>
      {props.children}
      {props.errorMessages && props.errorMessages.length > 0 && (
        <div className={'errorWrapper'}>
          {props.errorMessages.map((el, index) => (
            <p key={index}>{el.message}</p>
          ))}
        </div>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
margin-bottom: 8px;
.label {
  margin-bottom: 3px;
  font-size: 14px !important;
}
.errorWrapper {
  color: ${props=>props.theme.palette.error};
}
`
