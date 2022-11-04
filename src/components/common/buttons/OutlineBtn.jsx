import { Button as Button0 } from 'components/common';
import styled from 'styled-components'

export function OutlineBtn({ customStyle, ...props }) {
  return (
    <Wrapper style={customStyle}>
      <Button0
        type="primary"
        ghost
        {...props}
        className={`btnContainer ${props.success ? 'ant-btn-success' : ''} ${
          props.className
        }`}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: inherit;
`
