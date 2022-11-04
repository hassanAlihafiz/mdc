import { Input as Input_ } from 'antd';
import styled from 'styled-components';

const { Password } = Input_;

export const PasswordInput = ({ error, className, ...props }) => {
  return (
    <Wrapper>
      <Password {...props} className={`${className} input ${error && 'has-error'}`} />
      {error && <span className="error">{error}</span>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .input {
    min-height: 34px;
  }
`
