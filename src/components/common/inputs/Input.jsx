import { Input as Input_ } from 'antd';
import styled from 'styled-components'

export const Input = ({ error, className, ...props }) => {
  return (
    <Wrapper>
      <Input_ {...props} className={`${className} input ${error && 'has-error'}`} />
      {error && <span className="error">{error}</span>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .input {
    min-height: 34px;
  }
`
